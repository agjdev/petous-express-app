const db = require('../config/connection');
const Book = require('../models/book');
const { countDocuments } = require('../models/category');
const Category = require('../models/category');
const User =  require('../models/users');


const adminusername ="admin";
const adminpassword = "admin123";

module.exports = {

  


    //get home page 


 dashboard:async(req, res)=> {

  const count = await User.countDocuments();
  const petcount =  await Book.countDocuments()

    res.render('admin/dashboard', {
      authenticated: true,
      count:count,
      petcount:petcount,
       title: 'Petous Gift Store' });
  },


  //get category list



categorylist: async (req, res, next)=> {

  await Category.find()
                 
                .lean()
                .then(category=>{
                  console.log(category);
                  res.render('admin/categorylist',{
                    authenticated: true,
                    category: category
                    
                  })
                })
                .catch(err=>{
                  console.log(err);
                });

 
},

  //get addCategoryForm

addCategoryForm:(req, res, next)=> {
  res.render('admin/addcategory', {authenticated: true, title: 'Petous Gift Store' });
},

//post category

postcategory:(req, res, next)=> {

  const name = req.body.name;

  const category = new Category ({
    name:name

  });

  category.save()
  .then(()=>{
    console.log("Add New Category");
  })
  .catch((err)=>{
    console.log(err);
  });




},

//get blank page

blank: (req, res, next)=> {
    res.render('admin/blank', { title: 'Petous Gift Store' });
  },  





petlist: async (req, res, next)=> {

  await Book.find({ })
                 
                .lean()
                .then(bookings =>{
                 
                  res.render('admin/petlist',{authenticated: true,
                    bookings: bookings
                    
                    
                  })
                })
                .catch(err=>{
                  console.log(err);
                });






 
},  

newpet: async (req, res, next)=> {
  await Category.find()
                 .lean()
                .then(categories =>{
                
                  res.render('admin/new-pet',{
                    authenticated: true,
                    categories: categories
                    
                  })
                })
                .catch(err=>{
                  console.log(err);
                });



 
 
},  



newpetpost: async (req, res)=> { 


  const petname = req.body.petname;
  const breed = req.body.breed;
  const category = req.body.category ;
  const color = req.body.color;
  const age = req.body.age;
  const stock = req.body.stock;
  const city = req.body.city;
  const price = req.body.price;
  const image = req.file.path;

  console.log(req.body);

  // right side represent the data taken from form and left side represent data on schema

   const book = new Book({
    petname:petname,
    breed:breed,
    category:category,
    color:color,
    age:age,
    stock:stock,
    city:city,
    price:price,
    image:image,
  });

   book.save()
       .then(() =>  {
      //  console.log(result);
        console.log("Added a New Pet");
       res.redirect ('/admin/petlist'); 
      })
       .catch((err)=>{
        console.log(err);

       });

 
}, 


adminlogin:(req, res, next)=> {

  res.render('admin/login', {authenticated: false, title: 'Petous Gift Store' });
}, 


postadminlogin:(req,res)=> {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }



  if(adminusername === username && adminpassword === password){
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  }else{
    res.render('admin/login');

  }




},




userslist:async (req, res, next)=> {

  const count = await User.countDocuments();

  
  await User.find()
                 
                .lean()
                .then(users=>{
                  console.log(users);
                  res.render('admin/userslist',{
                    authenticated: true,
                    users: users,
                    count:count
                    
                  })
                })
                .catch(err=>{
                  console.log(err);
                });

  



  },


adminlogout: (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to destroy session" });
    }
    return res.redirect("/admin/login");
  });
},





}