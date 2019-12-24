import React, {createContext} from 'react';

export const AuthContext = createContext({auth: false, private: true})
export const ThemeContext = createContext({theme: 'dark'})

const ContextWrapper = props => {
  return  (
    <AuthContext.Provider value={{auth: true, private: false}}>
      <ThemeContext.Provider value={{theme: 'light'}}>
        {props.children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default ContextWrapper;