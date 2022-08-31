import React from 'react'; 
import DisplayPDF from './DisplayPDF'; 

function PurchasedTicketPg() {
  //   //authenticate the user in the backend. 

  //   const [values, setValues] = useState({
  //       name: "",
  //       description: "",
  //       date: "",
  //       time: "",
  //       // category,
  //       price: 0,
  //       quantity: 0,
  //       error: "",
  //     });

  //     const { name, description, date, time, price, quantity, error } = values;

  // const fetchTicket = () => {
  //   return fetch(
  //     `${process.env.REACT_APP_API_URL}/product/listOne/${ticketId}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const loadTicket = () => {
  //   fetchTicket().then((data) => {
  //     // console.log('data', data);
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({
  //         ...values,
  //         name: data.name,
  //         description: data.description,
  //         price: data.price,
  //         date: data.date,
  //         time: data.time,
  //         // category,
  //         quantity: data.quantity,
  //       });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadTicket();
  // }, []);

  return (
    <div>PurchasedTicketPg
                {/* <DisplayPDF ticketId={ticketId} /> */}
    </div>
  )
}

export default PurchasedTicketPg