import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: false,
    };
    this.getUserName = this.getUserName.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({
      loading: true,
      userName: '',
    });
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <Loading />}
        <h1 data-testid="header-user-name">
          { userName }
        </h1>
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
