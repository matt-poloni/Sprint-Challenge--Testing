const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

describe('test environment', () => {
  it("sets DB_ENV to 'testing'", () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
})

describe('server', () => {
  afterEach(async () => {
    await db('games').truncate();
  });
  
  describe('/ GET', () => {
    it('should return a 200 status', () => {
      return request(server)
        .get('/')
        .expect(200);
    })
  })

  describe('/games GET', () => {
    it('should return a 200 status', () => {
      return request(server)
        .get('/games')
        .expect(200);
    })

    it('should return an array', () => {
      return request(server)
      .get('/games')
      .then(res => {
        expect(Array.isArray(res.body));
      })
    })

    it('should return an empty array before games are added', () => {
      return request(server)
      .get('/games')
      .then(res => {
        expect(res.body).toHaveLength(0);
      })
    })
  })

  describe('/games POST', () => {
    const data = {
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980,
    }
    
    it('should return a 422 status when not given a title', () => {
      const {genre} = data;
      return request(server)
        .post('/games')
        .send({genre})
        .expect(422);
    })
    
    it('should return a 422 status when not given a genre', () => {
      const {title} = data;
      return request(server)
        .post('/games')
        .send({title})
        .expect(422);
    })
    
    it('should return a 201 status when given correct data', () => {
      return request(server)
        .post('/games')
        .send(data)
        .expect(201);
    })

    it('should return an id of 1', () => {
      return request(server)
        .post('/games')
        .send(data)
        .then(res => {
          expect(res.body).toEqual([1]);
        })
    })

    it('should return the id of the new game', async () => {
      const res = await request(server)
        .post('/games')
        .send(data);
      const id = res.body[0];
      return request(server)
        .get(`/games/${id}`)
        .then(res => {
          expect(res.body).toEqual(expect.objectContaining(data));
        })
    })
  })
})