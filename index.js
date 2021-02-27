require('dotenv').config();
const server = require('./server');

const PORT = parseInt(process.env.SERVER_PORT, 10);

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
