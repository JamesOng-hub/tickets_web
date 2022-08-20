const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
require('dotenv').config();
// import routes

const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/users');



// app
const app = express();

const connectDB = async () => {
  try{
      await mongoose.connect(
          process.env.MONGOURI, 
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
          }
      );
      console.log('mongodb connected');
  }catch (e){
      console.error(err.message); 
      // process.exit() 
  }
}
connectDB(); 


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/auth', authRoutes); 
app.use('/product', productRoutes);
app.use('/user', userRoutes); 

// `${process.env.REACT_APP_API_URL}/auth/signin`

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
