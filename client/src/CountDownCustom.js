import React from "react";
import Countdown from "react-countdown";
import "./css/countDownCustom.css";

function CountDownCustom({dateTime}) {
  const Completionist = () => <span>The event has started! </span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="CountDownCustom">
          {/* <div className="countDown__title">Countdown to event! </div> */}
          <div className="countDown__time-card-container">
            <div className="countDown__time-card">
              <div className="countDown__Number">{days}</div>
              <div className="countDown__Num-label">DAYS</div>
            </div>
            <div className="countDown__time-card">
              <div className="countDown__Number">{hours}</div>
              <div className="countDown__Num-label">HOURS</div>
            </div>
            <div className="countDown__time-card">
              <div className="countDown__Number">{minutes}</div>
              <div className="countDown__Num-label">MINUTES</div>
            </div>
            <div className="countDown__time-card">
              <div className="countDown__Number">{seconds}</div>
              <div className="countDown__Num-label">SECONDS</div>
            </div>
          </div>
        </div>
      );
    }
  };


  return (
    <div>
      <Countdown date={dateTime} renderer={renderer} />
    </div>
  );
}

export default CountDownCustom;
