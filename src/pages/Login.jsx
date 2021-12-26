import React from 'react';
import { TextField } from '@material-ui/core/';
import Button from '@mui/material/Button';
import '../App.css';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: false,
      minNumber: 3,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { userName, minNumber, loading, redirect } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div className="login-container" data-testid="page-login">
        <h1>LOGIN</h1>
        <form>
          <div className="login-field">
            <TextField
              placeholder="Digite seu nome"
              type="text"
              name="userName"
              id="input-name"
              value={ userName }
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </div>
          <Button
            color="success"
            variant="contained"
            disabled={ userName.length < minNumber }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
          >
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
