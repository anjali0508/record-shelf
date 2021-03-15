import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe(App.name, () => {
  test('should match snapshot', () => {
    const container = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
