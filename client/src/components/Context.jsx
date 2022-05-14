import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios'


export const AuthContext = createContext()

export default ({children}) => {
  const [user,setUser] = useState()
  const [ısAuthenticated,setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    Axios.get("http://localhost:5000/auth/user", { withCredentials: true }).then(res => {
      console.log(res)
    if(res.data.isAuthInfo){
      setUser(res.data.data);
      setIsAuthenticated(res.data.isAuthInfo)
    }else{
      setUser("");
      setIsAuthenticated(res.data.isAuthInfo)
    }
     
     
    })
  }, []);


  return (
    <AuthContext.Provider  value={{user,ısAuthenticated,setUser,setIsAuthenticated}}>{children}</AuthContext.Provider>
    )
}