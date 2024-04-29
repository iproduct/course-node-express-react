import React from 'react';


export interface ThemeContextInterface {
  name: string;
  foreground: string;
  background: string;
}

export const themes = {
    light: {
      name: 'Light Theme',
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      name: 'Dark Theme',
      foreground: '#ffffff',
      background: '#0000ff',
    },
  };


//1. Create context
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
export const ThemeContext = React.createContext<ThemeContextInterface>(themes.light);
ThemeContext.displayName = 'ThemeContext';