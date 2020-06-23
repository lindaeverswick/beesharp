const { Pool, Client } = require('pg')
const connectionString = 'postgres://ahtywmkw:wkHRU9n3zLf4f4960N3b_ol9tD8nb2Bm@ruby.db.elephantsql.com:5432/ahtywmkw'
const pool = new Pool({
  connectionString: connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
})

const addInstrument = (Category, Make, Model, Color, InstrumentId) => {
  INSERT INTO instruments (Category, Make, Model, Color, InstrumentId, LastCheckout, isCheckedOut, NeedsRepair)
  VALUES (`'${Category}', '${Make}', '${Model}', '${Color}', '${InstrumentId}', '', false, false`); 
}
const addUser = (firstName, lastName, username, email, password, isAdmin) => {
  INSERT INTO users (firstName, lastName, username, email, password, isAdmin)
  VALUES (`'${firstName}', '${lastName}', '${username}', '${email}', '${password}', ${isadmin}`); 
}
//should userId be the username? or is this a unique key? how do we get the primary keys from a SQL table?
const addLog = (dateCheckedOut, dateCheckedIn, instrumentId, userId, checkOutNotes, checkInNotes) => {
  INSERT INTO log (dateCheckedOut, dateCheckedIn, instrumentId, userId, checkOutNotes, checkInNotes)
  VALUES (`'${dateCheckedOut}', '${dateCheckedIn}', '${instrumentId}', '${userId}', '${checkOutNotes}', '${checkInNotes}'`); 
}

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};