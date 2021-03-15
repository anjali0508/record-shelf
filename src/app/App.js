import React, { useState, usEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { AllSongs } from '../containers/AllSongs/AllSongs';
import { EmptyComponent } from '../components/Empty/Empty';
import { AllGenres } from '../containers/AllGenres/AllGenres';
import { getSongs } from '../utils/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjcwNWIwMi00OWJiLTQ2OTYtOTNmOC1iZjAyM2I5ZGM0OGEiLCJuYW1lIjoiQW5qYWxpIiwicm9sZSI6MCwic3ViamVjdCI6IlRlY2ggVW5pdiAyMDIxIiwiZWFzdGVyX2VnZyI6Ikdvb2QgbHVjayEiLCJhdWQiOiJtdXNpY3JlY29yZHMudGVjaHVuaXYuY29tIiwibmJmIjoxNjE1Nzg0MzkwLCJleHAiOjE2MTgzNzYzOTAsImlhdCI6MTYxNTc4NDM5MCwiaXNzIjoiTXVzaWMgUmVjb3JkcyJ9.uXutfzQHN1Chfx8EbNakHayYDUEhZnpM8-fxBbgG4wg';

const App = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [genreFiltered, setGenreFiltered] = useState({});
  const [isloaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const groupByCategory = (items) => items.reduce((acc, song) => {
    const { genre } = song;
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(song);
    return acc;
  }, {});

  const syncSongs = async () => {
    setLoaded(true);
    setLoading(true);
    const songs = await getSongs();
    setAllSongs(songs);
    setLoading(false);
    const genreFilteredSongs = groupByCategory(songs);
    setGenreFiltered(genreFilteredSongs);
  };
  const switchCategoryHeart = async (id, category) => {
    let songLike;
    const newState = genreFiltered[category].map((song) => {
      songLike = song.like;
      let count;
      if (songLike) {
        count = song.likes_count - 1;
      } else {
        count = song.likes_count + 1;
      }
      return (song.id === id ? {
        ...song,
        likes_count: count,
        like: !song.like,
      } : song);
    });
    const newGenreFiltered = { ...genreFiltered };
    newGenreFiltered[category] = newState;
    setGenreFiltered(newGenreFiltered);
    const reponse = await axios.patch(`/api/records/${id}/likes`, { like: !songLike }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const switchHeart = async (id) => {
    let songLike;
    const newState = allSongs.map((song) => {
      songLike = song.like;
      let count;
      if (songLike) {
        count = song.likes_count - 1;
      } else {
        count = song.likes_count + 1;
      }
      return (song.id === id ? {
        ...song,
        likes_count: count,
        like: !song.like,
      } : song);
    });
    setAllSongs(newState);
    const reponse = await axios.patch(`/api/records/${id}/likes`, { like: !songLike }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  if (!isloaded) {
    return (
      <>
        <Navbar />
        <EmptyComponent sync={syncSongs} />
      </>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/genres" exact>
            <AllGenres
              genreFilteredSongs={genreFiltered}
              switchHeart={switchCategoryHeart}
            />
          </Route>
          <Route path="/" exact>
            {!isLoading ? (
              <AllSongs
                allSongs={allSongs}
                syncSongs={syncSongs}
                switchHeart={switchHeart}
              />
            )
              : <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>}
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
