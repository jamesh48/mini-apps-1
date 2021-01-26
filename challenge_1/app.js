var handleClick = (e, item) => {
  e.preventDefault();
  if (countMoves()) {
    document.getElementById(e.target.id).innerHTML = '|__X__|';
  } else {
    document.getElementById(e.target.id).innerHTML = '|__O__|';
  }
  detectWin();
}

var detectWin = () => {
  var boxes = document.getElementsByClassName('boxes');
  Array.from(boxes).forEach(box =>{
      if (box.innerHTML.includes('X')) {
        var xHorizontal = checkHorizontal(box.id, 'X');
        var xVertical = checkVertical(box.id, 'X');
        var xRightDiagonal = checkRightDiagonal(box.id, 'X');
        var xLeftDiagonal = checkLeftDiagonal(box.id, 'X');
        if (xHorizontal || xVertical || xRightDiagonal || xLeftDiagonal) {
          console.log('X Wins!');
          alert('X Wins the Game!');
        }
      } else if (box.innerHTML.includes('O')) {
        var oHorizontal = checkHorizontal(box.id, 'O');
        var oVertical = checkVertical(box.id, 'O');
        var oRightDiagonal = checkRightDiagonal(box.id, 'O');
        var oLeftDiagonal = checkLeftDiagonal(box.id, 'O');
        if (oHorizontal || oVertical || oRightDiagonal || oLeftDiagonal) {
          console.log('O Wins!');
          alert('O Wins the Game!');
        }
      }
    });
}

var countMoves = () => {
  var boxes = document.getElementsByClassName('boxes');
  let xLength = Array.from(boxes).filter(item => item.innerHTML.includes('X') || item.innerHTML.includes('O')).length;
  return xLength % 2 === 0 ? true : false;
}

var checkHorizontal = (id, player) => {
  if (!document.getElementById((Number(id) + 1).toString()) || !document.getElementById((Number(id) + 2).toString())) {
    return;
  }

  if (document.getElementById((Number(id) + 1).toString()).innerHTML.includes(player) && document.getElementById((Number(id) + 2).toString()).innerHTML.includes(player)) {
    return true;
  }
}

var checkVertical = (id, player) => {
  if (!document.getElementById((Number(id) + 3).toString()) || !document.getElementById((Number(id) + 6).toString())) {
    return;
  }
  if (document.getElementById((Number(id) + 3).toString()).innerHTML.includes(player) && document.getElementById((Number(id) + 6).toString()).innerHTML.includes(player)) {
    return true;
  }
}

var checkRightDiagonal = (id, player) => {
  if (!document.getElementById((Number(id) + 4).toString()) || !document.getElementById((Number(id) + 8).toString())) {
    return;
  }
  if (document.getElementById((Number(id) + 4).toString()).innerHTML.includes(player) && document.getElementById((Number(id) + 8).toString()).innerHTML.includes(player)) {
    return true;
  }
}

var checkLeftDiagonal = (id, player) => {
  if (!document.getElementById((Number(id) + 2).toString()) || !document.getElementById((Number(id) + 4).toString())) {
    return;
  }
  if (document.getElementById((Number(id) + 2).toString()).innerHTML.includes(player) && document.getElementById((Number(id) + 4).toString()).innerHTML.includes(player)) {
    return true;
  }
}

// vertical
//1,4,7
//2,5,8
//3,6,9

//horizontal
//1,2,3
//4,5,6
//7,8,9

// diagonal
//1,5,9
//3,5,7