require('dotenv').config();

const terminate = require('./server/terminate');
const app = require('./server');

const twitchAuthService = require('./authentication/twitch-auth.service');
const polling = require('./polling');
const pubSub = require('./pub-sub');

const PORT = parseInt(process.env.SERVER_PORT, 10);

const server = app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}! If not already, navigate to http://localhost:${PORT}/auth to generate app credentials`);

  twitchAuthService.waitForAuthentication(() => {
    polling.start();
    pubSub.subscribe();
  });
});

const exitHandler = terminate(server, polling, pubSub, {
  coredump: false,
  timeout: 500,
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
