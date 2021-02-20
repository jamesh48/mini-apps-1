import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board.jsx';
import Square from './components/square.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.renderSquares = this.renderSquares.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      turn: 'red',
      board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      t1: '',
      t2: '',
      t3: '',
      t4: '',
      t5: '',
      t6: '',
      t7: '',
      t8: '',
      t9: '',
      t10: '',
      t11: '',
      t12: '',
      t13: '',
      t14: '',
      t15: '',
      t16: ''
    }
  }

  renderSquares() {
    const { handleClick } = this;
    const { board, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16 } = this.state;
    return board.map((item, index) => {
      return <Square handleClick={handleClick} test={this.state['t' + (index + 1).toString()]} index={index} key={index} />
    })
  }

  handleClick(event) {
    const currentTile = event.target.dataset;

    let i = 16 - (4 - currentTile.y)
    while (this.state['t' + i.toString()] !== '' && (i - 4) > 0) {
      i -= 4;
    }

    this.setState(prevState => {
      // dont let opposing player change top tile.
      if (prevState['t' + i] !== '') {
        return prevState;
      } else {
        let incomingMove = prevState.turn === 'red' ? 'black' : 'red';
        return {
          ['t' + i.toString()]: incomingMove,
          turn: incomingMove
        }
      }
    });
  }

  render() {
    const { renderSquares, handleClick } = this;
    return (
      <div>
        <Board renderSquares={renderSquares} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));