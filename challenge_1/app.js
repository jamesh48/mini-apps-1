const gamePlayMethods = {
  hasAlreadyWon: false,

  handleUserEntry: (e) => {
    e.preventDefault();
    if (gamePlayMethods.hasAlreadyWon) {
      return;
    }
    var player = gamePlayMethods.countMoves(e);
    setTimeout(() => {gamePlayMethods.detectWin(player)}, 1);
  },

  detectWin: (player) => {
    var boxes = document.getElementsByClassName('boxes');
    Array.from(boxes).forEach(box => {
      if (box.innerHTML.includes(player)) {
        var horizontalWin, verticalWin, rightDiagonalWin, leftDiagonalWin = false;

        if (box.id === '1' || box.id === '4' || box.id === '7') {
          horizontalWin = detectWinners.checkHorizontal(box.id, player);
        }
        if (box.id === '1' || box.id === '2' || box.id === '3') {
          verticalWin = detectWinners.checkVertical(box.id, player);
        }
        if (box.id === '1') {
          rightDiagonalWin = detectWinners.checkRightDiagonal(box.id, player);
        }
        if (box.id === '3') {
          leftDiagonalWin = detectWinners.checkLeftDiagonal(box.id, player);
        }
        if (horizontalWin || verticalWin|| rightDiagonalWin || leftDiagonalWin) {
          gamePlayMethods.hasAlreadyWon = true;
          alert(player + ' Wins the Game!');
        }
      }
    })
  },

  countMoves: (e) => {
    //Opponents moves cannot be overwritten...
    if (document.getElementById(e.target.id).innerHTML !== '') {
      return;
    }
    var boxes = document.getElementsByClassName('boxes');
    let xLength = Array.from(boxes).filter(item => item.innerHTML.includes('X') || item.innerHTML.includes('O')).length;
    if (xLength % 2 === 0) {
      document.getElementById(e.target.id).innerHTML = 'X';
      return 'X';
    } else {
      document.getElementById(e.target.id).innerHTML = 'O';
      return 'O';
    }
    return;
  }
}

const detectWinners= {
  checkHorizontal: (id, player) => {
    var secondBox = document.getElementById((Number(id) + 1).toString()).innerHTML;
    var thirdBox = document.getElementById((Number(id) + 2).toString()).innerHTML;

    if ((secondBox !== '' && thirdBox !== '') && (secondBox.includes(player) && thirdBox.includes(player))) {
      return true;
    }
  },

  checkVertical: (id, player) => {
    var secondBox = document.getElementById((Number(id) + 3).toString()).innerHTML;
    var thirdBox = document.getElementById((Number(id) + 6).toString()).innerHTML;

    if ((secondBox !== '' || thirdBox !== '') && (secondBox.includes(player) && thirdBox.includes(player))) {
      return true;
    }
  },

  checkRightDiagonal: (id, player) => {
    var secondBox = document.getElementById((Number(id) + 4).toString()).innerHTML;
    var thirdBox = document.getElementById((Number(id) + 8).toString()).innerHTML;

    if ((secondBox !== '' || thirdBox !== '') && (secondBox.includes(player) && thirdBox.includes(player))) {
      return true;
    }
  },

  checkLeftDiagonal: (id, player) => {
    var secondBox = document.getElementById((Number(id) + 2).toString()).innerHTML;
    var thirdBox = document.getElementById((Number(id) + 4).toString()).innerHTML;

    if ((secondBox !== '' || thirdBox !== '') && (secondBox.includes(player) && thirdBox.includes(player))) {
      return true;
    }
  }
}



var handlePlayerNameEntry = (e) => {
  e.preventDefault();
  console.log(event.target['0'].value);
  console.log(event.target['1'].value);
}



const gameListeners = {
  playerMoves: () => {
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => {
      box.addEventListener('click', event => {
       gamePlayMethods.handleUserEntry(event);
      })
    })
  },
  refreshGame: () => {
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', event => {
        location.reload();
    });
  },
  enterPlayers: () => {
      const players = document.getElementById('enter-players');
    players.addEventListener('submit', event => {
      handlePlayerNameEntry(event);
    });
  }
}

var adjustBoardWidth = () => {
  var boardWidth = document.getElementById('1').clientWidth;
  document.getElementById('board').style.width = ((boardWidth * 3 + 6) + 'px');
  document.getElementById('new-game-button').style.width = ((boardWidth * 3 + 6) + 'px');
}

const addEventListeners = () => {
  Object.values(gameListeners).forEach((listener) => {
    listener();
  });


  // const enterPlayers = document.getElementById('enter-players');
  //   enterPlayers.addEventListener('submit', event => {
  //     handlePlayerEntry(event);
  // });
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