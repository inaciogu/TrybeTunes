import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, music:
      { trackName, previewUrl, trackId }, handleFavorite } = this.props;
    return (
      <section>
        <section>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
            Favorita
            <input
              onChange={ (event) => handleFavorite(event, music) }
              type="checkbox"
              id={ trackId }
            />
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
};

export default MusicCard;
