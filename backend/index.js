/* eslint-disable import/order */
require('dotenv').config();
const { ApiClient } = require('twitch');
const utils = require('./src/helpers/utils.js');


function createServer(authProvider) {

  if (authProvider) {
    utils.cache.apiClient = new ApiClient({
      authProvider
    });
  }

  const app = require('./src/server');
  const http = require('http').Server(app);
  const terminate = require('./src/server/terminate');

  const twitchAuthService = require('./src/authentication/twitch-auth.service');
  const polling = require('./src/polling');
  const pubSub = require('./src/pub-sub');
  const customRewardsConfigurationService = require('./src/channel-points/custom-rewards-configuration.service');

  const PORT = parseInt(process.env.SERVER_PORT, 10);

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
    console.log(`The app is running on port ${PORT}! If not already, navigate to http://localhost:${PORT}/auth to generate app credentials`);

    if (authProvider) {
      console.log('[LOG] Synchronizing custom reward configuration...');
      await customRewardsConfigurationService.synchronize();
      console.log('[LOG] Custom Rewards Configuration udpated successfully!');

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

  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  process.on('SIGINT', exitHandler(0, 'SIGINT'));

}

module.exports = createServer;
