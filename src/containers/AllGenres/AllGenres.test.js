import {
  render, screen, fireEvent,
} from '@testing-library/react';
import React from 'react';
import { AllGenres } from './AllGenres';

describe(AllGenres.name, () => {
  test('should match snapshot', () => {
    const container = render(<AllGenres />);
    expect(container).toMatchSnapshot();
  });
});
