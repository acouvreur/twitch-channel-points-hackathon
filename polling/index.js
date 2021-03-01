const sleep = require('util').promisify(setTimeout);

const channelInfoPolling = require('./channel-info.polling');

const POLLING_INTERVAL = process.env.POLLING_INTERVAL
  ? parseInt(process.env.POLLING_INTERVAL, 10) : 5000;

let isPolling = false;

const doPoll = async () => {
  await Promise.all([
    channelInfoPolling.poll(),
  ]);

  if (isPolling) {
    await sleep(POLLING_INTERVAL);
    doPoll();
  }
};

const start = () => {
  if (isPolling) {
    return;
  }
  isPolling = true;
  doPoll();
};

const stop = () => {
  isPolling = false;
};

module.exports = {
  start,
  stop,
};
