import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class MusicCard extends React.Component {
  render() {
    const { music, music:
      { trackName, previewUrl, trackId }, handleFavorite, checked } = this.props;
    return (
      <section>
        <section>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            className="tw-heart-box"
            data-testid={ `checkbox-music-${trackId}` }
            htmlFor={ trackId }
          >
            <input
              onChange={ (event) => handleFavorite(event, music) }
              type="checkbox"
              id={ trackId }
              checked={ checked }
            />
            <span className="tw-heart" />
          </label>
        </section>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
};

export default MusicCard;
