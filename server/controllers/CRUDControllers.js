const db = require('../models/inventoryModel');

const readOne = (model) => async (req, res, next) => {
  // Set validation checks
  try {
    const { rows } = await db.query(`
      SELECT * 
      FROM ${model}
      WHERE id = $1`,
      [req.params.id]
    );
    res.locals.payload = rows;
    return next();
  } catch (error) {
    return next(error);
  }
}

const readMany = (model) => async (req, res, next) => {
    // Set validation checks
    try {
      const { rows } = await db.query(`
        SELECT * FROM ${model}`
      );
      res.locals.payload = rows;
      return next();
    } catch (error) {
      return next(error);
    }
}

const createOne = (model) => async (req, res, next) => {
  try {
    // grab the keys and values
    let keys = Object.keys(req.body);
    let values = keys.map((el) => req.body[el])

    // create strings for sql query
    let valuesParameters = ""
    let keysString = ""
    for (let i = 0; i < values.length; i++){
      if (i !== values.length -1){
        keysString += `${keys[i]}, `
        valuesParameters += `$${i+1}, `
      } else {
        keysString += `${keys[i]}`
        valuesParameters += `$${i+1}`
      }
    }

    // Make query
    const { rows } = await db.query(`
      INSERT INTO ${model} (${keysString})
      VALUES (${valuesParameters}) 
      RETURNING *`,
      values
    );
    res.locals.payload = rows[0];
    return next();
  } catch (error) {
    return next(error);
  }
}

const updateOne = (model) => async (req, res, next) => {
  try {
    
    let keyValueString = "";
    let keys = Object.keys(req.body);
    let values = []
    let id = req.params.id;
    for (let i = 0; i < keys.length; i++ ){
      if (keys[i] !== 'id') {
        if (i !== keys.length -1){
          keyValueString += `${keys[i]} = $${i+1}, `
        } else {
          keyValueString += `${keys[i]} = $${i+1}`
        }
        values.push(req.body[keys[i]])
      }
    }
    values.push(id);

    // Make query
    const { rows } = await db.query(`
      UPDATE
        ${model}
      SET
        ${keyValueString}
      WHERE
        id = $${values.length}
      RETURNING 
        *`,
      values
    );
    
    res.locals.payload = rows[0];
    return next();
  } catch (error) {
    return next(error);
  }
}

const deleteOne = (model) => async (req, res, next) => {
  try {
    
    let id = req.params.id;

    // Make query
    const { rows } = await db.query(`
      DELETE FROM
        ${model}
      WHERE
        id = $1
      RETURNING 
        *`,
      [id]
    );
    res.locals.payload = rows[0];
    return next();
  } catch (error) {
    return next(error);
  }
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
