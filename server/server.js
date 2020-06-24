const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

// Subrouters
const instrumentRouter = require('./routes/instrumentRoutes');
const logRouter = require('./routes/logRoutes');

const app = express();
const port = 3000;



// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Sub Routers
app.use('/api/instruments', instrumentRouter);
app.use('/api/logs', logRouter);




app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.use((err, req, res, next) => {
  console.log("Error Message: ", err.message)
  res.status(400).json("Express error handler caught unknown middleware error");
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
