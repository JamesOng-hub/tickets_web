import React, { useState } from 'react'

function SignUp() {

    const [values, setValues] = useState({
        name: '', 
        email: '', 
        password: '', //virtual field
        error: '', 
        success: false, 
    });
    const {name, email, password, error, success} = values; 


    const postSignUpForm = (user) => {
        // console.log(name, email, password);
        return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            console.log(err);
          });
      };


    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value});
    }; //we set the error to false, because the validator in the backend will bounce back w invalid inputs. 
    //at that point we have to reset the error to false while the user inputs sth new. 

    const handleSubmit = (event) =>{
        event.preventDefault(); //browser not to reload
        setValues({...values, error: false}); 
        postSignUpForm({name, email, password}).then((data)=>{
            if (data.error) {
                setValues({...values, error: data.error, success: false});
            }else {
                setValues({
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '', 
                    success: true, //which we use this to display some message. 
                })
            }
        })

    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            className='btn btn-secondary'
            type="text"
            id="name"
            name='name' //req.body.<name> in the backend. 
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            className='btn btn-secondary'
            type="email"
            id="email"
            name='email' //req.body.email in backend.
            onChange={handleChange("email")}
            autoComplete = 'off' 
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            className='btn btn-secondary'
            type="password"
            id="password"
            name='password'  
            onChange={handleChange("password")}
          />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
