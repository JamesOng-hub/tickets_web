const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    userType: {
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);

//virtual field
userSchema.virtual('password').set(function(passwordInput){
  this.salt = uuidv1(); 
  this.hashed_password = this.encryptPassword(passwordInput);
}); 


userSchema.methods = {
  authenticate: function(plainPassword){
    return this.encryptPassword(plainPassword) === this.hashed_password; 
  }, 
  encryptPassword: function(plainPassword){
    if (!plainPassword) return ''; 
    try{
      return crypto.createHmac('sha1', this.salt).update(plainPassword).digest('hex');
    }catch (err){
      return ''; 
    }
  }
}



//TODO: implement listedTickets. 
//TODO: add a pdf file as part of the product.
//0: stands for user, 1 stands for admin.  
module.exports = mongoose.model('User', userSchema);