/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SongCard.module.css';
import heartGrey from '../../assets/images/heart-gray.svg';
import heartRed from '../../assets/images/heart-red.svg';

export const SongCard = ({
  img, name, artist, likesCount, like, switchHeart, id,
}) => (
  <li className={styles.cards_item}>
    <div className={styles.card}>
      <div className={styles.card_content}>
        <img className={styles.card_image} src={img} alt="song cover" />
        <div className={styles.row}>
          <div className={styles.column_left}>
            <p className={styles.card_title}>{name}</p>
            <p className={styles.card_text}>{artist}</p>
          </div>
          <div className={styles.column_right}>
            {!like ? <img onClick={() => switchHeart({ id })} className={styles.heart_image} alt="likes" src={heartGrey} />
              : <img className={styles.heart_image} alt="likes" src={heartRed} />}
            <p className={styles.likes_count}>{likesCount}</p>
          </div>
        </div>
      </div>
    </div>
  </li>
);

SongCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  like: PropTypes.bool.isRequired,
  switchHeart: PropTypes.func.isRequired,
};
