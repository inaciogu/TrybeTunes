import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { album:
      { artistName, collectionName, artworkUrl100, collectionId } } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ `${collectionName} Album` } />
        <div>
          <h3>{collectionName}</h3>
          <h4>{artistName}</h4>
        </div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          About
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
