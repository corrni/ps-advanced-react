// @flow
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: null };
  }

  state: State;

  asyncFunc = () => Promise.resolve(42);

  // $FlowFixMe
  async componentDidMount() {
    this.setState({
      answer: await this.asyncFunc()
    });
  }

  render() {
    let _answer = '';
    const {answer} = this.state;
    if (answer) _answer = ` -- ${answer}`;

    return (
      <h2>Hello Class Components{_answer}</h2>
    );
  }
}

type State = {
  answer: ?number
};

const el = document.getElementById('root');

ReactDOM.render(<App />, el);
