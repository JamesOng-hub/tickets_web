import React, {useState, useEffect } from 'react'; 



function UserDashboard() {
    const [listedTickets, setListedTickets] = useState([]); 


    //to display user information, we have the stuff stored in our local storage.
    //we can just take the basic info stored there and display it.
    const localUserDataIfExist = () => {
        if (typeof window === 'undefined'){
            return false; 
        }

        if (localStorage.getItem('jwt-token')){
            return JSON.parse(localStorage.getItem('jwt-token'));
        }else{
            return false; 
        }
    }
    const {token, user} = localUserDataIfExist(); 

    // const getUserData = (userId, token) => {
    //     return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${token}`,
    //         },
    //     }).then((res) => {
    //         return res.json(); //here we are converting response to json. 
    //     }).catch((err)=>{
    //         console.log(err); 
    //     });
    // };

    // useEffect(()=>{

    // }); 
 
  return (
    <div>
        <h5>User Info</h5>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>UserType: {user.userType === 0? (<div>Regular</div>): (<div>Admin User</div>)}</div>
    </div>
  )
}

export default UserDashboard