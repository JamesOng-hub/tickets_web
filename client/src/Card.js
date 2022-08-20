import React from "react"
import { Link } from 'react-router-dom'


function Card({ ticket }) {
  return (

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ticket.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            TO DO: Location Text
          </h6>
          <p className="card-text">{ticket.description}</p>
          <a className="card-text">${ticket.price}</a>
          <a className="card-text">Number of tickets: {ticket.quantity}</a>
        </div>
        <span>
        <Link to={`/ticketInfo/${ticket._id}`}> 
            <button variant="contained" color="primary">
              View Product
            </button>
          </Link>
        </span>

      </div>


  );
}

export default Card;
