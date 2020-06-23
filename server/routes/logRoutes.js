const express = require('express');
const router = express.Router();
const controllers = require('../controllers/logControllers');


// logs/
router
  .route('/')
  .get(
    controllers.readMany,
    (req, res) => res.status(200).json(res.locals)
  );

// logs/new
router
  .route('/new')
  .post(
    controllers.createOne,
    (req, res) => res.status(200).json(res.locals)
  );

// logs/:id
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