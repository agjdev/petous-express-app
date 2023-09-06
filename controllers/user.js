


module.exports = {





  userdash: (req, res, next)=> {
    req.session.loggedIn = true;
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0,Pragma, no-cache,Expires, -1"
    );
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }
    res.render('u/dashboard', { 
   
      title: 'Petous Gift Store',
      user: req.session.user ,
      name:req.session.user.name 
    });
  },
 




}