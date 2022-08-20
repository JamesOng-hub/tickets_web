import React from 'react'

function SignOut() {

    const removeTokenAndCookie = () =>{
        if (typeof window !== 'undefined'){
            localStorage.removeItem('jwt-token');
            return fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
                method: 'GET',
                credentials: 'include',
            }).then((res) =>{
                console.log('signout', res); 
            }).catch((err) => {
                console.log(err); 
            })
        }
    }
  return (
    <div>
        <button onClick={() => removeTokenAndCookie()}>Sign Out</button>
    </div>
  )
}

export default SignOut