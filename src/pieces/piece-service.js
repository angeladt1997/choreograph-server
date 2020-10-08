jwt = require('jsonwebtoken')
const config = require('../config')
const {DATABASE_URL} = require('../config')
const knex = require('knex')
const db = knex({
  client:'pg',
  connection: DATABASE_URL
})
const PieceService = {
  // getPiecesWithUser(db, user) {
  //   const pieces = db('assignedpieces')
  //     .where({ user_id: user.id })
  //     return (
  //       pieces
  //     );
  // },
  // getPiecesWithUserAndId(db, graphusers, assignedpieces) {
  //   const pieces = db('assignedpieces')
  //     .where({ user_id: graphusers.id, id: assignedpieces.id })
  //     .first()
  //     return (
  //       pieces
  //     );
  // },
  getPieces(db) {
    return db
      .from('assignedpieces')
      .select(
        'assignedpieces.id',
        'assignedpieces.user_id',
        'assignedpieces.piece'
      ) 
      .where('assignedpieces.id', assignedpieces_id)
      .first()
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