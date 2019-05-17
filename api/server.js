const express = require('express');
const server = express();
const db = require('./model');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Up' });
});

module.exports = server;