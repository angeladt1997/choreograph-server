const bcrypt = require('bcryptjs')

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

function makeGraphFixtures() {
  const testUsers = makeUsersArray()
  return { testUsers }
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


function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      piecesteps,
      assignedpieces,
      graphusers
    `
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
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedGraphTables(db, graphusers, assignedpieces, piecesteps = []) {
  return db.transaction(async trx => {
    await seedGraphusers(trx, graphusers)
    await trx.into('assignedpieces').insert(piecesteps)
    await trx.raw(
      `SELECT setval('graphusers_id_seq', ?)`,
      [graphusers[graphusers.length - 1].id],
    )
  })
}


function seedMaliciousChoreograph(db, graphusers) {
  return seedUsers(db, [graphusers])
    .then(() =>
      db
        .into('graphusers')
        .insert([graphusers])
    )
}


function makeAuthHeader(graphusers) {
  const token = Buffer.from(`${graphusers.username}:${graphusers.password}`).toString('base64')
  return `Basic ${token}`
}

module.exports = {
  makeUsersArray,
  makeGraphFixtures,
  makeAuthHeader,
  makeMaliciousThing,

  cleanTables,
  seedGraphTables,
  seedMaliciousChoreograph,
  seedUsers
}