import React from 'react';

const Square = (props) => {
  const { index, handleClick, test } = props;
  // console.log('x->' + props.['t' + index.toString()])

  return (
    <div className= {'square ' + test}
    id={index + 1} data-tile= {index + 1} data-y={(index % 7) + 1} data-x={Math.ceil((index + 1) / 7)} onClick=
      {handleClick}>
    </div>
  )
}

export default Square;

