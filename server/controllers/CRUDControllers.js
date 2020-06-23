const db = require('../models/inventoryModel');

const readOne = (model) => async (req, res, next) => {
  console.log("inside readOne")
  next()
}

const readMany = (model) => async (req, res, next) => {
    // Set validation checks
    try {
      const { rows } = await db.query(`
        SELECT * FROM ${model}`
      );
      console.log(rows)
      res.locals.payload = rows;
      return next();
    } catch (error) {
      return next(error);
    }
}

const createOne = (model) => async (req, res, next) => {
  console.log("inside createOne")
  next()
}

const updateOne = (model) => async (req, res, next) => {
  console.log("inside updateOne")
  next()
}

const deleteOne = (model) => async (req, res, next) => {
  console.log("inside deleteOne")
  next()
}

module.exports = (model) => {
  return {
    readOne: readOne(model),
    readMany: readMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
  }
};