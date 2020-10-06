  
process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'

require('dotenv').config()

const supertest = require('supertest')

global.expect = expect
global.supertest = supertest