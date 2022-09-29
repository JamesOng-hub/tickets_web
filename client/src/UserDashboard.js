import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import UserPurchasedTickets from "./UserPurchasedTickets";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SellIcon from "@mui/icons-material/Sell";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import Footer from "./Footer";

function UserDashboard() {
  const [values, setValues] = useState({
    error: "",
    tickets: [],
    purchasedTickets: [],
  });

  const navigate = useNavigate();
  const { error, tickets, purchasedTickets } = values;

  //to display user information, we have the stuff stored in our local storage.
  //we can just take the basic info stored there and display it.
  const localUserDataIfExist = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("jwt-token")) {
      return JSON.parse(localStorage.getItem("jwt-token"));
    } else {
      return false;
    }
  };
  const { token, user } = localUserDataIfExist();

  const fetchListedTickets = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/user/myListedTickets/${user._id}`,
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

  const loadListedTickets = () => {
    fetchListedTickets().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, tickets: data });
        // console.log(tickets);
      }
    });
  };

  const sendDeleteReq = (ticketId) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/deleteTicket/${user._id}/${ticketId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const deleteTicket = (ticketId) => {
    sendDeleteReq(ticketId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate(0);
      }
    });
  };

  useEffect(() => {
    loadListedTickets();
  }, []);

  return (
    <div className="pageBackground--bright">
      <div id="page-container">
        <div id="content-wrap">
          <Navbar />
          <div className="userDashboard__info-card">
            <div className="userDashboard__info-card-title">User Info</div>
            <div className="userDashboard__info-card-title-dets">
              {user.name}
            </div>
            <div className="userDashboard__info-card-title-dets">
              {user.email}
            </div>
            {/* <div>
          UserType:{" "}
          {user.userType === 0 ? <div>Regular</div> : <div>Admin User</div>}
        </div> */}
          </div>
          {/* putting it into a separate component becuase the page wont display both purchased and listed tickets.  */}
          <UserPurchasedTickets user={user} />
          <div className="mx-2">
            <h5 className="userDashboard__title">Tickets You Are Selling</h5>
            {tickets !== [] &&
              tickets.map((ticket) => (
                <div key={ticket._id} className="userDashboard__ticket-card">
                  <div className="d-flex flex-column justify-content-between">
                    <div>
                      <div className="userDashboard__ticket-card-title">
                        {ticket.name}
                      </div>
                      <div className="userDashboard__ticket-card-desp">
                        {ticket.description}
                      </div>
                    </div>
                    <div className="userDashboard__ticket-card-dets">
                      <div className="mx-1">
                        <SellIcon /> RM{ticket.price}
                      </div>
                      <div className="mx-1">
                        <DateRangeIcon /> {ticket.date}, {ticket.time}
                      </div>
                      {/* <div><AccessTimeIcon/> {ticket.time}</div> */}
                      <div className="mx-1">
                        <LocationOnIcon /> {ticket.location}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to={`/updateTicket/${ticket._id}`}>
                      <button
                        variant="contained"
                        color="primary"
                        className=" userDashboard__ticket-card-btn btn btn-outline-dark"
                      >
                        Edit Details
                      </button>
                      <button
                        variant="contained"
                        color="primary"
                        className=" userDashboard__icon-btn btn btn-outline-primary"
                      >
                        <EditIcon />
                      </button>
                    </Link>
                    <div>
                      <button
                        className="userDashboard__ticket-card-btn btn btn-outline-danger"
                        onClick={() => deleteTicket(ticket._id)}
                      >
                        <DeleteOutlineIcon /> Delete
                      </button>
                      <button
                        className="userDashboard__icon-btn btn btn-outline-danger"
                        onClick={() => deleteTicket(ticket._id)}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {tickets.length === 0 && (
              <div>You are not selling any tickets. </div>
            )}
          </div>
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default UserDashboard;
