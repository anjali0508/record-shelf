import './App.css';
import React, { useState, usEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { AllSongs } from '../containers/AllSongs/AllSongs';
import { EmptyComponent } from '../components/Empty/Empty';
import { AllGenres } from '../containers/AllGenres/AllGenres';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYjcwNWIwMi00OWJiLTQ2OTYtOTNmOC1iZjAyM2I5ZGM0OGEiLCJuYW1lIjoiQW5qYWxpIiwicm9sZSI6MCwic3ViamVjdCI6IlRlY2ggVW5pdiAyMDIxIiwiZWFzdGVyX2VnZyI6Ikdvb2QgbHVjayEiLCJhdWQiOiJtdXNpY3JlY29yZHMudGVjaHVuaXYuY29tIiwibmJmIjoxNjE1Nzg0MzkwLCJleHAiOjE2MTgzNzYzOTAsImlhdCI6MTYxNTc4NDM5MCwiaXNzIjoiTXVzaWMgUmVjb3JkcyJ9.uXutfzQHN1Chfx8EbNakHayYDUEhZnpM8-fxBbgG4wg';

const App = () => {
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
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/genres" exact>
            <AllGenres />
          </Route>
          <Route path="/" exact>
            {isloaded ? (
              <AllSongs
                allSongs={allSongs}
                syncSongs={syncSongs}
                switchHeart={switchHeart}
              />
            )
              : <EmptyComponent sync={syncSongs} />}

          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
