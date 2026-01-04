import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders app header', () => {
    render(<App />);
    expect(screen.getByText('Estate Agent Property Search')).toBeInTheDocument();
  });

  test('renders search page on initial load', () => {
    render(<App />);
    expect(screen.getByText('Search Properties')).toBeInTheDocument();
  });

  test('renders favourites sidebar', () => {
    render(<App />);
    expect(screen.getByText(/My Favourites/i)).toBeInTheDocument();
  });

  test('renders property results', () => {
    render(<App />);
    // Should show search results heading
    expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
  });
});