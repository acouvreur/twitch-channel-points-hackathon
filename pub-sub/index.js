const redemptionEventHandler = require('./redemption-event.handler');

const subscribe = async () => Promise.all([
  redemptionEventHandler.subscribe(),
]);

const unsubscribe = async () => Promise.all([
  redemptionEventHandler.unsubscribe(),
]);

module.exports = {
  subscribe,
  unsubscribe,
};
