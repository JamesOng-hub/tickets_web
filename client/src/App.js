// import {useEffect, useState} from "react";
// const API_URL = process.env.REACT_APP_API;
import Home from './Home'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 
import SubmitTicketForm from './SubmitTicketForm';
import TicketInfo from './TicketInfo';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import SignOut from './auth/SignOut';
import UserDashboard from './UserDashboard';
import UpdateTicketForm from './UpdateTicketForm';
import StripePayment from './StripePayment';
import PurchasedTicketPg from './PurchasedTicketPg';
import PurchaseSuccessPage from './PurchaseSuccessPage';
import './App.css'; 
import SellYourTicket from './SellYourTicket';
import DisplayPDF from './DisplayPDF';

function App() {
  // const [data, setData] = useState("No data :(");
  
  // useEffect(() => {
  //   async function getData() {
  //     const url = `${API_URL}/hello`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setData(data.msg);
  //   }
  //   getData();
  // }, []); 

  //add usersID at the back of submit ticket form. 
  return (
    <div >
      <Router>
        <Routes>
          <Route exact element={<Home/>} path='/'/>
          <Route exact element={<SellYourTicket/>} path='/ticketSubmitForm'/>
          <Route exact element={<SignUp/>} path='/signUp'/>
          <Route exact element={<SignIn/>} path='/signIn'/>
          <Route exact element={<SignOut/>} path='/signOut'/>
          <Route exact element={<TicketInfo/>} path='/ticketInfo/:ticketId'/>
          <Route exact element={<UserDashboard/>} path='/userDashboard'/>
          <Route exact element={<PurchasedTicketPg/>} path='/myTicket/:ticketId'/>
          <Route exact element={<UpdateTicketForm/>} path='/updateTicket/:ticketId'/>
          <Route exact element={<PurchasedTicketPg/>} path='/purchasedTicket/:ticketId'/>
          <Route exact element={<DisplayPDF/>} path='/displayTicket/:ticketId'/>
          <Route exact element={<PurchaseSuccessPage/>} path='/purchaseSuccessPage/:ticketId'/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//the submitTicketForm needs a userId too. 
