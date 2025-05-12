import React from 'react';


export interface LoggedUser {
  name: string;
}


// Signed-in user context
export const UserContext = React.createContext<LoggedUser>({
  name: 'Guest',
});
UserContext.displayName = 'UserContext';
