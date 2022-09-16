// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import {useParams} from 'react-router-dom';


// function DisplayPDF() {
//   let { ticketId } = useParams();
//   return (
//     <div>
//       <iframe src={`${process.env.REACT_APP_API_URL}/product/pdf/${ticketId}`} 
//       frameborder="1" 
//       scrolling="auto" 
//       height="1000" 
//       width="100%" 
//       ></iframe>
//     </div>
//   );
// }

// export default DisplayPDF;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams} from 'react-router-dom';
import {checkIfAuthenticated} from './auth/helperFunctions'; 

function DisplayPDF() {
  let { ticketId } = useParams();
  // need to authenticate user before displaying the ticket
  // we can authenticate using in the backend
  // but this iframe will not display pdf if we change the src below. 

  return (
    <div>
      <iframe src={`${process.env.REACT_APP_API_URL}/product/pdf/${ticketId}`} 
      frameborder="1" 
      scrolling="auto" 
      height="1000" 
      width="100%" 
      ></iframe>
    </div>
  );
}

export default DisplayPDF;
