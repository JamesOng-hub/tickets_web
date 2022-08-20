// import {useEffect, useState} from "react";
// const API_URL = process.env.REACT_APP_API;
import Navbar from './Navbar'; 
import Home from './Home'; 
import Login from './Login'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 
import SubmitTicketForm from './SubmitTicketForm';
import TicketInfo from './TicketInfo';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import UserDashboard from './UserDashboard';

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
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route exact element={<Home/>} path='/'/>
          <Route exact element={<Login/>} path='/login'/>
          <Route exact element={<SubmitTicketForm/>} path='/ticketSubmitForm'/>
          <Route exact element={<SignUp/>} path='/signUp'/>
          <Route exact element={<SignIn/>} path='/signIn'/>
          <Route exact element={<TicketInfo/>} path='/ticketInfo/:ticketId'/>
          <Route exact element={<UserDashboard/>} path='/userDashboard'/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//the submitTicketForm needs a userId too. 
