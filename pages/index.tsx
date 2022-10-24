import React, {useState, useContext, createContext} from 'react'
import MainPage from '@pages/MainPage'
import Login from '@pages/Login'
import { useAuthenticated, AuthenticationContext } from '@context/state'

const Home = ( props:any ) => {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider value={{authenticated, setAuthenticated}}>
      {(authenticated === true ? <MainPage isConnected={props.isConnected} setIsConnected={props.setIsConnected}/> : <Login />)}
    </AuthenticationContext.Provider>
  )
}

export default Home