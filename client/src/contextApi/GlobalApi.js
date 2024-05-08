import React, { createContext, useState } from 'react';

export const loginStatus = createContext({});

export const GlobalContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logUser, setLogUser] = useState({
        image: '',
        firstName: 'ABC',
        lastName: 'TEST'
    });

    return (
        <loginStatus.Provider value={{ isLoggedIn, setIsLoggedIn, logUser, setLogUser }}>
            {children}
        </loginStatus.Provider>
    );
};
