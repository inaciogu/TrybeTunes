import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AlbumCard from '../../components/AlbumCard';
import Header from '../../components/header/Header';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './style.css';

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
       <section className="main">
         <h4>{`Resultado de álbuns de: ${artist}`}</h4>
         <div>
           <ul className="albums">
             {artistSearch.map((album) => (
               <li key={ album.collectionId }>
                 <AlbumCard
                   album={ album }
                 />
               </li>))}
           </ul>
         </div>
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
        <Header />
        <div className="form-container">
          <form>
            <span className="input-box">
              <h3>Pesquise um artista ou banda:</h3>
              <TextField
                variant="outlined"
                style={ { margin: '10px' } }
                size="small"
                value={ searchText }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                type="text"
                name="searchText"
                id="search-input"
              />
            </span>
            <Button
              variant="contained"
              color="primary"
              style={ { margin: '10px 3px', height: '40px' } }
              size="large"
              onClick={ this.handleClick }
              disabled={ searchText.length < minNumber }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </Button>
          </form>
        </div>
        <section>
          { loading && <Loading /> }
          { requested && this.loadAlbums() }
        </section>
      </div>
    );
  }
}

export default Search;
