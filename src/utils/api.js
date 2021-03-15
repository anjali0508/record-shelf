import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjcwNWIwMi00OWJiLTQ2OTYtOTNmOC1iZjAyM2I5ZGM0OGEiLCJuYW1lIjoiQW5qYWxpIiwicm9sZSI6MCwic3ViamVjdCI6IlRlY2ggVW5pdiAyMDIxIiwiZWFzdGVyX2VnZyI6Ikdvb2QgbHVjayEiLCJhdWQiOiJtdXNpY3JlY29yZHMudGVjaHVuaXYuY29tIiwibmJmIjoxNjE1Nzg0MzkwLCJleHAiOjE2MTgzNzYzOTAsImlhdCI6MTYxNTc4NDM5MCwiaXNzIjoiTXVzaWMgUmVjb3JkcyJ9.uXutfzQHN1Chfx8EbNakHayYDUEhZnpM8-fxBbgG4wg';

export const getSongs = async () => {
  const songsResponse = await axios.get('/api/records', {
    headers: { Authorization: `Bearer ${token}` },
  });
  let songs = songsResponse.data.data.map(async (song) => {
    const likes = await axios.get(`/api/records/${song.id}/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return ({
      id: song.id,
      name: song.name,
      img: song.albumArtUrl,
      artist: song.artist.name,
      likes_count: likes.data.data.count,
      like: likes.data.data.like,
      genre: song.genre.name,
    });
  });
  songs = await Promise.all(songs);
  return songs;
};
