require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const models = require('./model');
const redisStore = require('./config/redis')(session);
const routes = require('./routes');
const responseFormat = require('./utils/responseFormat');
const sessionSecret = require('./config/session').secret;
const app = express();

app.use(logger('dev'));
app.use((req, res, next) => {
  
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: sessionSecret,
      store: redisStore,
      cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    })
  );

app.use(cookieParser('secret'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(responseFormat);

app.use('/api', routes);



const port = 3000;
app.get('/', (req, res) => {
    res.send('Welcome To Bottle API 2.0 ' + process.env.NODE_ENV);
  });

models.sequelize.sync().then(
  () => {
    app.listen(port, () => {
      console.log('[SUCCESS] Listening on port ' + port);
    });
  },
  (err) => {
    console.log('[ERROR] Could not sync models: ', err);
  }
);
