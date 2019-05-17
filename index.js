require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log(`***Listening at http://localhost:${port} ***`);
});
