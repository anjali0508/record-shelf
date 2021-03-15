import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllSongs.module.css';
import { EmptyComponent } from '../../components/Empty/Empty';
import { SongCard } from '../../components/SongCard/SongCard';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjcwNWIwMi00OWJiLTQ2OTYtOTNmOC1iZjAyM2I5ZGM0OGEiLCJuYW1lIjoiQW5qYWxpIiwicm9sZSI6MCwic3ViamVjdCI6IlRlY2ggVW5pdiAyMDIxIiwiZWFzdGVyX2VnZyI6Ikdvb2QgbHVjayEiLCJhdWQiOiJtdXNpY3JlY29yZHMudGVjaHVuaXYuY29tIiwibmJmIjoxNjE1Nzg0MzkwLCJleHAiOjE2MTgzNzYzOTAsImlhdCI6MTYxNTc4NDM5MCwiaXNzIjoiTXVzaWMgUmVjb3JkcyJ9.uXutfzQHN1Chfx8EbNakHayYDUEhZnpM8-fxBbgG4wg';
export const AllSongs = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [isloaded, setLoaded] = useState(false);
  const syncSongs = async () => {
    const songs = await axios.get('/api/records', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllSongs(songs.data.data);
    setLoaded(true);
  };
  return !isloaded ? (
    <EmptyComponent sync={syncSongs} />
  ) : (
    <>
      <div className={styles.main}>
        <h1>all songs</h1>
        <ul className={styles.cards}>
          {allSongs.map((song) => (
            <SongCard img={song.albumArtUrl} name={song.name} artist={song.artist.name} />
          ))}
        </ul>
      </div>
    </>
  );
};
