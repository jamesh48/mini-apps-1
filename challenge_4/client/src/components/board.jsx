import React from 'react';

const Board = (props) => {
  return (
    <div id='board'>
      {props.renderSquares()}
    </div>
  )
}

export default Board;