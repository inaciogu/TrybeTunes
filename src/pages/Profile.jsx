import React from 'react';
import Header from '../components/header/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Página de Perfil</h1>
      </div>
    );
  }
}

export default Profile;
