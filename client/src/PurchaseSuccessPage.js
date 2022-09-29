import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer'; 

function PurchaseSuccessPage() {
  let { ticketId } = useParams();
  return (
      <div id="page-container">
        <div id="content-wrap m-3">
          <Navbar />
          <div className="mt-3">
            You have successfully purchase your ticket.
          </div>
          <Link to={`/displayTicket/${ticketId}`}>
            <a>Click Here to View Ticket</a>
          </Link>
        </div>
        <footer id="footer">
        <Footer/>
      </footer>
      </div>
      
  );
}

export default PurchaseSuccessPage;
