import React from 'react';
import Header from '../components/header/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Página de Edição de perfil</h1>
      </div>
    );
  }
}

export default ProfileEdit;
