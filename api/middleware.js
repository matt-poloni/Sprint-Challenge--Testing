const db = require('./model');

module.exports = {
  required,
  unique,
}

function required(req, res, next) {
  const { title, genre } = req.body;
  !title || !genre
    ? res.status(422).json({ message: 'Please provide both a title and a genre for the game you wish to create' })
    : next();
}

async function unique(req, res, next) {
  const { title } = req.body;
  const arr = await db.get({title});
  !arr.length
    ? res.status(405).json({ message: `A game titled '${title}' already exists in the database` })
    : next();
}
