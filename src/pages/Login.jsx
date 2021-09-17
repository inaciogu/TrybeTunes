import React from 'react';
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
        <div className="login-box">
          <div className="login">
            <h1>Login</h1>
          </div>
          <form>
            <label htmlFor="input-name">
              <input
                placeholder="Digite seu nome"
                type="text"
                name="userName"
                id="input-name"
                value={ userName }
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              disabled={ userName.length < minNumber }
              type="button"
              data-testid="login-submit-button"
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
