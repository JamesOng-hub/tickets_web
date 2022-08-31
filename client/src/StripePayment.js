import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51LaSD9B6L5puBsOuosffXQ4W3kbjgxLwxDFInjvLxvLUxfnrAaU0Qmdg5ls8CpheSx9gSw04VbFqyuK0j8RJDCnd007veoCQ0h"
);

const StripePayment = ({values}) => {




  const [clientSecret, setClientSecret] = useState(""); //client secret of the payment intent
  const getClientSecret = () => {
    fetch(`${process.env.REACT_APP_API_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceToCharge: values.price *100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  // const init = () => {
  //   loadTicket();
  //   getClientSecret();
  // };

  useEffect(() => {
    getClientSecret(); 
  }, []); 


  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm values={values} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
