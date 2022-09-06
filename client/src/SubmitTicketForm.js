import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { checkIfAuthenticated } from "./auth/helperFunctions";
import { Navigate } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";

//create a state to update the form fields in real time
//we are also creating a formData as part of the state
//this formdata is going to be submitted
//and handling with the formidible module (that handles file uploads specifically. )
function SubmitTicketForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    // category: "", //category is an objectId. (or maybe this just to display on form.)
    ticketFile: "", //is a buffer. why string here.
    quantity: "",
    location: "",
    loading: false,
    error: "",
    //    createdProduct: '',
    redirect: false,
    formData: "", //this is the formData to submit to the backend.
  });

  const {
    name,
    description,
    price,
    // category,
    ticketFile,
    quantity,
    location,
    loading,
    error,
    redirect,
    formData,
  } = values;

  // const [locationObject, setLocationObject] = useState({
  //   lat: '',
  //   lng: '',
  // });

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(), //formData() constructor.
    });
  }, []);

  const { token, user } = checkIfAuthenticated();

  const setLocation = (val) => {
    setValues({ ...values, location: val });
    formData.set('location', val);
  };

  const handleChange = (fieldName) => (event) => {
    // calling a function inside of another function. double arrow functions.
    const value =
      fieldName === "ticketFile" ? event.target.files[0] : event.target.value;
    formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: value }); //
  };

  //positng formData() to the backend.
  const createProduct = (product) => {
    console.log("product", product);
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/create/${user._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
        setValues({
          name: "",
          description: "",
          price: 0,
          // category: "", //why dont need to reset category.
          ticketFile: "", //
          quantity: "",
          loading: false,
          //    error: '',
          //    createdProduct: '',
          redirect: false,
        });
      }
    });
  };
  const redirectUser = () => {
    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  // const alertError = () => {
  //   <div className="alert" style={{ display: error ? "" : "none" }}>
  //     {error}
  //   </div>;
  // };

  // const alertSuccess = () => {
  //   <div className="alert" style={{ display: createdProduct ? "" : "none" }}>
  //     `${createdProduct} is created!`
  //   </div>;
  // };

  const alertLoading = () => {
    <div className="alert" style={{ display: loading ? "" : "none" }}>
      Loading...
    </div>;
    //other syntax.
  };

  const getCurrentdate = () => {
    return new Date().toJSON().split("T")[0];
  };

  //formdata() in js
  return (
    <div className=".pageBackground--bright">
      {error && <div>{error}</div>}
      {/* {alertSuccess()}
      {alertLoading()} */}
      {redirectUser()}
      <div className="submitTicketForm__title">Submission Form</div>
      <form
        onSubmit={handleSubmit}
        className="submitTicketForm__form gradient-border "
      >
        <div className="form-group d-flex flex-column">
          <label for="ticketFile">Submit your ticket in PDF format: </label>
          <input
            className="btn btn-outline-dark"
            type="file"
            id="ticketFile"
            name="ticketFile" //files.<name> is for the files object in the backend. formidible.
            onChange={handleChange("ticketFile")}
            accept=".pdf"
          />
        </div>
        <div className="form-group">
          <label for="Name">Ticket Title: </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            placeholder="Enter Name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label for="Description">Description: </label>
          <textarea
            className="form-control"
            id="Description"
            placeholder="Enter Description"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label for="Date">Date: </label>
          <input
            type="date"
            id="Date"
            name="date"
            min={getCurrentdate()}
            onChange={handleChange("date")}
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label for="Time">Time: </label>
          <input
            type="time"
            id="Time"
            name="time"
            onChange={handleChange("time")}
          />
        </div>
        <div className="form-group d-flex flex-column">
          <label for="Location">Location: </label>
          {/* <input 
            type="location" 
            id="Location" 
            name="location"
            onChange = {handleChange("location")}
          /> */}
          <LocationSearchInput
            setLocation={setLocation}
          />
        </div>
        <div className="form-group">
          <label for="Price">Price: </label>
          <input
            type="number"
            className="form-control"
            id="Price"
            placeholder="Enter Price"
            min="0"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div className="form-group">
          {/* <label for="Category">Category: </label>
          <input
            type="text"
            className="form-control"
            id="Category"
            placeholder="Enter Category"
            value = {category}
            onChange = {handleChange('category')}
          /> */}
          {/* change to dropdown options */}
        </div>
        <div className="form-group">
          <label for="Quantity">Quantity: </label>
          <input
            type="number"
            className="form-control"
            id="Quantity"
            placeholder="Enter Quantity"
            value={quantity}
            min="0"
            onChange={handleChange("quantity")}
          />
        </div>
        <div>
          <input type="submit" className="btn btn-outline-dark" />
        </div>
      </form>
    </div>
  );
}

export default SubmitTicketForm;
