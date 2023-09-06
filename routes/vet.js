var express = require('express');
var router = express.Router();
const flash = require("express-flash");
var controller = require('../controllers/vet');


router.use(flash());

function vetAuth(req, res, next) {
    if (req.session.role === 'veterinarian') {
      next();
    } else {
      req.flash('error', 'Unauthorized access');
      res.redirect('/auth/login');
    }
  }



/* Get dashboard Page */

router.get('/dashboard', vetAuth, controller.vetdash);



module.exports = router;
