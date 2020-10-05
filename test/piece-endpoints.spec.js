const knex = require('knex')
const jwt = require('jsonwebtoken')
const { app } = require('../src/app')
const helpers = require('./test-helpers')

describe('Pieces endpoint', function() {
  let db

  const {
    testUsers,
    testPieces,
  } = helpers.makeGraphusersFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/piece`, () => {
    beforeEach('insert users', () =>
      helpers.seedGraphusers(
        db,
        testUsers,
      )
    )
    beforeEach('insert pieces', () =>
      helpers.seedAssignedpieces(
        db,
        testPieces,
      )
    )

    it(`Unauthorized user receives 401 response`, () => {
      return supertest(app)
      .post('/api/piece')
      .send({})
      .expect(401)
    })
    it(`User receive 200 response and default piece`, () => {
      return supertest(app)
      .post('/api/piece')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send({})
      .expect(200)
    })
  })

})