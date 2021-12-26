import React from 'react';
import Header from '../components/header/Header';
import MusicCard from '../components/musicCard/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: [],
    };
  }

  componentDidMount() {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    getFavoriteSongs().then((favorite) => this.setState({ favorite }));
  }

  render() {
    const { favorite } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1 style={ { textAlign: 'center' } }>Musicas Favoritas</h1>
        <ul style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
          {favorite.map((song) => (
            <li key={ song.trackId }>
              <MusicCard
                music={ song }
                onchange={ this.getFavoriteList }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Favorites;
