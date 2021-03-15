import {
  render, screen, fireEvent,
} from '@testing-library/react';
import React from 'react';
import { AllGenres } from './AllGenres';

const mockData = {
  Bollywood: [
    {
      artist: 'Neha Kakkar',
      genre: 'Bollywood',
      id: '07075cdb-9e5c-41ec-8c09-9a1322dd92d8',
      img: 'https://i.scdn.co/image/ab67616d0000b273dc1f496d2a8d75f7fda092b6',
      like: true,
      likes_count: 7,
      name: 'Aankh Marey',
    },
  ],
};
describe(AllGenres.name, () => {
  test('should match snapshot', () => {
    const container = render(<AllGenres switchHeart={() => {}} genreFilteredSongs={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
