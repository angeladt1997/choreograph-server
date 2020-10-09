const express = require('express')
const PieceService = require('./piece-service')
const { requireAuth } = require('../middleware/jwt-auth')
const {DATABASE_URL} = require('../config')
const knex = require('knex')
const db = knex({
  client:'pg',
  connection: DATABASE_URL
})
const pieceRouter = express.Router()
const jsonBodyParser = express.json()
const stepList = require('./steps_lists')

pieceRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    PieceService.getPiecesWithUser( 
      req.app.get('db'),
      req.user
      )
    .then(assignedpieces => {
      res.status(200).json(assignedpieces);
     console.log(pieces)
    })
    .catch(next)
  })

module.exports = pieceRouter; 