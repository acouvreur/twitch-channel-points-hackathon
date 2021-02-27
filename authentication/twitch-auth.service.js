const fs = require('fs');
const FormData = require('form-data');
const { default: got } = require('got/dist/source');

const { RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');

const {
  SERVER_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPES,
} = process.env;

const REDIRECT_URI = `${SERVER_URL}/auth/callback`;
// eslint-disable-next-line max-len
const TWITCH_AUTHORIZE_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

/**
 * @typedef {Object} TokenFileData
 *
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {number} expiryTimestamp
 */

/**
 * Generates `token.json` file by asking for user approval
 *
 * @param {string} code OAuth code
 */
const generateTokenFile = async (code) => {
  const formData = new FormData();
  formData.append('client_id', CLIENT_ID);
  formData.append('client_secret', CLIENT_SECRET);
  formData.append('code', code);
  formData.append('grant_type', 'authorization_code');
  formData.append('redirect_uri', REDIRECT_URI);

  const { body } = await got.post('https://id.twitch.tv/oauth2/token', {
    body: formData,
  });

  const token = JSON.parse(body);

  /** @type {TokenFileData} */
  const tokenFileData = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiryTimestamp: 0,
  };

  fs.writeFileSync('./token.json', JSON.stringify(tokenFileData, null, 2));
};

/**
 *
 * @param   {TokenFileData} tokenFileData
 * @returns {RefreshableAuthProvider}
 */
const getRefreshableAuthProvider = () => {
  const tokenFileData = JSON.parse(fs.readFileSync('./token.json', 'UTF-8'));

  return new RefreshableAuthProvider(
    new StaticAuthProvider(CLIENT_ID, tokenFileData.accessToken),
    {
      clientSecret: CLIENT_SECRET,
      refreshToken: tokenFileData.refreshToken,
      expiry: tokenFileData.expiryTimestamp === null
        ? null : new Date(tokenFileData.expiryTimestamp),
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        const newTokenData = {
          accessToken,
          refreshToken,
          expiryTimestamp: expiryDate === null ? null : expiryDate.getTime(),
        };
        fs.writeFileSync('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8');
      },
    },
  );
};

module.exports = {
  TWITCH_AUTHORIZE_URL,
  getRefreshableAuthProvider,
  generateTokenFile,
};
