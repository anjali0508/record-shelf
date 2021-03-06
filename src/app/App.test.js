import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';
import { getSongs } from '../utils/api';

jest.mock('../utils/api');

const mockApiData = {
  data: {
    data: [
      {
        artist: { name: 'Neha Kakkar' },
        genre: { name: 'Bollywood' },
        id: '07075cdb-9e5c-41ec-8c09-9a1322dd92d8',
        albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b273dc1f496d2a8d75f7fda092b6',
        like: true,
        likes_count: 7,
        name: 'Aankh Marey',
      },
    ],
  },
};
const mockManipulatedData = [
  {
    artist: 'Neha Kakkar',
    genre: 'Bollywood',
    id: '07075cdb-9e5c-41ec-8c09-9a1322dd92d8',
    img: 'https://i.scdn.co/image/ab67616d0000b273dc1f496d2a8d75f7fda092b6',
    name: 'Aankh Marey',
  },
];

const mockDataLikes = {
  data: {
    data: [
      {
        count: 1,
        like: true,
      },
    ],
  },
};
describe(App.name, () => {
  beforeEach(() => {
    getSongs.mockResolvedValue(mockManipulatedData);
  });
  afterEach(() => {
    getSongs.mockClear();
  });

  test('should match snapshot', () => {
    const container = render(<App />);
    expect(container).toMatchSnapshot();
  });
  test('should get data from backend', async () => {
    await waitFor(() => render(<App />));
    // screen.logTestingPlaygroundURL();
    screen.getByText(':((');
  });
  test('should render data', async () => {
    await waitFor(() => render(<App />));
    screen.getByText('Seems a bit empty in heree');
  });
});
