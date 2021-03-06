/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './AllGenres.module.css';
import icon from '../../assets/images/icon-grid.svg';
import { SongCard } from '../../components/SongCard/SongCard';
import { Button } from '../../components/Button/Button';

export const AllGenres = ({ genreFilteredSongs, switchHeart }) => {
  const history = useHistory();
  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <h1 className={styles.column_left}>genres</h1>
          <img className={styles.column_right} onClick={() => history.push('/')} src={icon} alt="toggle" />
        </div>
        <br />
        { Object.keys(genreFilteredSongs).map((category) => (
          <React.Fragment key={category}>
            <div className={styles.genre_type}>
              <img className={styles.genre_type_img} src={`../../../images/genre-${category}.png`} alt="genre" />
              <button type="button" className={styles.blue_button}>{category}</button>
            </div>
            <ul className={styles.cards}>
              {genreFilteredSongs[category].map((song) => (
                <SongCard
                  id={song.id}
                  key={song.id}
                  img={song.img}
                  name={song.name}
                  artist={song.artist}
                  likesCount={song.likes_count}
                  like={song.like}
                  switchHeart={() => switchHeart(song.id, category)}
                />
              ))}
            </ul>

          </React.Fragment>
        ))}
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
AllGenres.propTypes = {
  switchHeart: PropTypes.func.isRequired,
  genreFilteredSongs: PropTypes.objectOf(PropTypes.arrayOf(Song)).isRequired,
};
