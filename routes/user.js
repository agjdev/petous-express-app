var express = require('express');
var router = express.Router();
const flash = require("express-flash");
var controller = require('../controllers/user')

router.use(flash());


function userAuth(req, res, next) {
    if (req.session.user && req.session.user.role === 'user') {
      next();
    } else {
      req.flash('error', 'Unauthorized access');
      res.redirect('/auth/login');
    }
  }



/* Get dashboard Page */

router.get('/dashboard', userAuth, controller.userdash);






module.exports = router;
