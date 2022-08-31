import React, { useState } from "react";
import SubmitTicketForm from "./SubmitTicketForm";
import Navbar from "./Navbar";
import VpnLockIcon from "@mui/icons-material/VpnLock";

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
        <div className="sellYourTicket__usp-card-container row">
          <div className="sellYourTicket__usp-card col-md-6 col-12 ">
            <VpnLockIcon className="sellYourTicket__usp-card-icon" />
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              With TicketSwap, you are guaranteed to receive your money, because
              buyers pay online. We only send the tickets to the buyer once the
              payment is complete. We will send your payment the next working
              day to your banking institution, but please note it may take
              longer for your bank to show the funds in your account.
            </p>
          </div>
          <div className="sellYourTicket__usp-card col-md-6 col-12 ">
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              With TicketSwap, you are guaranteed to receive your money, because
              buyers pay online. We only send the tickets to the buyer once the
              payment is complete. We will send your payment the next working
              day to your banking institution, but please note it may take
              longer for your bank to show the funds in your account.
            </p>
          </div>
          <div className="sellYourTicket__usp-card col-md-6 col-12 ">
            <div className="sellYourTicket__usp-card-title">
              It's super safe
            </div>
            <p>
              With TicketSwap, you are guaranteed to receive your money, because
              buyers pay online. We only send the tickets to the buyer once the
              payment is complete. We will send your payment the next working
              day to your banking institution, but please note it may take
              longer for your bank to show the funds in your account.
            </p>
          </div>
        </div>
      </div>
      <div className="sellYourTicket__btn-container">
        {!toSell && (
          <button
            className="btn btn-outline-success"
            onClick={() => handleSellClick()}
          >
            Sell your ticket now
          </button>
        )}
      </div>
      <div>{toSell && <SubmitTicketForm />}</div>
    </>
  );
}

export default SellYourTicket;
