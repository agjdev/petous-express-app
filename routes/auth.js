var express = require('express');
var router = express.Router();
var controller = require('../controllers/auth');
const csrf = require("csurf");
const flash = require("express-flash");
const csrfProtection = csrf();
router.use(csrfProtection);
router.use(flash());

const { check, validationResult } = require('express-validator');

function vetAuth(req, res, next) {
    if (req.session.role === 'veterinarian') {
      next();
    } else {
      req.flash('error', 'Unauthorized access');
      res.redirect('/auth/login');
    }
  }





// const checkAuth = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.redirect('/login');
//     }
//     try {
//       const decoded = jwt.verify(token, secretKey);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.redirect('/login');
//     }
//   };


/* GET login page */

router.get('/login',  controller.login);




/* POST login page */

router.post('/login', controller.postlogin);






/* GET register page */


router.get('/register', controller.register);

/* POST register user */

router.post('/register', 
[
    check('name').isString(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
    check('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    check('mobile').isLength({ min: 10 }),
    check('pincode').isLength({ min: 6 })
],

controller.userRegistration);



router.get('/logout', controller.logout);










module.exports = router;