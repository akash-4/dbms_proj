const express = require('express');
const router = express.Router();


const auth = require('./auth');
const flight = require('./flights');
const ticket = require('./tickets');
const home = require('./home');



function isNotLoggedIn(req, res, next) {
  if (!req.session.key) return next();
  else res.redirect('/');
}

router.post(
  '/register',
  // validator(schemas.auth.register),
  auth.register
);

router.get('/logout', auth.logout);

// router.get(
//   '/getTokenDetails',
//   isNotLoggedIn,
//   // validator(schemas.auth.getTokenDetails),
//   auth.get
// );
// router.post(
//   '/setPassword',
//   isNotLoggedIn,
//   // validator(schemas.auth.setPassword),
//   auth.setPassword
// );


// Auth
router.post('/login', isNotLoggedIn,
//  validator(schemas.auth.login),
 auth.login);

router.get('/init', home.init);


router.get('/flights', flight.getFlights );

router.get('/tickets', ticket.myBookings);
router.post(
  '/booking/add',
  ticket.addBooking
);
module.exports = router;
