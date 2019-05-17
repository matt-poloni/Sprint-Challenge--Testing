const express = require('express');
const server = express();
const db = require('./model');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Up' });
});

server.get('/games', (req, res) => {
  db.get()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json({ error, message: 'Could not retrieve games from database' });
    })
})

module.exports = server;