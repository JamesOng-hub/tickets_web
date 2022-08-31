const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types; //mongoose.Schema , what is the difference.

const ticketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    ticketFile: {
      data: Buffer, 
      contentType: String, 
    },
    quantity: {
      type: Number,
    },
    date: {
      type: String,
      required: true, 
    }, 
    time: {
      type: String, 
      required: true, 
    },
    expireAt: {
      type: Date, 
      // required: true, 
    },
    sold: {
      type: Boolean,
      default: false,  
    },
    purchasedBy: {
      type: ObjectId, 
      ref: 'User'
    },
    user: {
      type: ObjectId, 
      ref: 'User', //this reference here is the reference of the model. 'mongoose.model('User', userSchema)'
    }
  },
  { timestamps: true }
);

//investigate how a user is related to a ticket 
//like how a user is related tp an order


//since every ticket is related to a user, 
// can we use this to list out all the tickets a user posted. 
// like how we use to list out all the orders that a user placed. 

ticketSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } ); 
module.exports.ticketSchema = ticketSchema; 
module.exports.ticketModel = mongoose.model('Ticket', ticketSchema);
//where is the name of the product used. 
