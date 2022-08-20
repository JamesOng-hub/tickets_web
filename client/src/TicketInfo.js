import React from 'react'
import { useParams } from 'react-router-dom'

function TicketInfo() {
    let {ticketId} = useParams(); 
    //fetch data of the specific ticket, w id. 
    //then we can display the pdf on a diff page. 
        //in that page, we have to query the specific ticket id as well
  return (
    <div>
      My ticketId: {ticketId}
      <button>Buy Ticket</button>
      <div>Render component of show pdf when paid</div>
    </div>
  )
}

export default TicketInfo
