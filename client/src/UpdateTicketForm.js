import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { checkIfAuthenticated } from "./auth/helperFunctions";

function UpdateTicketForm() {
  let { ticketId } = useParams();
  const { token, user } = checkIfAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    ticketFile: "",
    quantity: "",
    loading: false,
    error: "",
    redirect: false,
    updatedTicketName: "",
    formData: "", //new form to submit to backend.
  });

  const {
    name,
    description,
    price,
    // category,
    ticketFile,
    quantity,
    loading,
    error,
    redirect,
    updatedTicketName,
    formData,
  } = values;

  const fetchTicket = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/listOne/${ticketId}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTicket = () => {
    fetchTicket().then((data) => {
      // console.log('data', data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          // category,
          quantity: data.quantity,
          formData: new FormData(),
        });
      }
    });
  };
  const handleChange = (fieldName) => (event) => {
    //calling a function inside of another function. double arrow functions.
    const value =
      fieldName === "ticketFile" ? event.target.files[0] : event.target.value;
    formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: value }); //
  };

  // /product/update/:userId/:ticketId
  const updateProduct = (product) => {
    console.log(user._id, ticketId);
    return fetch(
      `${process.env.REACT_APP_API_URL}/product/updateTicket/${user._id}/${ticketId}`,
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
    updateProduct(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          name: "",
          description: "",
          price: 0,
          ticketFile: "",
          quantity: "",
          loading: false,
          error: "",
          redirect: false,
          formData: "",
          updatedTicketName: data.name,
        });
      }
    });
  };

  const alertSuccess = () => {
    updatedTicketName && (
      <div>
        <h5>You have succesfully updated your ticket '{updatedTicketName}'</h5>
        <a href="/userDashboard">Return to user dashboard</a>
      </div>
    );
  };

  // const init = () => {
  //   setValues({
  //     ...values,
  //     formData: new FormData()
  //   });
  //   loadTicket();
  // }

  useEffect(() => {
    loadTicket();
    // init();
  }, []);

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     formData: new FormData(), //formData() constructor.
  //   });
  // }, []);

  return (
    <div>
      <Navbar />
      {/* {alertError()} */}
      {updatedTicketName && (
        <div>
          <h5>
            You have succesfully updated your ticket '{updatedTicketName}'
          </h5>
          <a href="/userDashboard">Return to user dashboard</a>
        </div>
      )}
      {/* {alertLoading()} */}
      {/* {redirectUser()} */}
      {! updatedTicketName && (
              <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="ticketFile">Submit your ticket in PDF format</label>
                <input
                  class="btn btn-secondary"
                  type="file"
                  id="ticketFile"
                  name="ticketFile" //files.<name> is for the files object in the backend. formidible.
                  onChange={handleChange("ticketFile")}
                  accept=".pdf"
                />
              </div>
              <div class="form-group">
                <label for="Name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleChange("name")}
                />
              </div>
              <div class="form-group">
                <label for="Description">Description: </label>
                <textarea
                  class="form-control"
                  id="Description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={handleChange("description")}
                />
              </div>
              <div class="form-group">
                <label for="Price">Price: </label>
                <input
                  type="number"
                  class="form-control"
                  id="Price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={handleChange("price")}
                />
              </div>
              <div class="form-group">
                {/* <label for="Category">Category: </label>
                <input
                  type="text"
                  class="form-control"
                  id="Category"
                  placeholder="Enter Category"
                  value = {category}
                  onChange = {handleChange('category')}
                /> */}
                {/* change to dropdown options */}
              </div>
              <div class="form-group">
                <label for="Quantity">Quantity: </label>
                <input
                  type="number"
                  class="form-control"
                  id="Quantity"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={handleChange("quantity")}
                />
              </div>
              <div>
                <input type="submit" class="btn btn-secondary" />
              </div>
            </form>
      )}

    </div>
  );
}

export default UpdateTicketForm;
