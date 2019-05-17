const express = require('express');
const server = express();
const db = require('./model');
// const mw = require('./middleware');

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

server.post('/games', (req, res) => {
  const { title, genre } = req.body;
  !title || !genre
    ? res.status(422).json({ message: 'Please provide both a title and a genre for the game you wish to create' })
    : db.post(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(500).json({ error: "Couldn't create new game in database" })
      })
})

server.get('/games/:id', (req, res) => {
  const {id} = req.params;
  db.get({id})
    .then(game => {
      !game
        ? res.status(404).json({ error: 'Game at specified ID not found in the database' })
        : res.status(200).json(game);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't retrieve game from database" })
    })
})

module.exports = server;