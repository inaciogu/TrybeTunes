import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      musicsAPI: [],
      requested: false,
      loadingFavorite: false,
    };
  }

  componentDidMount() {
    this.requestMusicsAPI();
  }

  handleFavorite = async ({ target: { checked } }, music) => {
    console.log(checked);
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
  }

  /* fetchFavoriteMusics = async () => {
    this.setState({
      loading: true,
    });
    const favorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      favMusicList: favorite,
    });
  }
 */
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
    const { musicsAPI, loadingFavorite } = this.state;
    return (
      <section>
        <section>
          <img width="200px" src={ musicsAPI[0].artworkUrl100 } alt="" />
        </section>
        <h2 data-testid="album-name">{ musicsAPI[0].collectionName }</h2>
        <h3 data-testid="artist-name">{ musicsAPI[0].artistName }</h3>
        {loadingFavorite && <Loading />}
        { musicsAPI.slice(1).map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
          handleFavorite={ this.handleFavorite }
        />)) }
      </section>
    );
  }

  render() {
    const { requested, loading, musicsAPI } = this.state;
    console.log(musicsAPI);
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
