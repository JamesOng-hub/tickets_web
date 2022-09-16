import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Search({setTickets, setError}) {

    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const debounceSearch = (event, debounceTimeout) => {
      const value = event.target.value;
  
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
  
      const timeout = setTimeout(() => {
        loadSearch(value);
      }, 500);
  
      setDebounceTimeout(timeout);
    };

    const fetchSearch = (queryName) => {
        return fetch(
            `${process.env.REACT_APP_API_URL}/product/searchName?value=${queryName}`,
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
    }

    const loadSearch = (queryName) => {
        fetchSearch(queryName).then((data) => {
            if (data.error){
                setError(data.error); 
            }else{
                setTickets(data); 
            }
        }); 
    }
  return (

    <div className='search-bar'>
    <input
            type="text"
            className='search-input'
            placeholder="Search with ticket name"
            onChange={(e) => debounceSearch(e, debounceTimeout)}
        />
    <SearchIcon/>
    </div>
  )
}

export default Search