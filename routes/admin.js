var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin')
const db = require('../config/connection');
const multer = require('multer');
const fs = require('fs');





const adminLoginRequired = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(401).render('admin/login',{ error: "Admin login required" });
  }
  next();
};


/*
* multer has buitin method called diskstorage which takes 2 functions destination and file name
* destination option is call back function that takes 3 arguments 
* req - incoming request object
* file - incoming file object
* cb -  callback : takes 2 arguments first is error which we pass null and second is destination folder

*/
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dir = 'public/petuploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },

  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const fileFilter = (req, file, cb) => {
  // Allowing only image files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'adminLayouts'; // set your layout here
  next(); // pass control to the next handler
  });



/* GET users listing. */
router.get('/dashboard', adminLoginRequired,controller.dashboard );


/* GET category listings. */


router.get('/categorylist', adminLoginRequired, controller.categorylist);


/* GET Category Form. */

router.get('/addcategory', adminLoginRequired, controller.addCategoryForm );


/* Post category */

router.post('/addcategory',  controller.postcategory);





/* Get Pet List Page */
router.get('/petlist', adminLoginRequired, controller.petlist );


/* Get New Pet Page */


router.get('/newpet', adminLoginRequired, controller.newpet );


/* Add New Pet Page */

router.post('/newpet', upload.single('image'), controller.newpetpost );


router.get('/blank', adminLoginRequired, controller.blank );


// Admin Login

router.get('/userslist', adminLoginRequired,  controller.userslist);

router.get('/login',  controller.adminlogin);

router.post('/login',  controller.postadminlogin);



router.get('/logout', controller.adminlogout);



module.exports = router;
