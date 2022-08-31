import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayPDF from "./DisplayPDF";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import StripePayment from "./StripePayment";

function TicketInfo() {
  let { ticketId } = useParams();
  //fetch data of the specific ticket, w id.
  //then we can display the pdf on a diff page.
  //in that page, we have to query the specific ticket id as well

  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    // category,
    price: 0,
    quantity: 0,
    error: "",
    ticketId: ticketId, 
  });

  const [toBuyTicket, setToBuyTicket] = useState(false); 
  const handleToBuyTicket = (event) => {
    setToBuyTicket(true); 
  }; 

  const { name, description, date, time, price, quantity, error } = values;

  const fetchTicket = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/listOne/${ticketId}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTicket = () => {
    fetchTicket().then((data) => {
      // console.log('data', data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          date: data.date,
          time: data.time,
          // category,
          quantity: data.quantity,
        });
      }
    });
  };

  useEffect(() => {
    loadTicket();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        My ticketId: {ticketId}
        <div>Name: {name}</div>
        <div>Description: {description}</div>
        <div>Date: {date}</div>
        <div>Local Time: {time}</div>
        <div>add a countdown timer</div>
        <div>Price: {price}</div>
        <div>Quantity: {quantity}</div>
        {!toBuyTicket && (
          <button variant="contained" color="primary" onClick={()=> handleToBuyTicket()}>
            Buy Ticket
          </button>
        )}
        {toBuyTicket && <StripePayment values={values}  />}
        <div>Render component of show pdf when paid</div>
        <DisplayPDF ticketId={ticketId} />
      </div>
    </div>
  );
}

export default TicketInfo;
