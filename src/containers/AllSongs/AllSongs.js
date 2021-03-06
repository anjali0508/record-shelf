/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './AllSongs.module.css';
import { EmptyComponent } from '../../components/Empty/Empty';
import { SongCard } from '../../components/SongCard/SongCard';
import icon from '../../assets/images/icon-genre.svg';

export const AllSongs = ({ syncSongs, allSongs, switchHeart }) => {
  const history = useHistory();

  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <h1 className={styles.column_left}>all songs</h1>
          <img className={styles.column_right} onClick={() => history.push('/genres')} src={icon} alt="toggle" />
        </div>
        <ul className={styles.cards}>
          {allSongs.map((song) => (
            <SongCard
              genre={song.genre}
              id={song.id}
              key={song.id}
              img={song.img}
              name={song.name}
              artist={song.artist}
              likesCount={song.likes_count}
              like={song.like}
              switchHeart={() => switchHeart(song.id, song.genre)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const Song = PropTypes.shape({
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  likes_count: PropTypes.number.isRequired,
  like: PropTypes.bool.isRequired,
});
AllSongs.propTypes = {
  syncSongs: PropTypes.func.isRequired,
  switchHeart: PropTypes.func.isRequired,
  allSongs: PropTypes.arrayOf(Song).isRequired,
};
