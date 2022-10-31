import React, {useState, useContext, createContext} from 'react'
import MainPage from '@pages/MainPage'
import BlogPage from '@pages/BlogPage'
import Login from '@pages/Login'
import { useAuthenticated, AuthenticationContext } from '@context/state'

const Home = ( props:any ) => {

  const [authenticated, setAuthenticated] = useState<any>();

  return (
    <AuthenticationContext.Provider value={{authenticated, setAuthenticated}}>
      {(authenticated === 'main' &&
    <MainPage isConnected={props.isConnected} setIsConnected={props.setIsConnected}/>)
|| (authenticated === 'blog' &&
    <BlogPage />)
||
    <Login authenticated={authenticated} setAuthenticated={setAuthenticated}/>
}
     
    </AuthenticationContext.Provider>
  )
}

export default Home