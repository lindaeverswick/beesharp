const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const secrets = require('./secrets')

// Subrouters
const instrumentRouter = require('./routes/instrumentRoutes');
const logRouter = require('./routes/logRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();
const port = 3000;

// Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

  // set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [secrets.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


// Sub Routers
app.use('/api/instruments', instrumentRouter);
app.use('/api/logs', logRouter);
app.use('/api/users', userRouter);
app.use('/auth', authRouter)


app.get("/", (req, res) => {
  if (req.user) {
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
  } else {
    res.redirect('/auth/login');
  }
});

app.use((err, req, res, next) => {
  console.log("Error Message: ", err.message);
  res.status(400).json("Express error handler caught unknown middleware error");
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
