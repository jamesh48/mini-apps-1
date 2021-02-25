import React from 'react';

const WinnerBanner = (props) => {

  return props.winner === 'red' ? <div id='annouce-winner'>Red Wins!</div>
    : props.winner === 'yellow' ?
      <div id='annouce-winner'>Yellow Wins!</div>
      : props.winner === 'tie' ?
        <div id='annouce-winner'>It's a Tie!</div> :
        <div></div>
}

export default WinnerBanner;