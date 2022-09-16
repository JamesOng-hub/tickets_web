import React from "react"
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SellIcon from '@mui/icons-material/Sell';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Card({ ticket }) {
  return (

      <div className="card card__custom">
          <div className="card-body-title-container">
            <div>{ticket.name}</div>
            <Link to={`/ticketInfo/${ticket._id}`}> 
              <div className="card-body-btn">
                <div>View Details</div>
                <KeyboardArrowRightIcon/>
              </div>
            </Link>
          </div>
        <div className="card-body">
          <div className="card-body-dets">
            <LocationOnIcon className="mx-2"/>
            <div className="text-muted">
              {ticket.location}
            </div>
          </div>
          <div className="card-body-dets">
            <DateRangeIcon className="mx-2"/>
            <div className="text-muted">
            {ticket.date}, {ticket.time}
            </div>
          </div>
          <div className="card-body-dets">
            <SellIcon className="mx-2"/>
            <div className="text-muted">
            ${ticket.price}
            </div>
          </div>
        </div>

      </div>


  );
}

export default Card;
