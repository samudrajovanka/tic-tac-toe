const createTitle = ({ text }) => {
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerHTML = text;

  return title;
}

const createParagraf = ({ text, className }) => {
  const paragraf = document.createElement('p');
  paragraf.classList.add(className);
  paragraf.innerText = text;

  return paragraf;
}

const createDivider = () => {
  const divider = document.createElement('div');
  divider.classList.add('divider');

  return divider;
}

const createButton = ({ text, typeButton, handleClick }) => {
  const button = document.createElement('button');
  button.classList.add('btn', typeButton ? `btn-${typeButton}` : undefined);
  button.innerHTML = text;

  button.addEventListener('click', handleClick);

  return button;
}

const createBoard = () => {
  const board = document.createElement('div');
  board.classList.add('board');

  return board;
}

const createPlayerInfo = ({ playerType, playerName }) => {
  const playerInfo = document.createElement('div');
  playerInfo.classList.add('player-info', playerType);

  const playerNameElement = createParagraf({
    text: playerName,
    className: 'player-name',
  });

  const playerIconElement = createParagraf({
    text: playerType === 'x' ? 'X' : 'O',
    className: 'player-icon',
  });

  playerInfo.appendChild(playerNameElement);
  playerInfo.appendChild(playerIconElement);

  return playerInfo;
}

const createInfoBoard = () => {
  const infoBoard = document.createElement('div');
  infoBoard.classList.add('info-board', isCrossTurn ? 'x' : 'o');

  const playerInfoX = createPlayerInfo({ playerType: 'x', playerName: 'Player 1' });
  const playerInfoO = createPlayerInfo({ playerType: 'o', playerName: 'Player 2' });

  infoBoard.appendChild(playerInfoX);
  infoBoard.appendChild(playerInfoO);

  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  infoBoard.appendChild(indicator);

  return infoBoard;
}

const createCellBoard = ({ handleClick }) => {
  const cellBoard = document.createElement('div');
  cellBoard.classList.add('cell');

  cellBoard.addEventListener('click', () => {
    if (!isWin) {
      cellBoard.classList.add(isCrossTurn ? 'x' : 'o');
      cellBoard.innerText = isCrossTurn ? 'X' : 'O';

      handleClick();
    }
  }, { once: true });

  return cellBoard;
}

const createIndicatorWin = ({ combination }) => {
  const textIndicators = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const indicatorWin = document.createElement('div');
  indicatorWin.classList.add('win-board-indicator');

  setTimeout(() => {
    indicatorWin.classList.add(textIndicators[combination]);
  }, 1);

  return indicatorWin;
}

const createCellsBoard = ({ handleClickCell }) => {
  const cellsBoard = document.createElement('div');
  cellsBoard.classList.add('cells-board');

  for (let i = 0; i < 9; i++) {
    const cellBoard = createCellBoard({ handleClick: handleClickCell });
    cellsBoard.appendChild(cellBoard);
  }

  return cellsBoard;
}

const createPlayerScoreInfo = ({ playerName, score }) => {
  const playerInfo = document.createElement('div');
  playerInfo.classList.add('player-info');

  const playerNameElement = createParagraf({
    text: playerName,
    className: 'player-name',
  });

  const playerScoreElement = createParagraf({
    text: score,
    className: 'player-score',
  });

  playerInfo.appendChild(playerNameElement);
  playerInfo.appendChild(playerScoreElement);

  return playerInfo;
}

const createScoreInfo = () => {
  const infoScore = document.createElement('div');
  infoScore.classList.add('info-score');

  const playerInfoX = createPlayerScoreInfo({
    playerName: 'Player 1',
    score: scorePlayerX,
  });
  const playerInfoO = createPlayerScoreInfo({
    playerName: 'Player 2',
    score: scorePlayerO,
  });

  infoScore.appendChild(playerInfoX);
  infoScore.appendChild(playerInfoO);

  return infoScore;
}
