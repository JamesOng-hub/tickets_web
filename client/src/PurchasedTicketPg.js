
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import DisplayPDF from "./DisplayPDF";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import StripePayment from "./StripePayment";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import Maps from "./Maps";
import ParticlesBg from "./ParticlesBg";
import TestComponent from "./CountDownCustom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CountDownCustom from "./CountDownCustom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { useSnackbar } from 'notistack';
import Footer from './Footer'; 

function PurchasedTicketPg() {
  let { ticketId } = useParams();
  //fetch data of the specific ticket, w id.
  //then we can display the pdf on a diff page.
  //in that page, we have to query the specific ticket id as well

  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    // category,
    price: 0,
    quantity: 0,
    error: "",
    ticketId: ticketId,
  });

  const [latLng, setLatLng] = useState({
    lat: "",
    lng: "",
  });


  const [toBuyTicket, setToBuyTicket] = useState(false);
  const handleToBuyTicket = (event) => {
    setToBuyTicket(true);
  };

  const { name, description, date, time, location, price, quantity, error } =
    values;

  const { enqueueSnackbar } = useSnackbar();

  const fetchTicket = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/listOne/${ticketId}`,
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

  const loadTicket = () => {
    fetchTicket().then((data) => {
      // console.log('data', data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          date: data.date,
          time: data.time,
          location: data.location,
          // category,
          quantity: data.quantity,
        });
        convertLatLng(data.location);
      }
    });
  };

  const convertLatLng = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLatLng({ lat, lng });
  };

  //countdown timer
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div>
          <div className="time-card">
            <div>{days}</div>
            <div>DAYS</div>
          </div>
          <span>
            {days}:{hours}:{minutes}:{seconds}
          </span>
        </div>
      );
    }
  };

  useEffect(() => {
    loadTicket();
  }, []);

  return (
    <div id="page-container">
    <div id="content-wrap">
      <Navbar />
      <div className="ticketInfo__header-container">
        {/* <ParticlesBg className="particlesBg"/> */}
        <div className="ticketInfo__header-title">{name}</div>
      </div>
      <div className="pageBackground--bright ticketInfo__body-container">
        <span className="ticketInfo__body-title">Ticket Information</span>
        <div className="ticket ticketInfo__ticketcard">
          <div className="left"></div>
          <div className="right"></div>
          <div className="ticket-content-wrapper ticketInfo__ticket-content-wrapper">
            <div className="ticketInfo__title">{name}</div>
            <div className="ticketInfo__detail">
              <DateRangeIcon className="mr-3" />
              <span>{date}</span>
            </div>
            <div className="ticketInfo__detail">
              <AccessTimeIcon className="mr-3" />
              <span>{time}</span>
            </div>
            <div className="ticketInfo__detail">
              <LocationOnIcon className="mr-3" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* <div>
          <button onClick={()=> console.log(latLng)}>Console Log latLng</button>
        </div> */}
      </div>
      <div className="awards-cards">
        <div className="award-card__wrapper">
          <span className="ticketInfo__desp-title">
            <div>Description</div>
            <p className="ticketInfo__desp-subtitle">
              WHAT THE SELLER WANT YOU TO KNOW
            </p>
          </span>
          <div>{description}</div>
        </div>
        <div className="award-card__wrapper">
          <span className="ticketInfo__desp-title">
            <div>Location</div>
            <p className="ticketInfo__desp-subtitle">
              KNOW WHERE YOU NEED TO GO
            </p>
          </span>
          <Maps latLng={latLng} />
          {/* if the map is on the left, then it works.  */}
        </div>
        <div className="award-card__wrapper">
          <span className="ticketInfo__desp-title">
            <div>Countdown</div>
            <p className="ticketInfo__desp-subtitle">
              HOW MUCH TIME YOU HAVE LEFT
            </p>
          </span>
          <CountDownCustom dateTime={date + "T" + time + ":00"} />
        </div>
        <div className="award-card__wrapper">
        <span className="ticketInfo__desp-title">
          <div>View Your Ticket!</div>
          <p className="ticketInfo__desp-subtitle">
            DON'T FORGET YOUR TICKET
          </p>
        </span>
        <Link to={`/displayTicket/${ticketId}`}> 
          <div className="purchasedTicketPg__view-pdf-container">
            <div>View PDF </div>
            {/* <PictureAsPdfIcon /> */}
          </div>
        </Link>
        </div>

      </div>
    </div>
    <footer id="footer">
      <Footer/>
    </footer>
  </div>

  );
}

export default PurchasedTicketPg


