import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {
    answer: 42,
  };

  render() {
    return (
      <h2>Hello Class Components -- {this.state.answer}</h2>
    );
  }
}

const el = document.getElementById('root');

ReactDOM.render(<App />, el);
