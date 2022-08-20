export const removeTokenFromLocalStorage = () =>{
    if (typeof window !== 'undefined'){
        localStorage.removeItem('jwt-token');
        return fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
            method: 'GET'
        }).then((res) =>{
            console.log('signout', res); 
        }).catch((err) => {
            console.log(err); 
        })
    }
};