jwt = require('jsonwebtoken')
const config = require('../config')
const {DATABASE_URL} = require('../config')
const knex = require('knex')
const db = knex({
  client:'pg',
  connection: DATABASE_URL
})
const PieceService = {
  getPiecesWithUser(db, user) {
    const pieces = db('assignedpieces')
      .where({ user_id: user.id })
      console.log(pieces)
      return (
        pieces
      );
  },
  getPiecesWithUserAndId(db, graphusers, assignedpieces) {
    const pieces = db('assignedpieces')
      .where({ user_id: graphusers.id, id: assignedpieces.id })
      .first()
      return (
        pieces
      );
  },
 
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
}

module.exports = PieceService