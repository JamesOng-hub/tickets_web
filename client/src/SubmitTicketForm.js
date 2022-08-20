import React, { useEffect, useState } from "react";


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
    loading: false,
    error: "",
    //    createdProduct: '',
    //    redirectToProfile: false,
    formData: "", //this is the formData to submit to the backend.
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
    //    createdProduct,
    //    redirectToProfile,
    formData,
  } = values;

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(), //formData() constructor.
    });
  }, []);

  const handleChange = (fieldName) => (event) => { //calling a function inside of another function. double arrow functions. 
    const value =
      fieldName === "ticketFile" ? event.target.files[0] : event.target.value;
    formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: value }); //
  };

  //positng formData() to the backend.
  const createProduct = (product) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: product,
    })
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
      // if (data.error) {
      //   setValues({ ...values, error: data.error });
      // } else {
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
          //    redirectToProfile: false,
        });
      // }
    });
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

  //formdata() in js
  return (
    <div>
      {/* {alertError()} */}
      {/* {alertSuccess()}
      {alertLoading()} */}
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="ticketFile">Submit your ticket in PDF format</label>
          <input
            class='btn btn-secondary'
            type="file"
            id="ticketFile"
            name='ticketFile' //files.<name> is for the files object in the backend. formidible. 
            onChange={handleChange("ticketFile")}
            accept='.pdf'
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
          <input
            type='submit'
            class='btn btn-secondary' 
          />
        </div>
      </form>
    </div>
  );
}

export default SubmitTicketForm;
