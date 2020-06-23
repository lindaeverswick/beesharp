const express = require('express');
const router = express.Router();
const controllers = require('../controllers/instrumentController');


// instruments/
router
  .route('/')
  .get(controllers.readMany);

// instruments/new
router
  .route('/new')
  .post(controllers.createOne);

// instruments/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;