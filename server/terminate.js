/**
 * See https://blog.heroku.com/best-practices-nodejs-errors
 *
 * @param {*} server
 * @param {*} polling
 * @param {*} pubSub
 * @param {boolean} [options={ coredump: false, timeout: 500 }]
 * @returns
 */
function terminate(server, polling, pubSub, options = { coredump: false, timeout: 500 }) {
  // Exit function
  const exit = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
      // Log error information, use a proper logging library here :)
      console.log(err.message, err.stack);
    }

    console.log(`Gracefully exiting code=[${code}] reason=[${reason}]`);
    console.log('Stopping polling...');
    polling.stop();

    console.log('Unsubscribing from events...');
    // TODO try this and remove timeout if necessary (promise)
    setTimeout(pubSub.unsubscribe, options.timeout).unref();

    console.log('Closing HTTP server...');
    // Attempt a graceful shutdown
    server.close(exit);
    console.log('Exiting');

    setTimeout(exit, options.timeout).unref();
  };
}

module.exports = terminate;
