const removeChilds = (root) => {
  let child = root.firstChild;

  while (child) {
    root.removeChild(child);
    child = root.firstChild;
  }
}

const render = (root, element) => {
  removeChilds(root);

  root.appendChild(element);
}

const swapTurn = () => {
  isCrossTurn = !isCrossTurn;
}

const swapIndicator = () => {
  const infoBoard = document.querySelector('.info-board');
  infoBoard.classList.toggle('x');
  infoBoard.classList.toggle('o');
}

const checkWin = () => {
  const cells = document.querySelectorAll('.cell');
  let indicatorWinIndex;

  const isPlayerWin = WIN_INDICATOR.some((combination, index) => {
    const isCorrectCombination = combination.every((index) => {
      return cells[index].classList.contains(isCrossTurn ? 'x' : 'o');
    });

    if (isCorrectCombination) {
      indicatorWinIndex = index;
    }
    
    return isCorrectCombination;
  });

  return {
    isWin: isPlayerWin,
    indicatorWinIndex,
  }
}

const updateCellsBoardWin = () => {
  const cellsBoard = document.querySelector('.cells-board');
  cellsBoard.classList.add('win');
}

const renderIndicatorWin = ({ combination }) => {
  const cellsBoard = document.querySelector('.cells-board');
  const indicatorWin = createIndicatorWin({ combination });
  cellsBoard.appendChild(indicatorWin);
}


const checkState = () => {
  const { isWin: isPlayerWin, indicatorWinIndex } = checkWin();

  if (isPlayerWin) {
    isWin = true;

    if (isCrossTurn) scorePlayerX++;
    else scorePlayerO++;

    renderIndicatorWin({ combination: indicatorWinIndex });  
    updateCellsBoardWin();
    
    setTimeout(() => renderWinInfo(), 1500);

    return;
  }

  swapIndicator();
  swapTurn();
  return;
}

const renderBoardGame = () => {
  const container = document.querySelector('.container');

  const board = createBoard();
  const infoBoard = createInfoBoard();
  const cellsBoard = createCellsBoard({ handleClickCell: checkState });

  board.appendChild(infoBoard);
  board.appendChild(cellsBoard);

  render(container, board);
}

const handleSinglePlayer = () => {
  renderBoardGame();
};

const handlePlay = () => {
  renderBoardGame();
};

const renderMainMenu = () => {
  const container = document.querySelector('.container');

  const mainMenu = document.createElement('div');
  mainMenu.classList.add('main-menu');

  const title = createTitle({ text: 'Tic Tac Toe' });
  const divider = createDivider();
  const playGame = createButton({
    text: 'Play Game',
    typeButton: 'success',
    handleClick: handlePlay,
  });

  const menuButtonContainer = document.createElement('div');
  menuButtonContainer.classList.add('menu-button');
  menuButtonContainer.appendChild(playGame);

  mainMenu.appendChild(title);
  mainMenu.appendChild(divider);
  mainMenu.appendChild(menuButtonContainer);

  render(container, mainMenu);
};

const handleToMainMenu = () => {
  scorePlayerX = 0;
  scorePlayerO = 0;
  renderMainMenu();
}

const handleMatchAgain = () => {
  isWin = false;
  isCrossTurn = !isCrossTurn;
  renderBoardGame();
}

const renderWinInfo = () => {
  const container = document.querySelector('.container');

  const mainMenu = document.createElement('div');
  mainMenu.classList.add('main-menu');

  const title = createTitle({ text: `${isCrossTurn ? 'Player 1' : 'Player 2'} Win` });
  const divider = createDivider();
  const scoreInfo = createScoreInfo();
  const buttonToMainMenu = createButton({
    text: 'Main Menu',
    typeButton: 'danger',
    handleClick: handleToMainMenu,
  });
  const buttonMatchAgain = createButton({
    text: 'Match Again',
    typeButton: 'success',
    handleClick: handleMatchAgain,
  });

  const menuButtonContainer = document.createElement('div');
  menuButtonContainer.classList.add('menu-button');
  menuButtonContainer.appendChild(buttonToMainMenu);
  menuButtonContainer.appendChild(buttonMatchAgain);

  mainMenu.appendChild(title);
  mainMenu.appendChild(divider);
  mainMenu.appendChild(scoreInfo);
  mainMenu.appendChild(menuButtonContainer);

  render(container, mainMenu);
};
