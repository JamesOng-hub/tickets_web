import React, { useState } from "react";
import SubmitTicketForm from "./SubmitTicketForm";
import Navbar from "./Navbar";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import Footer from './Footer'

function SellYourTicket() {
  const [values, setValues] = useState({
    toSell: false,
  });
  const { toSell } = values;

  const handleSellClick = () => {
    setValues({ ...values, toSell: true });
    // console.log(toSell);
  };

  return (
    <>
    <div>
      <Navbar />
      <div class="ticket">
        <div class="left"></div>
        <div class="right"></div>
        <div class="ticket-content-wrapper">
          <div>Sell your ticket easily through TicketBooth</div>
          <div className="sellYourTicket__header-p">
            A free and open marketplace to sell your unwanted tickets. Let's
            others enjoy the fun you are missing out.
          </div>
        </div>
      </div>
      {/* <div className="sellYourTicket__header-container second">
        
      </div> */}

      <div className="sellYourTicket__usp-container ">
        <div className="sellYourTicket__usp-title">
          Why Sell at Ticket Booth
        </div>
        <div className="sellYourTicket__usp-card-container ">
          <div className="sellYourTicket__usp-card  ">
            <VpnLockIcon className="sellYourTicket__usp-card-icon" />
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse blanditiis sit velit ducimus rem, quam architecto optio ullam ipsa quibusdam ipsum est iure laboriosam corrupti reprehenderit, itaque nam hic.
            </p>
          </div>
          <div className="sellYourTicket__usp-card  ">
            <VpnLockIcon className="sellYourTicket__usp-card-icon" />
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse blanditiis sit velit ducimus rem, quam architecto optio ullam ipsa quibusdam ipsum est iure laboriosam corrupti reprehenderit, itaque nam hic.
            </p>
          </div>
          <div className="sellYourTicket__usp-card  ">
            <VpnLockIcon className="sellYourTicket__usp-card-icon" />
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla esse blanditiis sit velit ducimus rem, quam architecto optio ullam ipsa quibusdam ipsum est iure laboriosam corrupti reprehenderit, itaque nam hic.
            </p>
          </div>
        </div>
      </div>
      <div className="sellYourTicket__btn-container">
        {!toSell && (
          <a href="#formSection">
            <button
              className="btn btn-outline-success"
              onClick={() => handleSellClick()}
            >
              Sell your ticket now
            </button>
          </a>
        )}
      </div>
      <div  id="formSection">{toSell && <SubmitTicketForm />}</div>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
}

export default SellYourTicket;
