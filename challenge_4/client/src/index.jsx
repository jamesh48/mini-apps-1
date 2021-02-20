import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board.jsx';
import Square from './components/square.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.renderSquares = this.renderSquares.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.detectVerticalWin = this.detectVerticalWin.bind(this);
    this.detectHorizontalWin = this.detectHorizontalWin.bind(this);
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
    }, () => {
      let dVW = this.detectVerticalWin()
      let dHW = this.detectHorizontalWin(i);
    });
  }

  detectVerticalWin() {
    for (let i = 1; i <= 16; i++) {
      const token = this.state['t' + i];
      const t2v = (this.state['t' + (i + 4)] === token);
      const t3v = (this.state['t' + (i + 8)] === token);
      const t4v = (this.state['t' + (i + 12)] === token);

      if (token && t2v && t3v && t4v) {
        console.log('vertical victory')
        break;
      }
    }
  }

detectHorizontalWin(i) {
  let column = (i % 4) || 4;
  let rowStart = (i - column + 1)
  const rowEnd = rowStart + 3;
  console.log(rowEnd, rowStart)
  for (let i = rowStart; i <= rowEnd; i++) {
    const token = this.state['t' + i];
    const t2h = (this.state['t' + (i + 1)] === token && (i + 1) <= rowEnd);
    const t3h = (this.state['t' + (i + 2)] === token && (i + 2) <= rowEnd);
    const t4h = (this.state['t' + (i + 3)] === token && (i + 3) <= rowEnd);
    if (token && t2h && t3h && t4h) {
      console.log(`horizontal victory!`)
      break;
    }
  }
}

// 1,2,3,4 = 10
// 2,3,4,5 = 14
// 5,6,7,8 = 26


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