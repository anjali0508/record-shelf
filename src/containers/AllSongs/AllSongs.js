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
      });
    });
    songs = await Promise.all(songs);
    setAllSongs(songs);
    setLoaded(true);
  };

  const switchHeart = async (id) => {
    const likes = await axios.get(`/api/records/${id}/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { like } = likes.data.data;
    const reponse = await axios.patch(`/api/records/${id}/likes`, { like: !like }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(reponse);
  };

  return !isloaded ? (
    <EmptyComponent sync={syncSongs} />
  ) : (
    <>
      <div className={styles.main}>
        <h1>all songs</h1>
        <ul className={styles.cards}>
          {allSongs.map((song) => (
            <SongCard
              id={song.id}
              key={song.id}
              img={song.img}
              name={song.name}
              artist={song.artist}
              likesCount={song.likes_count}
              like={song.like}
              switchHeart={() => switchHeart(song.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
