const gamePlayState = {
  hasAlreadyWon: false,
  xPlayerWinCount: 0,
  oPlayerWinCount: 0,
  xHasFirstMove: true
}
const gamePlayMethods = {
  handleUserEntry: (e) => {
    e.preventDefault();
    if (gamePlayState.hasAlreadyWon) {
      return;
    }
    var player = gamePlayMethods.countMoves(e);

    setTimeout(() => { gamePlayMethods.detectWin(player) }, 1);
  },

  countMoves: (e) => {
    //Opponents moves cannot be overwritten...
    if (document.getElementById(e.target.id).innerHTML !== '') {
      return;
    }
    var boxes = document.getElementsByClassName('boxes');
    let xLength = Array.from(boxes).filter(item => item.innerHTML.includes('X') || item.innerHTML.includes('O')).length;

    if (gamePlayState.xHasFirstMove === false) {
      if (xLength % 2 === 0) {
        document.getElementById(e.target.id).innerHTML = 'O';
        return 'O';
      } else {
        document.getElementById(e.target.id).innerHTML = 'X';
        return 'X';
      }
    } else {
      if (xLength % 2 === 0) {
        document.getElementById(e.target.id).innerHTML = 'X';
        return 'X';
      } else {
        document.getElementById(e.target.id).innerHTML = 'O';
        return 'O';
      }
    }
    return;
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
        if (horizontalWin || verticalWin || rightDiagonalWin || leftDiagonalWin) {
          gamePlayState.hasAlreadyWon = true;
          // alert(player + ' Wins the Game!');
          gamePlayMethods.annouceWinner(player);
        }
      }
    })
  },

  annouceWinner: (player) => {
    player === 'X' ? alert(`${(nameEntry.xPlayer || 'X')} wins the Game!`) : alert(`${(nameEntry.oPlayer || 'O')} wins the Game!`);
    gamePlayMethods.updateScoreBoard(player);
  },

  updateScoreBoard: (p) => {
    var winner = document.getElementById(`p-${p.toLowerCase()}-tally`);
    p === 'X' ? gamePlayState.xPlayerWinCount += 1 : gamePlayState.oPlayerWinCount += 1;
    p === 'X' ? winner.innerHTML = gamePlayState.xPlayerWinCount : winner.innerHTML = gamePlayState.oPlayerWinCount;
    p === 'X' ? gamePlayState.xHasFirstMove = true : gamePlayState.xHasFirstMove = false;
    gamePlayMethods.refreshBoard();
  },

  refreshBoard: () => {
    gamePlayState.hasAlreadyWon = false;
    document.querySelectorAll('.boxes').forEach(box => {
      box.innerHTML = '';
    })
  }

}

const detectWinners = {
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

const nameEntry = {
  xPlayer: undefined,
  oPlayer: undefined,

  handlePlayerNameEntry: (e) => {
    e.preventDefault();
    nameEntry.xPlayer = event.target['0'].value || 'X Player';
    nameEntry.oPlayer = event.target['1'].value || 'O Player';

    document.getElementById('p1-name-header').childNodes[0].nodeValue = nameEntry.xPlayer + ' ';

    document.getElementById('p2-name-header').childNodes[0].nodeValue = nameEntry.oPlayer + ' ';


    nameEntry.disableInputs();
  },

  disableInputs: () => {
    document.querySelectorAll('.player-name-input').forEach(input => {
      input.disabled = true;
    })
  }
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
  refreshGameListener: () => {
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', event => {
      location.reload();
    });
  },
  enterPlayers: () => {
    const players = document.getElementById('enter-players');
    players.addEventListener('submit', event => {
      nameEntry.handlePlayerNameEntry(event);
    });
  }
}

var updateBoardWidth = (event) => {

}

var adjustBoardWidth = () => {
  var boardWidth = document.getElementById('1').clientWidth;
  document.getElementById('board').style.width = ((boardWidth * 3 + 6) + 'px');

  document.querySelectorAll('.boxes').forEach((box) => {
    box.style.height = boardWidth + 'px';
    box.style.width = boardWidth + 'px';
    box.style.lineHeight = boardWidth + 'px';
  })

  document.getElementById('new-game-button').style.width = ((boardWidth * 3 + 8) + 'px');

  document.getElementById('player-headers').style.width = ((boardWidth * 3 + 8) + 'px');

  document.getElementById('enter-players').style.width = ((boardWidth * 3 + 8) + 'px');
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