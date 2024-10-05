import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [data, setData] = useState([]);   
    const fetchData = async () => {  
      try {
      await fetch('https://socialmedia-backend-wlia.onrender.com/api/auth/me', {  
          method: 'GET',  
          headers: { 
            'Content-Type': 'application/json',
          },
          credentials: 'include' 
        })
        .then(res=>res.json())
        .then(result=>{
          setData(result);
          console.log(result)
        })
      } catch (err) {  
        console.error('Fetch error: ', err);  
      }  
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    

  return (
    <div>
    <UserContext.Provider value={{data}}> 
    {children}
    </UserContext.Provider>
      
    </div>
  );
}
export{ UserContext , UserContextProvider};
