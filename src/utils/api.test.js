import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { getSongs } from './api';

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

describe('Api test', () => {
  test('should get data from backend', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockApiData).mockResolvedValueOnce(mockDataLikes);
    const response = await getSongs();
    console.log(response);
    expect(response).toEqual(mockManipulatedData);
  });
});
