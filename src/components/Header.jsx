import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    console.log(user);
  }

  render() {
    const { userName, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { userName }
        </h1>
      </header>
    );
  }
}

export default Header;
