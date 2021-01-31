const gamePlayState = {
  hasAlreadyWon: false,
  xPlayerWinCount: 0,
  oPlayerWinCount: 0,
  currentMove: 'X',
  xHasFirstMove: true,
  confirmed: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
  }
}
const gamePlayMethods = {
  handleUserEntry: (e) => {
    e.preventDefault();
    if (gamePlayState.hasAlreadyWon || gamePlayState.confirmed[event.target.id]) {
      return;
    }
    var player = gamePlayMethods.countMoves(e);

    setTimeout(() => { gamePlayMethods.detectWin(player) }, 1);
  },

  countMoves: (e) => {
    //Opponents moves cannot be overwritten.
    gamePlayState.confirmed[e.target.id] = true;
    // if (gamePlayState.confirmed[e.target.id]) {
    //   return;
    // }
    // console.log('hello');
    var boxes = document.getElementsByClassName('boxes');
    let xLength = Array.from(boxes).filter(item => (item.innerHTML.includes('X') || item.innerHTML.includes('O')) && gamePlayState.confirmed[item.id] === true).length

    console.log(gamePlayState.xHasFirstMove);
    if (gamePlayState.xHasFirstMove === false) {
      console.log('test');
      if (xLength % 2 !== 0) {
        document.getElementById(e.target.id).innerHTML = 'O';
        gamePlayState.currentMove = 'X';
        return 'O';
      } else {
        console.log('here')
        document.getElementById(e.target.id).innerHTML = 'X';
        gamePlayState.currentMove = 'O';
        return 'X';
      }
    } else {
      if (xLength % 2 !== 0) {
        document.getElementById(e.target.id).innerHTML = 'X';
        gamePlayState.currentMove = 'O';
        return 'X';
      } else {
        document.getElementById(e.target.id).innerHTML = 'O';
        gamePlayState.currentMove = 'X';
        return 'O';
      }
    }
    return;
  },

  detectWin: (player) => {
    var boxes = document.getElementsByClassName('boxes');
    Array.from(boxes).forEach(box => {
      if (box.innerHTML.includes(player)) {
        box.style.backgroundColor = 'seagreen';
        box.style.borderColor = 'yellowgreen'
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
    p === 'X' ? gamePlayState.currentMove = 'X' : gamePlayState.currentMove = 'O';
    gamePlayMethods.refreshBoard();
  },

  refreshBoard: () => {
    gamePlayState.hasAlreadyWon = false;
    document.querySelectorAll('.boxes').forEach(box => {
      box.innerHTML = '';
      box.style = 'intial';
      gamePlayState.confirmed[box.id] = false;
    })
    adjustBoardWidth();
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
  boardSize: undefined,

  handlePlayerNameEntry: (e) => {
    e.preventDefault();
    if (isNaN(event.target['2'].value)) {
      alert('Please enter a number');
      return;
    }
    nameEntry.xPlayer = event.target['0'].value || 'X Player';
    nameEntry.oPlayer = event.target['1'].value || 'O Player';
    nameEntry.boardSize = event.target['2'].value || 510;

    adjustBoardWidth(nameEntry.boardSize);

    document.getElementById('p1-name-header').childNodes[0].nodeValue = nameEntry.xPlayer + ' ';

    document.getElementById('p2-name-header').childNodes[0].nodeValue = nameEntry.oPlayer + ' ';

    nameEntry.disableInputs();
  },

  disableInputs: () => {
    document.querySelectorAll('.player-name-input').forEach(input => {
    if (input.id !== 'board-size') {
        input.disabled = true;
        input.hidden = true;
      }
  document.querySelector('.enter-players').classList.add('input-width-adjusted');
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
    const players = document.querySelector('.enter-players');
    players.addEventListener('submit', event => {
      nameEntry.handlePlayerNameEntry(event);
    });
  },
  detectPlayerMove: () => {
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => {
      box.addEventListener('mouseover', event => {
        potentialMoveReveal(box);
      }),
      box.addEventListener('mouseout', event => {
        potentialMoveRemoval(box);
      })
    })
  },


}

var potentialMoveReveal = (box) => {
  if (gamePlayState.confirmed[box.id] !== true) {
    box.innerHTML = gamePlayState.currentMove;
  }
}

var potentialMoveRemoval = (box) => {
  if (gamePlayState.confirmed[box.id] !== true) {
    box.innerHTML = '';
  }
}

var adjustBoardWidth = (inputSize) => {
  var boardWidth =  (inputSize / 3) || document.getElementById('1').clientWidth;

  document.getElementById('board').style.height = inputSize + 'px';

  document.getElementById('board').style.width = (boardWidth * 3) + 6 + 'px';

  document.querySelectorAll('.boxes').forEach((box) => {
    box.style.height = boardWidth + 'px';
    box.style.width = boardWidth + 'px';
    box.style.lineHeight = boardWidth + 'px';
    box.style.fontSize = (boardWidth / 1.5) + 'px';
  });

  document.getElementById('player-headers').style.width = ((boardWidth * 3 + 8) + 'px');


  document.getElementById('new-game-button').style.width = ((boardWidth * 3 + 8) + 'px');

  document.querySelector('.enter-players').style.width = ((boardWidth * 3 + 8) + 'px');

  var test = document.getElementsByTagName('p').length;



  // document.getElementById('body').style.height = ((boardWidth * 3) + 6  + newGameButtonHeight) + 'px'
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