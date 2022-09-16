const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const { ticketModel } = require("../model/ticket");

const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  });
};

//tested~insomnia
const requireSignInAndAuth = (req, res, next) => {
  //these are standard params, all middleware takes these params,  unlike how sometimes we use next to describe a callback function.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, auth_user) => {
    //this functipn verifies the token w our secret.
    console.log(err);

    if (err) return res.sendStatus(403);

    req.auth = auth_user;
  });
  // console.log('req.auth', req.auth);
  // console.log('req.user', req.user);
  let user = req.user && req.auth && req.user._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  console.log("authenticated in backend!");
  next();
};

//tested~ insomnia
const read = (req, res) => {
  req.user.hashed_password = undefined;
  req.user.salt = undefined;
  return res.json(req.user);
};

const myListedTickets = (req, res) => {
    console.log(req.user._id); 
  ticketModel
    .find({ user: req.user._id }) //we can query this based on the obejctId. 
    .select('-ticketFile')
    .populate("user", "_id")
    .sort({ updatedAt: -1 }) //read sort documentation
    .exec((err, tickets) => {
      if (err) {
        return res.status(400).json({ //return here so that it doenst run the code below. 
          error: err,
        });
      } 
      res.json(tickets);
    });
};

const myPurchasedTickets = (req, res) => {
  // console.log(req.user._id); 
  ticketModel
    .find({ purchasedBy : req.user._id }) //we can query this based on the obejctId. 
    .select('-ticketFile')
    .populate("purchasedBy", "_id")
    .sort({ updatedAt: -1 }) //read sort documentation
    .exec((err, tickets) => {
      if (err) {
        return res.status(400).json({ //return here so that it doenst run the code below. 
          error: err,
        });
      } 
      res.json(tickets);
    });
}; 


const testFunc = (req, res) => {
  return res.send("testFunction");
};
router.get("/test", testFunc);
router.get("/:userId", requireSignInAndAuth, read);
router.get("/myListedTickets/:userId", myListedTickets); //add authentication. 
router.get("/myPurchasedTickets/:userId", myPurchasedTickets); //add authentication. 
router.param("userId", getUserById);
// {process.env...}/user/myListedTickets/:userId

module.exports.getUserById = getUserById; 
module.exports.requireSignInAndAuth = requireSignInAndAuth; 
module.exports.userRoutes = router;
