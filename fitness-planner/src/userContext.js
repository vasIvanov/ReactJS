import React from 'react';

const userContext = React.createContext({ user: {} });

const colorContext = React.createContext({ mode: 'white' });

export { userContext, colorContext };
