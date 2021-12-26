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
        <div className="user-box">
          <img width="32px" src="/perfil.png" alt="" />
          <h2 data-testid="header-user-name">
            {loading ? <Loading /> : userName}
          </h2>
        </div>
        <nav>
          <span>
            <Link data-testid="link-to-search" to="/search"><a href>Search</a></Link>
          </span>
          <span>
            <Link data-testid="link-to-profile" to="/profile"><a href>Profile</a></Link>
          </span>
          <span>
            <Link data-testid="link-to-favorites" to="/favorites">
              <a href>Favorites</a>

            </Link>
          </span>
        </nav>
      </header>
    );
  }
}

export default Header;
