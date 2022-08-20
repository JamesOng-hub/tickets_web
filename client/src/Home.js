import React, { useEffect, useState } from "react";
import Card from "./Card";
import DisplayPDF from "./DisplayPDF";
import SubmitTicketForm from "./SubmitTicketForm";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState([]);

  const fetchTickets = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/list`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTickets = () => {
    fetchTickets().then((data) => {
      if (data.error) {
        //in the backend we passed a json object w key 'error'
        setError(data.error);
      } else {
        setTickets(data);
        console.log("tickets", tickets);
      }
      console.log("data:", data);
    });
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div className="home__ticketList row">
      {tickets.map((ticket, i) => (
        <div key={i} className="col-sm-6 col-12 col-md-4 bg-light">
          <Card ticket={ticket}/>
          {/* <DisplayPDF ticket={ticket}/> */}
        </div>
      ))}
    </div>
  );
}

export default Home;