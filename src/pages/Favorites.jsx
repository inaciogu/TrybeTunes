import React from 'react';
import Header from '../components/header/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Página de Favoritos</h1>
      </div>
    );
  }
}

export default Favorites;
