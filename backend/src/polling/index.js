const sleep = require('util').promisify(setTimeout);

const channelInfoPolling = require('./channel-info.polling');

const POLLING_INTERVAL = process.env.POLLING_INTERVAL
  ? parseInt(process.env.POLLING_INTERVAL, 10) : 5000;

let isPolling = false;

/**
 * @param {*} Socket.io server
 */
const doPoll = async (io) => {
  await Promise.all([
    channelInfoPolling.poll(io),
  ]);

  if (isPolling) {
    await sleep(POLLING_INTERVAL);
    doPoll(io);
  }
};

/**
 * @param {*} io Socket.io server
 */
const start = (io) => {
  if (isPolling) {
    return;
  }
  isPolling = true;
  doPoll(io);
};

const stop = () => {
  isPolling = false;
};

module.exports = {
  start,
  stop,
};
