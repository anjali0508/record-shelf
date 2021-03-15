import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { EmptyComponent } from '../../components/Empty/Empty';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjcwNWIwMi00OWJiLTQ2OTYtOTNmOC1iZjAyM2I5ZGM0OGEiLCJuYW1lIjoiQW5qYWxpIiwicm9sZSI6MCwic3ViamVjdCI6IlRlY2ggVW5pdiAyMDIxIiwiZWFzdGVyX2VnZyI6Ikdvb2QgbHVjayEiLCJhdWQiOiJtdXNpY3JlY29yZHMudGVjaHVuaXYuY29tIiwibmJmIjoxNjE1Nzg0MzkwLCJleHAiOjE2MTgzNzYzOTAsImlhdCI6MTYxNTc4NDM5MCwiaXNzIjoiTXVzaWMgUmVjb3JkcyJ9.uXutfzQHN1Chfx8EbNakHayYDUEhZnpM8-fxBbgG4wg';
export const AllSongs = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [isloaded, setLoaded] = useState(false);
  const syncSongs = async () => {
    const songs = await axios.get('/api/records', { headers: { Authorization: `Bearer ${token}` } });
    console.log(songs);
    setAllSongs(songs);
    setLoaded(true);
  };
  return (!isloaded ? <EmptyComponent sync={syncSongs} />
    : (
      <>
        <h1>all songs</h1>
      </>
    ));
};
