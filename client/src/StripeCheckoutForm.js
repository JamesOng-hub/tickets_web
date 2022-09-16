import React, { useEffect, useState } from "react";
import { checkIfAuthenticated } from "./auth/helperFunctions";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function StripeCheckoutForm({values}) {
    const { name, description, date, time, price, quantity } = values;
    const stripe = useStripe(); //returns the refernce to the stripe instance passed to the elements Provider.
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token, user } = checkIfAuthenticated();

  const postTicketOwnership = () => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/product/updateOwner/${user._id}/${values.ticketId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        });
  }; 

  const updateTicketOwnership = () => {
    postTicketOwnership().then((data) => {
      if (data.error){
        console.log('updating ownership error', data.error); 
      }else{
        console.log('successfully updated ownership'); 
      }
    });
  }; 

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    //go the backend and update ownership. 
    updateTicketOwnership();
 
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/",
      },
    });


    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }



    setIsLoading(false);
  };
  return (
    <div>
        {/* <div>
            {name}
        </div>
        <div>
            {description}
        </div>
        <div>
            {date}
        </div>
        <div>
            {time}
        </div>
        <div>
            {price}
        </div>
        <div>
            {quantity}
        </div> */}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="my-2 btn btn-outline-dark">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner">spinner</div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}

export default StripeCheckoutForm;
