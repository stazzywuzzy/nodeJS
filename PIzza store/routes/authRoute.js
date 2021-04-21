const passport = require('passport');
const Account = require('../models/Account');
const router = require('express').Router();

function authenticationMiddleware(req, res, next) {
  console.log('auth');
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, street: req.body.street, postalCode: req.body.postalCode, province: req.body.province, country: req.body.country}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/login');
  });
});

router.get('/login', function(req, res) {
  console.log('get to login');
  res.render('login', {});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/', authenticationMiddleware, function(req, res) {
    console.log('In / User : ', req.user.username);
    res.redirect('/order.html')
  });
  



module.exports = router;
