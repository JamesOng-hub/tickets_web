import React, {useState} from 'react'; 
import { checkIfAuthenticated } from "./auth/helperFunctions";

function PurchaseSuccessPage() {

  //call the backend and update the ticket.purchasedBy value. 
  //show success message, 
  //btn to see the purchased ticket.  

  //need a better way to update the ownership of the ticket. 

  // const [values, setValues] = useState({
  //   error: '', 
  //   success: false, 
  // }); 

  // const { token, user } = checkIfAuthenticated();

  // const postTicketOwnership = (userData) => {
  //   return fetch(
  //       `${process.env.REACT_APP_API_URL}/product/updateOwner/${user._id}/${ticketId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(userData),
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }; 

  // const updateTicketOwnership = () => {
  //   postTicketOwnership(user).then((data) => {
  //     if (data.error){
  //       setValues({...values, error: data.error});
  //     }else{
  //       setValues({...values, success: true});
  //     }
  //   });
  // }; 

  // useEffect(() => {
  //   updateTicketOwnership(); 
  // }, [])


  return (
    <>
  
      <div>
        <h5>You have successfully purchase this ticket 'ticketName'</h5>
        <a>Click Here to View Ticket</a>
      </div>
    </>

  )
}

export default PurchaseSuccessPage