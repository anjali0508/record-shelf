import {
  render, screen, fireEvent,
} from '@testing-library/react';
import React from 'react';
import { AllSongs } from './AllSongs';

describe(AllSongs.name, () => {
  test('should match snapshot', () => {
    const container = render(<AllSongs
      syncSongs={() => {}}
      switchHeart={() => {}}
      allSongs={[]}
    />);
    expect(container).toMatchSnapshot();
  });
});
