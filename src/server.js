require('dotenv').config();


const knex = require('knex')
const { app } = require('./app')
const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  SSL: true
})

app.set('db', db)

app.listen(PORT, () => {
 console.log(`server is listening at ${PORT}`)
})