const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

// Subrouters
const instrumentRouter = require('./routes/instrumentRoutes');

const app = express();
const port = 3000;



// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Sub Routers
app.use('/api/instruments', instrumentRouter);




app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.use((err, req, res, next) => {
  const defErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: "An error occurred",
  };
  const errorObj = { ...defErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
