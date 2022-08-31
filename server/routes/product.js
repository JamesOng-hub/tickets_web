
const express = require('express'); 
const router = express.Router(); 
const  formidable  = require('formidable');
const fs = require('fs'); //to read the file uploaded. 
const {getUserById, requireSignInAndAuth} = require('./users');
const _ = require('lodash'); //to use its .extend() function. 


const {ticketModel} = require('../model/ticket');

const getTicketById = (req, res, next, id) => {
  console.log('calling get ticket by id'); 
  ticketModel.findById(id).exec((err,ticket) => { //rmb the param of exec func
    if ( err || ! ticket){
      return res.status(400).json({
        error: 'Ticket not found',
      });
    }
    req.ticket = ticket; 
    next(); 
  }); 
}

const showPDF = (req, res, next) =>{//why do we have to next this? 
  if (req.ticket.ticketFile.data){
    res.set('Content-Type', req.ticket.ticketFile.contentType); 
    return res.send(req.ticket.ticketFile.data); 
  }
  // next(); //whyyyyy
}


//investigate create function and test w insomnia. 
const create = (req, res) => {
    // console.log('req~create', req); 
    let form = new formidable.IncomingForm(); //A Node.js module for parsing form data, especially file uploads.
    form.keepExtensions = true; //to include the extensions of the original files or not. 
    form.parse(req, (err, fields, files) => {
        console.log('fields: ',  fields); 
        console.log('files: ', files); 
      if (err) {
        return res.status(400).json({
          error: 'Ticket File could not be uploaded',
        });
      }
      // check for all fields
      const { name, description, price, quantity, date, time } = fields;
      //the Names of this fields are specified in the Name property. 
      if (!name ||!description ||!price ||!quantity || !date || !time) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }
  
      let ticket = new ticketModel(fields);
      
      //dateTime
      const event = new Date(date);
      event.setHours(time.split(':')[0]); 
      event.setMinutes(time.split(':')[1]); 

      ticket.expireAt = event;
      console.log("ticket expirea at", ticket.expireAt); 
      // 1kb = 1000
      // 1mb = 1000000
      ticket.user = req.user; 
      if (files.ticketFile) {
        // console.log("FILES PHOTO: ", files.photo);
        if (files.ticketFile.size > 10000000) 
        {
          return res.status(400).json({
            error: 'Ticket File should be less than 1mb in size',
          });
        }
        ticket.ticketFile.data = fs.readFileSync(files.ticketFile.path);
        ticket.ticketFile.contentType = files.ticketFile.type;
      }
      
      // ticket.ticketFile.data = files.ticketFile.type 
      // ticket.ticketFile.contentType
      console.log('ticket created: ', ticket); 
      ticket.save((err, result) => {
        if (err) {
          console.log('PRODUCT CREATE ERROR ', err);
          return res.status(400).json({
            error: err,
          });
        }
        res.json(result);
      });
    });
  };


const list = (req, res) =>{ //bear in mind, req and res are both standard arguments.
  //sort and limit. 
  ticketModel.find({sold: false}).exec((err, tickets)=>{
    if (err){
      return res.status(400).json({
        error: 'Products not found'
      }); //i assume we ahve to return this so that it doesnt run the subsequent code. 
    } 
    res.json(tickets); 
  }
  );
};

const listOneTicket = (req, res) => {
  res.json(req.ticket); 
};

const update = (req, res) => {
  console.log('calling update in backend'); 
  let form = formidable.IncomingForm(); 
  form.keepExtensions = true; 
  form.parse(req, (err, fields, files) => {
    if (err){
      return res.status(400).json({
        error: 'Unable to upload ticket', 
      }); 
    }

      let ticket = req.ticket; 
      ticket = _.extend(ticket, fields); 

      if (files.ticketFile){
        if (files.ticketFile > 1000000){
          return res.status(400).json({
            error: "Ticket file should be less than Xmb in size",
          });
        }

        ticket.ticketFile.data = fs.readFileSync(files.ticketFile.path); 
        ticket.ticketFile.contentType = files.ticketFile.type; 
      }

      ticket.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err, 
          }); 
        }
        res.json(result); //exclude the pdf and send back. 
      }); 
  }); 
}; 

const deleteTicket = (req, res) => {
  // console.log('req.ticket', req.ticket); 
  let ticket = req.ticket; 
  ticket.remove((err, deleteTicket) => {
    if (err){
      return res.status(400).json({
        error: err, 
      }); 
    }
    res.json({
      message: 'Ticket deleted successfully'
    }); 
  }); 
};


const updateOwner = (req, res) => {
  console.log('req.ticket   ', req.ticket); 
  console.log('req.user   ', req.user); 
  let ticket = req.ticket;  
  ticket.purchasedBy = req.user.id; 
  ticket.sold = true; 
  ticket.expireAt = new Date(ticket.expireAt.valueOf() + 604800000); //add 2 weeks before we delete from db. 
  ticket.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err, 
      }); 
    }
    res.json(result); //exclude the pdf and send back. 
  }); 
}; 
const listOneTicketPurchased = (req, res) => {
  return; 
}; 

const testFunc =(req, res) =>{
  res.send('Hello world'); 
};

router.post('/create/:userId', requireSignInAndAuth, create); // 'product/create'

//used in single ticket page and update ticket form. 
router.get('/listOne/:ticketId', listOneTicket); 
router.post('/updateOwner/:userId/:ticketId', updateOwner); 
router.get('/listOnePurchased/:userId/:ticketId',requireSignInAndAuth, listOneTicketPurchased); 

router.get('/list', list);
router.post('/updateTicket/:userId/:ticketId',requireSignInAndAuth, update);
router.delete('/deleteTicket/:userId/:ticketId', requireSignInAndAuth, deleteTicket); 
router.get('/pdf/:ticketId', showPDF);

router.param('userId', getUserById); 
router.param('ticketId', getTicketById); 
// router.param('productId', productById); 

// /product/update/:userId/:ticketId
module.exports.productRoutes = router; 