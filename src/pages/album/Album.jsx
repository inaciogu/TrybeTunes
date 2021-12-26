import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/musicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      musicsAPI: [],
      requested: false,
      loadingFavorite: false,
      favSongList: [],
    };
  }

  componentDidMount() {
    this.requestMusicsAPI();
    this.fetchFavoriteMusics();
  }

  handleFavorite = async ({ target: { checked } }, music) => {
    this.setState({
      loadingFavorite: true,
    });
    if (checked) {
      await addSong(music);
      this.setState({
        loadingFavorite: false,
      });
    }
    if (!checked) {
      await removeSong(music);
      this.setState({
        loadingFavorite: false,
      });
    }
    this.fetchFavoriteMusics();
  }

  fetchFavoriteMusics = () => {
    this.setState({
      loadingFavorite: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favSongList: favorites,
        loadingFavorite: false,
      });
    });
  }

  requestMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicsAPI: musics,
      requested: true,
      loading: false,
    });
  }

  renderMusicsAPI = () => {
    const { musicsAPI, loadingFavorite, favSongList } = this.state;
    console.log(favSongList);
    return (
      <section className="music-card">
        <section>
          <img width="250px" src={ musicsAPI[0].artworkUrl100 } alt="" />
          <section>
            <h2 data-testid="album-name">{ musicsAPI[0].collectionName }</h2>
            <h3 data-testid="artist-name">{ musicsAPI[0].artistName }</h3>
          </section>
        </section>
        <section>
          {loadingFavorite && <Loading />}
          <ul>
            { musicsAPI.slice(1).map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  music={ music }
                  handleFavorite={ this.handleFavorite }
                  checked={ favSongList.some((song) => song.trackId === music.trackId) }
                />
              </li>)) }
          </ul>
        </section>
      </section>
    );
  }

  render() {
    const { requested, loading } = this.state;
    return (
      <div data-testid="page-album">
        <header>
          <Header />
        </header>
        <section>
          { requested && !loading ? this.renderMusicsAPI() : <Loading /> }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
