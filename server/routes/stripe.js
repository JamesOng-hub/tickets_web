const express = require('express'); 
const router = express.Router(); 
//insert stripe secret key. 
const stripe = require('stripe')('sk_test_51LaSD9B6L5puBsOuaNRtniBT4cMhXTbhR8uJnrfk73tKaQW8L4JKjimRDFi5ohSwBiSsLaDPlPMeftLZCFVR2aEM00EDoaaVfj');



const createPaymentIntent =  (req, res) => {
    const { priceToCharge } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    console.log('calling createPaymentIntent'); 
    stripe.paymentIntents.create({
      amount: priceToCharge,
      currency: "gbp",
      payment_method_types: ['card'],
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    }).then((paymentIntent) => {
        res.send({
            clientSecret: paymentIntent.client_secret,
          });
    }); 
  
};
//${process.env.REACT_APP_API_URL}/payment/create-payment-intent
router.post("/create-payment-intent", createPaymentIntent); 
module.exports = router;