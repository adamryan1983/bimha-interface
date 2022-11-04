import { createContext, useContext } from 'react';

export const AuthenticationContext = createContext({authenticated: false, setAuthenticated: authenticated => console.warn('no context')})

export const useAuthenticated = () => useContext(AuthenticationContext)