import React, { useState } from "react";
import { Navigate } from "react-router-dom"; //older version use Redirect.
import SignOut from './SignOut';
import Navbar from "../Navbar";

function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });

  const { email, password, error, loading, redirect } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const storeAuthResToLocalStorage = (data) => {
    //the BOM browser object model can be accessed through the window object
    if (typeof windwow == "undefined") {
      localStorage.setItem("jwt-token", JSON.stringify(data));
      console.log("jwt-token stored in localStorage");
    }
  };

  const checkIfAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt-token")) {
      return JSON.parse(localStorage.getItem("jwt-token"));
    } else {
      return false;
    }
  };

  

  const { user } = checkIfAuthenticated();

  const postSignInForm = (data) => {
    console.log("submitting signin form");
    console.log(JSON.stringify(data)); 
    //needa return the fetch plsss
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  



  const handleSubmit = (event) => {
    event.preventDefault();   //do not fucking misspell this! 
    setValues({ ...values, error: false, loading: true });
    postSignInForm({ email, password })
    .then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        storeAuthResToLocalStorage(data);
        setValues({ ...values, redirect: true });
        console.log(redirect); 
      }
    });
  };







  const showError = () => { //doesnt show error
    error && (<div>We have an error</div>);
  };

  const redirectUser =() => { //works 
    if (redirect) {
      if (user) {
        console.log('redirecting users');
        return (<Navigate to='/userDashBoard'/>); //make it redirect to home and change the view to show a different navBar.
      }
    }
  };

  return (
    <div>
      <Navbar/>
      {loading && (
        <div>
          <h2>Loading ... </h2>
        </div>
      )}
      {error && (<div>{error}</div>)}
      {redirectUser()}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            className="btn btn-secondary"
            type="email"
            id="email"
            name="email" //req.body.email in backend.
            onChange={handleChange("email")}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            className="btn btn-secondary"
            type="password"
            id="password"
            name="password"
            onChange={handleChange("password")}
          />
        </div>
        <button>Sign In</button>
      </form>
        <div>Do not have an account? 
          <a href="/signUp">
            Sign up
          </a>
        </div>
      </div>
  );
}

export default SignIn;
