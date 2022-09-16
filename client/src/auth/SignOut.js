import React, { useState } from "react";
import Navbar from "../Navbar";
import { Navigate } from "react-router-dom";
import Footer from "../Footer";

function SignOut() {
  const [values, setValues] = useState({
    redirect: false,
  });
  const { redirect } = values;

  const redirectUser = () => {
    //works
    if (redirect) {
      console.log("redirecting users");
      return <Navigate to="/" />;
    }
  };

  const removeTokenAndCookie = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt-token");
      setValues({ ...values, redirect: true });
      return fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          console.log("signout", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="signout__background-image">
      <div id="page-container">
        <div id="content-wrap">
          <Navbar />
          {redirectUser()}
          <div className="signout__card-container">
            <div className="signout__card">
              <div>Confirm Sign Out? </div>
              <button
                className="btn btn-outline-danger mx-1 my-2"
                onClick={() => removeTokenAndCookie()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default SignOut;
