const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    role: { 
        type: String,
         required: true
         },
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,

    },
    mobile:{
        type:Number,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true,

    },
    state:{
        type:String,
        required:true,

    },
    pincode:{
        type:Number,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    country:{
        type:String,
        required:true,

    },
});


userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



module.exports = mongoose.model('Users', userSchema);