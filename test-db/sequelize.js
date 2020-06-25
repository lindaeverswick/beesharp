const Sequelize = require('sequelize');

// Instantiate the DB
const sequelize = new Sequelize('postgres://vxqutzpq:J3LN82tDCzEXbNZU4-4Nt__zInvGdSrQ@ruby.db.elephantsql.com:5432/vxqutzpq');

const User = sequelize.define("users", {
  firstname: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
  lastname: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
  isadmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  google_id: {
    type: Sequelize.INTEGER,
  },
});

const Log = sequelize.define("log", {
  datecheckedout: Sequelize.DATEONLY,
  datecheckedin: Sequelize.DATEONLY,
  instrumentid: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users", // 'persons' refers to table name
      key: "id", // 'id' refers to column name in persons table
    },
  },
  checkoutnotes: Sequelize.STRING,
  checkinnotes: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Instrument = sequelize.define("instruments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: Sequelize.STRING,
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  color: Sequelize.STRING,
  details: Sequelize.STRING,
  lastcheckout: {
    type: Sequelize.INTEGER,
    references: {
      model: "logs", // 'persons' refers to table name
      key: "id", // 'id' refers to column name in persons table
    },
  },
  ischeckedout: Sequelize.BOOLEAN,
  needsrepair: Sequelize.BOOLEAN,
});

sequelize.sync({force: true})
  .then(() => {
    console.log('DB up to date');
    sequelize.close()
  });

module.exports = {
  Instrument,
  Log,
  User
};