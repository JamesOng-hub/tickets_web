const express = require("express");
const router = express.Router();
const User = require("../model/users");
const jwt = require('jsonwebtoken');

require("dotenv").config(); //read up!

//read up about all these validator functions later.
// const signUpFormValidator = (req, res, next) => {
//     req.check('name', 'Name is required').notEmpty();
//     req
//       .check('email', 'Email must be between 3 to 32 characters')
//       .matches(/.+\@.+\..+/)
//       .withMessage('Email must contain @')
//       .isLength({
//         min: 4,
//         max: 32,
//       });
//     req.check('password', 'Password is required').notEmpty();
//     req
//       .check('password')
//       .isLength({ min: 6 })
//       .withMessage('Password must contain at least 6 characters')
//       .matches(/\d/)
//       .withMessage('Password must contain a number');
//     const errors = req.validationErrors();
//     if (errors) {
//       const firstError = errors.map((error) => error.msg)[0];
//       return res.status(400).json({ error: firstError });
//     }
//     next();
//   };

const signUp = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

const signIn = (req, res) => {
  console.log('req-body', req.body); 
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with this email does not exist, Please sign up",
      });
    }
    if (!user.authenticate(password)) {
      //calling the method for this model. user is an instance of this userModel(aka document)
      return res.status(400).json({
        error: "Email and password didn't match",
      });
    }

    //generate a signed token w the userId and the secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //keep the token as 'token' in cookie w expiry date
    // res.cookie("token", token, { expire: new Date() + 9999 });
    res.cookie('title', 'GeeksforGeeks');
    const { _id, name, email, userType } = user;
    return res.json({ token, user: { _id, email, name, userType } });
  });
};

const signOut = (req, res) => {
  console.log('signout backend'); 
  res.clearCookie('token'); 
  res.json({message: 'Signout success'}); 
}


//require signin 
//the expressjwt(); is going to generate a decoded payload 
//print this. it's in req.auth 
//

router.post("/signup", signUp);
router.post("/signin", signIn); //it is a post because we posted the email and the password
router.get('/signout', signOut); //is this a post? 
// `${process.env.REACT_APP_API_URL}/auth/signin`
module.exports = router;
