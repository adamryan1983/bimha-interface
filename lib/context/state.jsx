import { createContext, useContext } from 'react';

export const AuthenticationContext = createContext({authenticated: '', setAuthenticated: authenticated => console.warn('no context')})

export const useAuthenticated = () => useContext(AuthenticationContext)