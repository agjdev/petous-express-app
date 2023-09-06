const Users = require('../models/users');
const bcrypt = require('bcrypt');



const  { check, validationResult }  = require('express-validator');


module.exports = {



login:(req, res, next)=> {
    res.render('auth/login', { title: 'Petous Gift Store' , csrfToken: req.csrfToken()});
  },  



 

  postlogin: async (req, res, next) => {
  

    const user = await Users.findOne({email: req.body.email});
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.status(401).render('auth/login');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = {};
      req.session.user = user;
      req.session.role = user.role;
      if (req.session.user.role === 'veterinarian') {
        req.flash("success", "You have successfully logged in as a veterinarian");
        return res.redirect('/v/dashboard');
      } else if (req.session.user.role === 'user') {
        req.flash("success", "You have successfully logged in as a user");
        return res.redirect('/u/dashboard');
        // req.session.returnTo = req.originalUrl;
        //  return res.redirect(req.session.originalUrl || '/'); 
      } else {
        req.flash("error", "Unauthorized access");
        return res.redirect('/auth/login');
      }
    } else {
      req.flash("error", "Invalid username or password");
      return res.status(401).render('auth/login');
    }
  },


  
register:(req, res, next)=> {
    res.render('auth/register', { title: 'Petous Gift Store',csrfToken:req.csrfToken() });
  }, 
  
userRegistration: async (req, res, next)=> {
  


const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).render('auth/register',{ errors: errors.array() });
   
}





    const users = new Users({
        role:req.body.role,
        name : req.body.name,
        mobile:req.body.mobile,
        email:req.body.email,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode,
        password:req.body.password,
        country:req.body.country,



    });
  await users.save()
         .then(()=>{
            console.log("Registered the user successfully");
            req.flash("success", "You have successfully signed up");
            res.redirect('/auth/login');
         })
         .catch((err)=>{
          req.flash("error", "Error while signing up");
            console.log(err)
         });




  }, 


  logout : (req, res, next) => {
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
    );
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/auth/login');
    });

  },
  





}