import React, { createContext, useState } from 'react';
import image from '../scenes/layout/images/icon.png'

export const loginStatus = createContext();

export const GlobalContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [logUser, setLogUser] = useState({
        image: image,
        firstName: 'HASITHA',
        lastName: 'ADMIN'
    });

    return (
        <loginStatus.Provider value={{ isLoggedIn, setIsLoggedIn, logUser, setLogUser }}>
            {children}
        </loginStatus.Provider>
    );
};
