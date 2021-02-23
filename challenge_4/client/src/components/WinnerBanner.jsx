import React from 'react';

const WinnerBanner = (props) => {
  {
    return props.winner === 'red' ? <div>Red Wins!</div>
      : props.winner === 'yellow' ?
        <div>Yellow Wins!</div>
        :
        null;
  }
}

export default WinnerBanner;