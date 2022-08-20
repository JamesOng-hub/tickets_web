import React from "react";

function DisplayPDF({ticket}) {
  return (
    <div>
      <iframe
        src={`${process.env.REACT_APP_API_URL}/product/pdf/${ticket._id}`}
        // cant do ticket.ticketFile or ticket.ticketFile.data 
        //it needs to read it directly from the backend
        width="800"
        height="500"
      ></iframe>
    </div>
  );
}

export default DisplayPDF;