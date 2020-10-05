const { Assertion } = require('chai')
const express = require('express')
const PieceService = require('./piece-service')
const { requireAuth } = require('../middleware/jwt-auth')
//const stepList = require('./steps_lists')

const pieceRouter = express.Router()
const jsonBodyParser = express.json()



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
    })
    .catch(next)
  })
  // .post(jsonBodyParser, (req, res, next) => {
  //   PieceService.createPieceForUser( 
  //     req.app.get('db'),
  //     req.user
  //     )
  //   .then(assignedpieces => {
  //     console.log(assignedpieces);
  //     res.status(200).json(assignedpieces[0]);
  //   })
  //   .catch(next)
  // })

// pieceRouter
//   .route('/:piece_id')
//   //.all(requireAuth)
//   .get((req, res, next) => {
//     PieceService.getPiecesWithUserAndId( 
//       req.app.get('db'),
//       req.user, req.params.assignedpieces.id
//       )
//     .then(assignedpieces => {
//       if(assignedpieces){
//         const stepsForPiece = (piecestepsTitle) => {
//           return {assignedpieces: piecesteps[piecestepsContent], 
          
//       }
//       .catch(next)
//       } 
//         }
// })


// pieceRouter
//   .route('/:piece_id')
//   //.all(requireAuth)
//   .post(jsonBodyParser, (req, res, next) => {
//     const { piecestepsTitle, piecestepsContent } = req.body
    
//     PieceService.changePieceStep( 
//       req.app.get('db'),
//       req.params.piecesteps.id, piecestepsTitle, piecestepsContent
//     )

//     .then(assignedpieces => {
//       assignedpieces = assignedpieces[0]
//       if(assignedpieces){
//         assignedpieces[piecestepsTitle] = piecestepsContent
//         const piecePieces = (piecestepsTitle) => {
//            return {name: assignedpieces[piecestepsTitle], 
//            }
//         assignedpieces.assignedpieces_id = {
//           content: piecePieces(piecestepsTitle)
//         }
//         res.status(200).json(assignedpieces)
//       } else {
//         res.sendStatus(404)
//       }
//     })
//   })

module.exports = pieceRouter; 