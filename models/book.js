const mongoose = require('mongoose');
const Category = require('./category');

const bookSchema = new mongoose.Schema({
    petname:{
      type:String,
      required:true  

    },
    breed:{
        type:String,
        required:true  
  
      },
      category: {
        type: mongoose.Schema.Types.String,
        ref: 'Category',
        required: true
      }, 
    color:{
        type:String,
        required:true 

    },
    stock:{
        type:Number,
        required:true 
    },
    age:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true

       
    }

})


module.exports = mongoose.model('Book', bookSchema);
