import React, { useState } from 'react'

function TestComponent() {
    const [values , setValues] = useState({
        success: false, 
        message: '', 
    }); 
    const {success, message} = values; 

    const testFunc = () => {
        setValues({...values, message: 'hello'}); 
        console.log(message); 
    }; 

  return (
    <div>
      <button onClick={()=> testFunc()}>{message}</button>
      <button onClick={()=> console.log(message)}>show message</button>
    </div>
  )
}

export default TestComponent
