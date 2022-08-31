import React, { useState, useEffect } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function UserPurchasedTickets({ user }) {
  const [values, setValues] = useState({
    error: "",
    purchasedTickets: [],
  });

  const { error, purchasedTickets } = values;

  const fetchPurchasedTickets = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/user/myPurchasedTickets/${user._id}`,
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

  const loadPurchasedTickets = () => {
    fetchPurchasedTickets().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, purchasedTickets: data });
        // console.log(tickets);
      }
    });
  };

  useEffect(() => {
    loadPurchasedTickets();
  }, []);

  return (
    <div className="mx-2">
      <h5 className="userDashboard__title">Tickets You Have Purchased</h5>
      <div className="row">
        {purchasedTickets.map((ticket) => (
          <div key={ticket._id} className="userDashboard__ticket-card userDashboard__purchased-ticket-card">
            <div className="userDashboard__ticket-card-title">{ticket.name}</div>
            {/* <div>{ticket.description}</div> */}
            <div className="userDashboard__purchased-ticket-card-dets">
              {/* <span>RM {ticket.price}</span> */}
              <div>
                <DateRangeIcon />
                {ticket.date}, {ticket.time}
              </div>
              <div>
                <LocationOnIcon />
                Location
              </div>
            </div>

            <div>
              <button className="btn btn-outline-dark mt-5">View Ticket</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserPurchasedTickets;
