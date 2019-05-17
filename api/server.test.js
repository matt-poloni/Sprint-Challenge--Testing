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
    it('should return 200 status', () => {
      return request(server)
        .get('/')
        .expect(200);
    })
  })
})