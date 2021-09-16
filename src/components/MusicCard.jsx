import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music:
      { trackName, previewUrl } } = this.props;
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
  }).isRequired,
};

export default MusicCard;
