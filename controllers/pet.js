const Book = require('../models/book');
const Cart = require('../models/cart');


module.exports ={

        //get home page 


 homepage:async (req, res, next)=> {



      req.session.loggedIn = true;

  // req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
  // res.send(`Number of visits: ${req.session.visits}`);
    await Book.find({ })
                   
    .lean()
    .then(bookings =>{
      console.log(req.session);
  
     
      res.render('index',{
        title:'Petous Store',
        bookings: bookings,
        user: req.session.user,
        name:req.session.name

        
       
       
        
        
      })
    })
    .catch(err=>{
      console.log(err);
    });
  
    },
  
  
   
  
vetpage:(req, res, next)=> {
    res.render('vet', { title: 'Petous Gift Store' });
  },   
  

// addtocart:async (req, res)=> {

//   const bookID = req.params.bookID;
//   const userID = req.session.user._id;

//   try {
//     // Check if cart already exists for the user
//     let cart = await Cart.findOne({ userID: userID });

//     if (cart) {
//       // Cart already exists, add book to it
//       cart.books.push({ bookID: bookID, quantity: 1, price: 0 });
//       await cart.save();
//     } else {
//       // Cart does not exist, create a new one
//       cart = new Cart({
//         userID: userID,
//         books: [{ bookID: bookID, quantity: 1, price: 0 }]
//       });

//       await cart.save();
//     }

//     res.render('shopping-cart',{ success: true, message: 'Book added to cart successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }

  

// }, 







  cartpage:(req, res,next)=> {
    var bookId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Book.findById(bookId, function(err, book){
      if(err){
        return res.redirect('/');
      }
      cart.add(book,bookId);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');

    })
   

  
  }, 
  
 shoppage: (req, res,next)=> {
  req.session.loggedIn = true;
  if(!req.session.cart){
    return res.render('shopping-cart',{bookings:null,user: req.session.user,name:req.session.name});
  }
   var cart = new Cart(req.session.cart);
   res.render('shopping-cart',{
    bookings:cart.generateArray(),
    totalPrice:cart.totalPrice,
    user: req.session.user,
    name:req.session.name
  })


 },

 checkout:(req, res,next)=> {
  req.session.loggedIn = true;
  if(!req.session.cart){
    return res.redirect('/shopping-cart');

  }
  var cart = new Cart(req.session.cart) ;
  res.render('checkout',{
    total:cart.totalPrice,
    user: req.session.user,
    name:req.session.name
  });

 },

 checkoutpost:(req, res,next)=> {

  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
}
var cart = new Cart(req.session.cart);

var stripe = require("stripe")(
    "sk_test_51MZj1ASGGrHxWn9ZBqAC5jcYlEjLM3HfxoNyTXV2k5NVxsagR3leKFIIyhww5xXyjbc0r9iw5WAhk5gJIKVBGCib00VMJuRVL0"
);

stripe.charges.create({
  amount: cart.totalPrice * 100,
  currency: "inr",
  source: req.body.stripeToken, // obtained with Stripe.js
  description: "Test Charge"
}, function(err, charge) {
  if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
  }
  var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
  });
  order.save(function(err, result) {
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/');
  });
}); 




 }



  

 













}