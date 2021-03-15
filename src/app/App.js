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
  const [likesState, setLikesState] = useState(false);
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
    const [myLikes, songs] = await getSongs();
    console.log(myLikes);
    setAllSongs(songs);
    setLikesState(myLikes);
    setLoading(false);
    const genreFilteredSongs = groupByCategory(songs);
    setGenreFiltered(genreFilteredSongs);
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
  if (!isloaded) {
    return <EmptyComponent sync={syncSongs} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/genres" exact>
            <AllGenres
              genreFilteredSongs={genreFiltered}
              switchHeart={switchHeart}
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
