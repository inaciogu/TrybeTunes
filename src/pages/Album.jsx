import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      musicsAPI: [],
      requested: false,
    };
  }

  componentDidMount() {
    this.requestMusicsAPI();
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
    const { musicsAPI } = this.state;
    return (
      <section>
        <section>
          <img src={ musicsAPI[0].artworkUrl100 } alt="" />
        </section>
        <h2 data-testid="album-name">{ musicsAPI[0].collectionName }</h2>
        <h3 data-testid="artist-name">{ musicsAPI[0].artistName }</h3>
        { musicsAPI.slice(1).map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
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
