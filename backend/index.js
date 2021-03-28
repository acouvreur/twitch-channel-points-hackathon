/* eslint-disable import/order */
const config = require('./config');
const { ApiClient } = require('twitch');
const utils = require('./src/helpers/utils.js');


function createServer({ customAuthProvider, customStorageProvider } = {}) {

  if (customAuthProvider) {
    console.log('[LOG] Setting up custom auth provider ' + JSON.stringify(customAuthProvider));
    // Take advantage of cache mechanism to inject Custom API Client
    // The cache never invalidates itself
    utils.cache.apiClient = new ApiClient({
      authProvider: customAuthProvider
    });
  }

  utils.getApiClient().requestScopes(config.SCOPES.split(' '));

  const app = require('./src/server');
  const http = require('http').Server(app);
  const terminate = require('./src/server/terminate');

  const twitchAuthService = require('./src/authentication/twitch-auth.service');
  const polling = require('./src/polling');
  const pubSub = require('./src/pub-sub');
  const customRewardsConfigurationService = require('./src/channel-points/custom-rewards-configuration.service');

  if (customStorageProvider) {
    console.log('[LOG] Setting up custom storage provider ', JSON.stringify(customStorageProvider));
    customRewardsConfigurationService.dynamicConf.store = customStorageProvider;
  }

  console.log(`[DEBUG] Port retrieved from config: ${config.SERVER_PORT}`)
  const PORT = parseInt(config.SERVER_PORT, 10);

  const io = require('socket.io')(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('[SOCKET] connection');
    socket.on('disconnect', () => {
      console.log('[SOCKET] disconnect');
    });
  });

  const server = http.listen(PORT, async () => {
    console.log(`The app is running on port ${PORT}!`);

    if (customAuthProvider) {
      console.log('[LOG] Synchronizing custom reward configuration...');
      await customRewardsConfigurationService.synchronize();
      console.log('[LOG] Custom Rewards Configuration updated successfully!');

      console.log('[LOG] Started polling');
      polling.start(io);
      console.log('[LOG] Subscribed to topics');
      pubSub.subscribe();
    } else {

      twitchAuthService.waitForAuthentication(async () => {
        console.log('[LOG] Synchronizing custom reward configuration...');
        await customRewardsConfigurationService.synchronize();
        console.log('[LOG] Custom Rewards Configuration udpated successfully!');

        console.log('[LOG] Started polling');
        polling.start(io);
        console.log('[LOG] Subscribed to topics');
        pubSub.subscribe();
      });
    }
  });

  const exitHandler = terminate(server, polling, pubSub, {
    coredump: false,
    timeout: 500,
  });

  // process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
  // process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  process.on('SIGINT', exitHandler(0, 'SIGINT'));

}

module.exports = {
  createServer,
  config
};
