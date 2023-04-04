import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './AppClass';

test('renders learn react link', () => {
  render(<App name="React"/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
