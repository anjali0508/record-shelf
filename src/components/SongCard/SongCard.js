import React from 'react';
import PropTypes from 'prop-types';
import styles from './SongCard.module.css';

export const SongCard = ({ img, name, artist }) => (
  <li className={styles.cards_item}>
    <div className={styles.card}>
      <div className={styles.card_content}>
        <img className={styles.card_image} src={img} alt="song cover" />
        <p className={styles.card_title}>{name}</p>
        <p className={styles.card_text}>{artist}</p>
      </div>
    </div>
  </li>
);

SongCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};
