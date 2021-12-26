import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../App.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
    this.displayProfile = this.displayProfile.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.setState({ loading: true });
    getUser().then((user) => this.setState({ loading: false, user }));
  }

  displayProfile() {
    const {
      user: { name, email, description, image },
    } = this.state;
    return (
      <section className="center">
        <div className="image-container">
          <img width="250px" src={ image } alt={ name } data-testid="profile-image" />
          <Button variant="outlined">
            <Link to="/profile/edit"><a href>Editar perfil</a></Link>
          </Button>
        </div>
        <div className="info-container">
          <div>
            <h3>Nome: </h3>
            <p>{name}</p>
          </div>
          <div>
            <h3>Email: </h3>
            <p>{email}</p>
          </div>
          <div>
            <h3>Descrição: </h3>
            <p>{description}</p>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : this.displayProfile() }
      </div>
    );
  }
}

export default Profile;
