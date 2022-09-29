import React, { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from './Search'; 
import TestComponent from "./TestComponent";
import { CircularProgress } from "@mui/material";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false); 

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
    setLoading(true); 
    fetchTickets().then((data) => {
      if (data.error) {
        //in the backend we passed a json object w key 'error'
        setError(data.error);
        setLoading(false); 
      } else {
        setTickets(data);
        setLoading(false); 
        // console.log("tickets", tickets);
      }
      // console.log("data:", data);
    });
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div id="page-container">
      <div id="content-wrap">
        <Navbar />
        <Search setTickets={setTickets} setError={setError} /> 
        <div className="home__ticketList ">
          {loading && (
            <div className="home__loading-container">
              <CircularProgress/>
            </div>
          )}
          {tickets.map((ticket, i) => (
            <div key={i} className=" bg-light">
              <Card ticket={ticket} />
              {/* <DisplayPDF ticket={ticket}/> */}
            </div>
          ))}
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
      <TestComponent/> 
    </div>
  );
}

export default Home;

//TODO: search feature for tickets
//TODO: location feature
//search location, stadium w google maps.
//show location on map.
//redirect to google maps from page.
