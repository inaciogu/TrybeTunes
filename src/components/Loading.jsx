import React from 'react';
import '../App.css';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <p style={ { textAlign: 'center' } }>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
