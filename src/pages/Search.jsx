import React from 'react';
import Header from '../components/header/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minNumber: 2,
      searchText: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { minNumber, searchText } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Página de pesquisa</h1>
        <form>
          <label htmlFor="search-input">
            <input
              value={ searchText }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              type="text"
              name="searchText"
              id="search-input"
            />
          </label>
          <button
            disabled={ searchText.length < minNumber }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
