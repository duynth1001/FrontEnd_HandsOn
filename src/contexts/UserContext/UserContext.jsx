import { createContext, useContext, useState } from "react";
import { CURRENT_USER } from "../../constant";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    //initiate local storage to establish session 
    const [currentUser, setCurrentUser] = useState(() => {
      if (localStorage.CURRENT_USER=='undefined') {
          return
      }
        const user = JSON.parse(localStorage.getItem(CURRENT_USER));
        return user 
    });
  
    //save to local storage
    const handleSignin = (user) => {
      setCurrentUser(user);
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    };
  
    //clear local storage
    const handleLogout = () => {
      setCurrentUser(null);
      localStorage.clear(CURRENT_USER);
    };
  
    return (
      <UserContext.Provider value={{ currentUser, handleSignin, handleLogout }}>
        {children}
      </UserContext.Provider>
    );
  };

export const useAuth = () => {
  const value = useContext(UserContext);
  return value;
};

