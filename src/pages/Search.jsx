import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/header/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minNumber: 2,
      searchText: '',
      loading: false,
      artistSearch: [],
      artist: '',
      requested: false,
    };
  }

   handleClick = async () => {
     const { searchText } = this.state;
     this.setState({
       loading: true,
     });
     const search = await searchAlbumsAPI(searchText);
     this.setState({
       searchText: '',
       artistSearch: search,
       loading: false,
       requested: true,
       artist: searchText,
     });
   }

   // A ideia de criar uma função fora do render para renderizar foi inspirada no codigo do Rodolfo Braga. Source: https://github.com/tryber/sd-014-b-project-trybetunes/pull/4/commits/4b58e32ba59c9ce7e4d9c14af275fbfc9ec9ab17

   loadAlbums = () => {
     const { artistSearch, artist } = this.state;
     if (!artistSearch.length) {
       return (
         <div>
           <h4>{`Resultado de álbuns de: ${artist}`}</h4>
           <h3>Nenhum álbum foi encontrado</h3>
         </div>
       );
     }
     return (
       <section>
         <h4>{`Resultado de álbuns de: ${artist}`}</h4>
         {artistSearch.map((album) => (<AlbumCard
           key={ album.collectionId }
           album={ album }
         />))}
       </section>
     );
   }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { minNumber,
      searchText, loading, requested } = this.state;
    return (
      <div data-testid="page-search">
        <header>
          <Header />
        </header>
        <form>
          <input
            value={ searchText }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            type="text"
            name="searchText"
            id="search-input"
          />
          <button
            onClick={ this.handleClick }
            disabled={ searchText.length < minNumber }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        <section>
          { loading && <Loading /> }
          { requested && this.loadAlbums() }
        </section>
      </div>
    );
  }
}

export default Search;
