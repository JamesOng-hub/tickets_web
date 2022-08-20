

const express = require('express'); 
const router = express.Router(); 
const  formidable  = require('formidable');
const fs = require('fs'); //to read the file uploaded. 



const {ticketModel} = require('../model/ticket');

const getTicketById = (req, res, next, id) => {
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
    let form = new formidable.IncomingForm(); //A Node.js module for parsing form data, especially file uploads.
    form.keepExtensions = true; //to include the extensions of the original files or not. 
    form.parse(req, (err, fields, files) => {
        console.log('fields: ',  fields); 
        console.log('files: ', files); 
        // console.log('files.ticketFile.path', files.ticketFile.path);
    //   if (err) {
    //     return res.status(400).json({
    //       error: 'Image could not be uploaded',
    //     });
    //   }
      // check for all fields
      const { name, description, price, quantity } = fields;
  
      if (!name ||!description ||!price ||!quantity) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }
  
      let ticket = new ticketModel(fields);
  
      // 1kb = 1000
      // 1mb = 1000000
  
      if (files.ticketFile) {
        // console.log("FILES PHOTO: ", files.photo);
        if (files.ticketFile.size > 1000000) 
        // {
        //   return res.status(400).json({
        //     error: 'Image should be less than 1mb in size',
        //   });
        // }
        {console.log('file too big');}
        ticket.ticketFile.data = fs.readFileSync(files.ticketFile.path);
        ticket.ticketFile.contentType = files.ticketFile.type;
      }
      
      // ticket.ticketFile.data = files.ticketFile.type 
      // ticket.ticketFile.contentType
      console.log('ticket created: ', ticket); 
      ticket.save((err, result) => {
        if (err) {
          console.log('PRODUCT CREATE ERROR ', err);
          // return res.status(400).json({
          //   error: errorHandler(err),
          // });
        }
        res.json(result);
      });
    });
  };


const list = (req, res) =>{ //bear in mind, req and res are both standard arguments.
  //sort and limit. 
  ticketModel.find().exec((err, tickets)=>{
    if (err){
      return res.status(400).json({
        error: 'Products not found'
      }); //i assume we ahve to return this so that it doesnt run the subsequent code. 
    } 
    res.json(tickets); 
  }

  )
}


const testFunc =(req, res) =>{
  res.send('Hello world'); 
}
router.get('/', testFunc); 
router.get('/list', list);
router.post('/create', create); // 'product/create'
router.get('/pdf/:ticketId', showPDF); //   '/'

router.param('ticketId', getTicketById); 

// router.param('productId', productById); 

module.exports = router; 