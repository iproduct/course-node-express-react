import React from 'react';
export const withParams = (Component, properties) => {
    return props => (<Component {...props} { ...properties} />);
}
