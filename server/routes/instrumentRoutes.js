const express = require('express');
const router = express.Router();
const controllers = require('../controllers/instrumentControllers');


// instruments/
router
  .route('/')
  .get(
    controllers.readMany,
    (req, res) => res.status(200).json(res.locals)
  );

// instruments/new
router
  .route('/new')
  .post(
    controllers.createOne,
    (req, res) => res.status(200).json(res.locals)
  );

// instruments/:id
router
  .route('/:id')
  .get(
    controllers.readOne,
    (req, res) => res.status(200).json(res.locals)
  )
  .put(
    controllers.updateOne,
    (req, res) => res.status(200).json(res.locals)
  )
  .delete(
    controllers.deleteOne, 
    (req, res) => res.status(200).json(res.locals)
  );

module.exports = router;