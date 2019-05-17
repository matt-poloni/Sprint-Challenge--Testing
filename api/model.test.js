const db = require('../data/dbConfig');
const Games = require('./model');

describe('games model', () => {
  afterEach(async () => {
    await db('games').truncate();
  });

  describe('post()', () => {
    it('should post provided game to DB', async () => {
      const data = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980,
      }
      const [id] = await Games.post(data);
      return Games
        .get({id})
        .then(res => {
          expect(res).toEqual(expect.objectContaining(data));
        })
    })
  })
}) 