const express = require('express');
const bodyParser = require('body-parser');
const got = require('got');
const _ = require('lodash');

require('dotenv').config();

const PORT = parseInt(process.env.SERVER_PORT, 10);
const {
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPES,
  BROADCASTER_ID,
  BROADCASTER_NAME,
} = process.env;

const cache = {
  token: {
    access_token: '',
    expires_at: 0,
  },
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @typedef {Object}    CustomRewardBody
 *
 * @property {string}   [title]             The title of the reward
 * @property {string}   [prompt]            The prompt for the viewer when they are redeeming the reward
 * @property {number}   [cost]              The cost of the reward
 * @property {boolean}  [is_enabled]        Is the reward currently enabled, if false the reward won’t show up to viewers. Defaults true
 * @property {string}   [background_color]  Custom background color for the reward. Format: Hex with # prefix. Example: #00E5CB.
 * @property {boolean}  [is_user_input_required]                Does the user need to enter information when redeeming the reward. Defaults false
 * @property {boolean}  [is_max_per_stream_enabled]             Whether a maximum per stream is enabled. Defaults to false.
 * @property {number}   [max_per_stream]                        The maximum number per stream if enabled
 * @property {boolean}  [is_max_per_user_per_stream_enabled]    Whether a maximum per user per stream is enabled. Defaults to false.
 * @property {number}   [max_per_user_per_stream]               The maximum number per user per stream if enabled
 * @property {boolean}  [is_global_cooldown_enabled]            Whether a cooldown is enabled. Defaults to false.
 * @property {number}   [global_cooldown_seconds]               The cooldown in seconds if enabled
 * @property {boolean}  [is_paused]                             Is the reward currently paused, if true viewers can’t redeem
 * @property {boolean}  [should_redemptions_skip_request_queue] Should redemptions be set to FULFILLED status immediately when redeemed and skip the request queue instead of the normal UNFULFILLED status. Defaults false
 */

/**
 * @typedef {Object}    CustomReward
 *
 * @property {string}   [broadcaster_name]
 * @property {string}   [broadcaster_login]
 * @property {string}   [broadcaster_id]
 * @property {string}   [id]
 * @property {string}   [image]
 *
 * @property {string}   [background_color]            Custom background color for the reward. Format: Hex with # prefix. Example: #00E5CB.
 * @property {boolean}  [is_enabled]                  Is the reward currently enabled, if false the reward won’t show up to viewers. Defaults true
 * @property {number}   [cost]                        The cost of the reward
 * @property {string}   [title]                       The title of the reward
 * @property {string}   [prompt]                      The prompt for the viewer when they are redeeming the reward
 * @property {boolean}  [is_user_input_required]      Does the user need to enter information when redeeming the reward. Defaults false
 *
 * @property {Object}   [max_per_stream_setting]
 * @property {boolean}  [max_per_stream_setting.is_enabled]
 * @property {number}   [max_per_stream_setting.max_per_stream]
 *
 * @property {Object}   [max_per_user_per_stream_setting]
 * @property {boolean}  [max_per_user_per_stream_setting.is_enabled]
 * @property {number}   [max_per_user_per_stream_setting.max_per_user_per_stream]
 *
 * @property {Object}   global_cooldown_setting]      Whether a cooldown is enabled and what the cooldown is. { is_enabled: bool, global_cooldown_seconds: int }
 * @property {boolean}  global_cooldown_setting.is_enabled]
 * @property {number}   global_cooldown_setting.global_cooldown_seconds]
 *
 * @property {boolean}  [is_in_stock]                 Is the reward currently in stock, if false viewers can’t redeem
 * @property {boolean}  [is_paused]                   Is the reward currently paused, if true viewers can’t redeem
 *
 * @property {Object}   [default_image]               Set of default images of 1x, 2x and 4x sizes for the reward { url_1x: string, url_2x: string, url_4x: string }
 * @property {string}   [default_image.url_1x]
 * @property {string}   [default_image.url_2x]
 * @property {string}   [default_image.url_4x]
 *
 * @property {boolean}  [should_redemptions_skip_request_queue] Should redemptions be set to FULFILLED status immediately when redeemed and skip the request queue instead of the normal UNFULFILLED status. Defaults false
 * @property {string}   [redemptions_redeemed_current_stream]   The number of redemptions redeemed during the current live stream. Counts against the max_per_stream_setting limit. Null if the broadcasters stream isn’t live or max_per_stream_setting isn’t enabled.
 * @property {string}   [cooldown_expires_at]                   Timestamp of the cooldown expiration. Null if the reward isn’t on cooldown.
 */

/**
 * @typedef {Object} TwitchToken
 * @property {string} access_token  The access token
 * @property {number} expires_in    Defines the validity of the access token
 * @property {string} token_type    Type of access token (bearer, etc.)
 */

/**
 * Get a Twitch API token using OAuth client credentials flow
 * see [Twitch authentication documentation](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow)
 *
 * @param {string} clientId get it from [here](https://dev.twitch.tv/console)
 * @param {string} clientSecret get it from [here](https://dev.twitch.tv/console)
 * @param {string} scopes see [Scopes documentation](https://dev.twitch.tv/docs/authentication/#scopes)
 * @returns {Promise<TwitchToken>}
 */
const getTwitchAppToken = async (clientId, clientSecret, scopes) => {
  const { body } = await got.post('https://id.twitch.tv/oauth2/token', {
    searchParams: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scopes,
    },
  });
  return JSON.parse(body);
};

/**
 * Get a Twitch API access token from the cache of from Twitch
 * if the one from the cache is no more valid.
 *
 * @returns {Promise<string>} access token
 */
const getAccessToken = async () => {
  if (!_.get(cache, 'token.access_token') || new Date().getTime() > cache.token.expires_at) {
    console.log('Getting token from twitch...');
    const twitchToken = await getTwitchAppToken(
      CLIENT_ID,
      CLIENT_SECRET,
      SCOPES,
    );
    _.set(cache, 'token.access_token', twitchToken.access_token);
    _.set(cache, 'token.expires_at', new Date().getTime() + twitchToken.expires_in - 5000);
    console.log('Success! token has been cached');
  }
  return cache.token.access_token;
};

/**
 * @returns {Object}
 */
const getHttpHeaders = async () => ({
  Authorization: `Bearer ${await getAccessToken()}`,
  'Client-ID': CLIENT_ID,
  'Content-Type': 'application/json',
});

const getChannels = async () => {
  const { body } = await got('https://api.twitch.tv/helix/search/channels', {
    searchParams: {
      query: 'grichkanoff',
    },
    headers: await getHttpHeaders(),
  });
  return JSON.parse(body);
};

/**
 * Returns a list of Custom Reward objects for the Custom Rewards on a channel.
 *
 * @returns {Promise<Array<CustomReward>>}
 */
const getCustomRewards = async () => {
  const { body } = await got('https://api.twitch.tv/helix/channel_points/custom_rewards', {
    searchParams: {
      broadcaster_id: BROADCASTER_ID,
    },
    headers: await getHttpHeaders(),
  });
  return JSON.parse(body).data;
};

/**
 * Creates a Custom Reward on a channel.
 *
 * @param {CustomRewardBody} customReward
 * @returns {Promise<Array<CustomReward>>}
 */
const createCustomReward = async (customRewardBody) => {
  const { body } = await got.post('https://api.twitch.tv/helix/channel_points/custom_rewards', {
    searchParams: {
      broadcaster_id: BROADCASTER_ID,
    },
    headers: await getHttpHeaders(),
    json: customRewardBody,
  });
  return JSON.parse(body).data;
};

/**
 * Updates a Custom Reward created on a channel.
 *
 * @param {string}           customRewardId
 * @param {CustomRewardBody} customRewardBody
 * @returns {Promise<Array<CustomReward>>}
 */
const patchCustomReward = async (customRewardId, customRewardBody) => {
  const { body } = await got.patch('https://api.twitch.tv/helix/channel_points/custom_rewards', {
    searchParams: {
      broadcaster_id: BROADCASTER_ID,
      id: customRewardId,
    },
    headers: await getHttpHeaders(),
    json: customRewardBody,
  });
  return JSON.parse(body).data;
};

/**
 * Delete a custom reward
 *
 * @param {string} customRewardId
 */
const deleteCustomReward = async (customRewardId) => {
  got.delete('https://api.twitch.tv/helix/channel_points/custom_rewards', {
    searchParams: {
      broadcaster_id: BROADCASTER_ID,
      id: customRewardId,
    },
    headers: await getHttpHeaders(),
  });
};

/**
 * Returns Custom Reward Redemption objects for a Custom Reward on a channel that was created by the same client_id.
 *
 * @param {string} rewardId
 * @param {string} status  UNFULFILLED, FULLFILLED or CANCELED
 */
const getCustomRewardsRedemptions = async (rewardId, redemptionStatus) => {
  const { body } = await got.get('https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions', {
    searchParams: {
      broadcaster_id: BROADCASTER_ID,
      reward_id: rewardId,
      status: redemptionStatus,
      sort: 'OLDEST',
    },
    headers: await getHttpHeaders(),
  });
  return body;
};

const patchCustomsRewardsRedemptionsStatus = async () => {

};

const getWebhookSubscriptions = async () => {
  const { body } = await got.get('https://api.twitch.tv/helix/webhooks/subscriptions', {
    searchParams: {
      first: 100,
    },
    headers: await getHttpHeaders(),
  });
  return JSON.parse(body);
};

// TODO use websockets plugins of obs/ableton?
// TODO use webhooks instead of twitch api polling

// TODO https://dev.twitch.tv/docs/pubsub
// TODO https://dev.twitch.tv/docs/api/webhooks-guide
// TODO https://dev.twitch.tv/docs/api/webhooks-reference
// Channel Points
// Topic: channel-points-channel-v1.<channel_id>
// Example topic: channel-points-channel-v1.44322889
// Required scope: channel:read:redemptions
// Notified when: A custom reward is redeemed in a channel.

app.get('/', async (req, res) => {
  try {
    const canard = await getCustomRewards();
    console.log(canard);
    res.status(200).send(canard);
  } catch (error) {
    console.log(error.response.body);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
