import React, {useState} from "react";

function Navbar() {

 

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ps-3">
        <a className="navbar-brand" href="/">
          Tickets 
        </a>
        <button

          className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div  className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-end w-100">
            <li className="nav-item">
              <a className="nav-link" href="/ticketSubmitForm">
                Sell Your Ticket 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signUp">
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signIn">
                Sign In
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/userDashboard">
                Profile
              </a>
            </li>

          </ul>
        </div>
      </nav>

      
    </>
  );
}

export default Navbar;
