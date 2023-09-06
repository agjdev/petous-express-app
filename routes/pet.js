var express = require('express');
var router = express.Router();
var controller = require('../controllers/pet')
const flash = require("express-flash");
router.use(flash());

router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'layouts'; // set your layout here
  next(); // pass control to the next handler
  });

  // const isAuth = (req, res, next) => {
  //   if (!req.session.user) {
  //     req.session.originalUrl = req.originalUrl; // Save the original URL
  //     return res.redirect('/auth/login');
  //   }
  //   next();
  // };

  function isAuth(req, res, next) {
    if (!req.session.user) {
      res.redirect('/auth/login');
    } else {
      next();
    }
  }


/* GET home page. */
router.get('/', controller.homepage);


router.get('/vet', controller.vetpage);

router.get('/add-to-cart/:id', isAuth, controller.cartpage);

router.get('/shopping-cart', isAuth, controller.shoppage);

router.get('/checkout', isAuth, controller.checkout )

router.post('/checkout', isAuth, controller.checkoutpost )











module.exports = router;