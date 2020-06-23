const express = require('express');
const router = express.Router();
const controllers = require('../controllers/logController');


// logs/
router
  .route('/')
  .get(controllers.readMany);

// logs/new
router
  .route('/new')
  .post(controllers.createOne);

// logs/:id
router
  .route('/:id')
  .get(controllers.readOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne);

module.exports = router;