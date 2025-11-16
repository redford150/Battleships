const ROWS = 5;
const COLS = 5;
const MAX_TURNS = 5;

let ship = {r: 0, c: 0};
let turn = 1;
let boardState = []; // "" | "M" | "X"
let gameOver = false;

const boardEl = document.getElementById('board');
const messageEl = document.getElementById('message');
const turnNumberEl = document.getElementById('turn-number');
const resetBtn = document.getElementById('reset');

function randInt(max){ return Math.floor(Math.random()*max); }

function placeShip(){
  ship.r = randInt(ROWS);
  ship.c = randInt(COLS);
}

function updateTurn(){
  turnNumberEl.textContent = Math.min(turn, MAX_TURNS);
}

function setMessage(text){ messageEl.textContent = text; }

function createBoard(){
  boardEl.innerHTML = '';
  boardState = Array.from({length: ROWS}, ()=>Array.from({length: COLS}, ()=>"") );
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.addEventListener('click', onCellClick);
      boardEl.appendChild(cell);
    }
  }
}

function revealShip(highlight){
  // show ship position after game end
  const selector = `.cell[data-r="${ship.r}"][data-c="${ship.c}"]`;
  const el = boardEl.querySelector(selector);
  if(el){
    if(highlight) el.classList.add('revealed');
    el.textContent = 'S';
  }
}

function endGame(win){
  gameOver = true;
  if(win){
    setMessage('Now why did you do that, you are sunk my battleship!');
  } else {
    setMessage(`Game Over! The ship was at: ${ship.r}, ${ship.c}`);
    revealShip(true);
  }
}

function onCellClick(ev){
  if(gameOver) return;
  const r = Number(ev.currentTarget.dataset.r);
  const c = Number(ev.currentTarget.dataset.c);

  if(boardState[r][c] === 'M' || boardState[r][c] === 'X'){
    setMessage("What are you doin, you did that already!");
    return;
  }

  if(r === ship.r && c === ship.c){
    boardState[r][c] = 'X';
    const el = ev.currentTarget;
    el.classList.add('hit');
    el.textContent = 'X';
    endGame(true);
    return;
  }

  // miss
  boardState[r][c] = 'M';
  const el = ev.currentTarget;
  el.classList.add('miss');
  el.textContent = 'M';
  setMessage('You missed, Loser!');

  // increment turn and check
  turn += 1;
  if(turn > MAX_TURNS){
    endGame(false);
  } else {
    updateTurn();
  }
}

function resetGame(){
  turn = 1;
  gameOver = false;
  placeShip();
  createBoard();
  updateTurn();
  setMessage("Click a tile to guess the ship's position.");
}

resetBtn.addEventListener('click', resetGame);

// Initialize
placeShip();
createBoard();
updateTurn();
setMessage("Click a tile to guess the ship's position.");
