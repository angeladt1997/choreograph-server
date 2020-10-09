const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      password: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',    
      password: 'password'
      
    },
    {
      id: 3,
      username: 'test-user-3',
      password: 'password'
    },
    {
      id: 4,
      username: 'test-user-4',
      password: 'password'
    },
  ]
}

function makePieceArray() {
  return [
    {
      id: 1,
      user_id: 1,
      userName: 'test-user-1',
      piece: 'test-piece-1'
    },
    {
      id: 2,
      user_id: 1,
      userName: 'test-user-1',
      piece: 'test-piece-2'
    }
  ]
}

function makeStepArray() {
  return [
    {
      id: 1,
      user_id: 1,
      title: 'test-steps-1',
      content: 'step-list-1'
    },
    {
      id: 2,
      user_id: 1,
      title: 'test-steps-2',
      content: 'step-list-2'
    }
  ]
}

function makeGraphFixtures() {
  const testUsers = makeUsersArray()
  const testPieces = makePieceArray()
  const testSteps = makeStepArray()
  return { testUsers, testPieces, testSteps }
}

function makeMaliciousThing(graphusers) {
  const maliciousThing = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedThing = {
    ...makeExpectedThing([graphusers], maliciousThing),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousThing,
    expectedThing,
  }
}


// function cleanTables(db) {
//   return db.raw(
//     `TRUNCATE
//       piecesteps,
//       assignedpieces,
//       graphusers
//     `
//   )
// }
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        piecesteps,
        assignedpieces,
        graphusers
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE graphusers_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE piecesteps_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE assignedpieces_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('graphusers_id_seq', 0)`),
        trx.raw(`SELECT setval('piecesteps_id_seq', 0)`),
        trx.raw(`SELECT setval('assignedpieces_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('graphusers').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('graphusers_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedGraphTables(db, users, assignedpieces, piecesteps = []) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('assignedpieces').insert(piecesteps)
    await trx.raw(
      `SELECT setval('graphusers_id_seq', ?)`,
      [users[users.length - 1].id],
    )
  })
}

function seedPieces(db, testPieces) {
  const preppedPieces = testPieces.map(piece => ({
    ...piece
  }))
  return db.into('assignedpieces').insert(preppedPieces)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('assignedpieces_id_seq', ?)`,
        [testPieces[testPieces.length - 1].id],
      )
    )
}


function seedMaliciousChoreograph(db, graphusers) {
  return seedUsers(db, [graphusers])
    .then(() =>
      db
        .into('graphusers')
        .insert([graphusers])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}
// function makeAuthHeader(graphusers) {
//   const token = Buffer.from(`${graphusers.username}:${graphusers.password}`).toString('base64')
//   return `Basic ${token}`
// }

module.exports = {
  makeUsersArray,
  makeGraphFixtures,
  makeAuthHeader,
  makeMaliciousThing,

  cleanTables,
  seedGraphTables,
  seedMaliciousChoreograph,
  seedUsers,
  seedPieces
}