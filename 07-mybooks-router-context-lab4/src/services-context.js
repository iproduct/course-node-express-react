import GoogleBooks from "./google-books-service";
import React from 'react';

export const services = {
  googleBooksService: new GoogleBooks(),
}

// Global services context
export const ServicesContext = React.createContext(services);
