const fs = require('fs');
const FormData = require('form-data');
const { default: got } = require('got');
const sleep = require('util').promisify(setTimeout);

const { RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');

const config = require('../../config');

const {
  SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPES,
} = config;

const REDIRECT_URI = `http://localhost:${SERVER_PORT}/auth/callback`;
// eslint-disable-next-line max-len
const TWITCH_AUTHORIZE_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES};`;

const cache = {
  refreshableAuthProvider: undefined,
};

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
 * Returns a RefreshableAuthProvider from cache or instanciates a new one
 *
 * @returns {RefreshableAuthProvider}
 */
const getRefreshableAuthProvider = () => {
  if (!cache.refreshableAuthProvider) {
    const tokenFileData = JSON.parse(fs.readFileSync('./token.json', 'UTF-8'));

    cache.refreshableAuthProvider = new RefreshableAuthProvider(
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
          fs.writeFileSync('./token.json', JSON.stringify(newTokenData, null, 4), 'UTF-8');
        },
      },
    );
  }
  return cache.refreshableAuthProvider;
};

const waitForAuthentication = async (promise) => {
  try {
    getRefreshableAuthProvider();
  } catch (error) {
    console.log(`[ERROR] ${error.message}`);
  }

  if (!cache.refreshableAuthProvider) {
    console.log(`[ERROR] Unable to authenticate! Please navigate to http://localhost:${SERVER_PORT}/auth to generate app credentials.`);
    await sleep(5000);
    return waitForAuthentication(promise);
  }
  return promise();
};

module.exports = {
  TWITCH_AUTHORIZE_URL,
  waitForAuthentication,
  generateTokenFile,
  getRefreshableAuthProvider,
};
