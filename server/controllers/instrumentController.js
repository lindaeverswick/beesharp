// IMPORT MODEL
const db = require('../models/inventoryModel');
// IMPORT CRUD CONTROLLER

const readOne = async (req, res, next) => {
  console.log("inside readOne")
  next()
}

const readMany = async (req, res, next) => {
  console.log("inside readMany")
  next()
}

const createOne = async (req, res, next) => {
  console.log("inside createOne")
  next()
}

const updateOne = async (req, res, next) => {
  console.log("inside updateOne")
  next()
}

const deleteOne = async (req, res, next) => {
  console.log("inside deleteOne")
  next()
}

module.exports = {
  readOne,
  readMany,
  createOne,
  updateOne,
  deleteOne,
};