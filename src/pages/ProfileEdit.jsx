import React from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../components/header/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../App.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
      disabled: true,
      redirect: null,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = ({ target: { name, value } }) => {
    const { user } = this.state;
    user[name] = value;
    this.buttonDisable();
  }

  onClick = (event) => {
    const { user } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    updateUser(user).then(() => {
      this.setState({ loading: false, redirect: '/profile' });
    });
  }

  getUserInfo = () => {
    this.setState({ loading: true });
    getUser().then((user) => {
      this.setState({ loading: false, user });
      this.buttonDisable();
    });
  }

  buttonDisable = () => {
    const { user } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailResult = !emailRegex.test(user.email);
    const requiredAllResult = Object.values(user).some((value) => value === '');
    if (requiredAllResult || emailResult) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  editForm = () => {
    const {
      user: { name, email, description, image },
      disabled,
    } = this.state;
    return (
      <form className="center">
        <h1>Editar Perfil</h1>
        <TextField
          label="NOME"
          className="text-field"
          type="text"
          name="name"
          style={ { marginBottom: '20px' } }
          value={ name }
          onChange={ this.handleChange }
          data-testid="edit-input-name"
        />
        <TextField
          label="E-MAIL"
          className="text-field"
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          style={ { marginBottom: '20px' } }
          data-testid="edit-input-email"
        />
        <TextField
          type="text"
          className="text-field"
          style={ { marginBottom: '20px' } }
          name="description"
          value={ description }
          onChange={ this.handleChange }
          data-testid="edit-input-description"
        />
        <TextField
          type="text"
          style={ { marginBottom: '20px' } }
          name="image"
          className="text-field"
          value={ image }
          onChange={ this.handleChange }
          data-testid="edit-input-image"
        />
        <Button
          type="button"
          variant="contained"
          color="success"
          disabled={ disabled }
          onClick={ this.onClick }
          data-testid="edit-button-save"
        >
          Salvar
        </Button>
      </form>
    );
  }

  render() {
    const { loading, redirect } = this.state;
    if (redirect) return <Redirect to="/profile" />;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          {loading ? <Loading /> : this.editForm()}
        </div>
      </div>
    );
  }
}
export default ProfileEdit;
