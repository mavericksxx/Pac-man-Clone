const gameBoard = document.getElementById('game-board');
const pacman = document.createElement('div');
pacman.id = 'pacman';
gameBoard.appendChild(pacman);
const ghost = document.createElement('div');
ghost.id = 'ghost';
gameBoard.appendChild(ghost);
const gameOverMessage = document.getElementById('game-over');

let pacmanPosition = { x: 1, y: 1 };
let ghostPosition = { x: 7, y: 7 };

const walls = [];
const pellets = [];
let score = 0;
const scoreDisplay = document.getElementById('score');

// Grid
// empty space = 0, wall = 1, pellet = 2
const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Create walls and pellets
function createBoard() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];

      if (cell === 1) {
        const wall = document.createElement('div');
        wall.classList.add('wall');
        wall.style.top = y * 40 + 'px';
        wall.style.left = x * 40 + 'px';
        gameBoard.appendChild(wall);
        walls.push({ x, y });
      } else if (cell === 2) {
        const pellet = document.createElement('div');
        pellet.classList.add('pellet');
        pellet.style.top = (y * 40 + 20) + 'px';
        pellet.style.left = (x * 40 + 20) + 'px';
        gameBoard.appendChild(pellet);
        pellets.push({ x, y });
      }
    }
  }
}

// Update the position of entity
function updatePosition(entity, position) {
  entity.style.left = position.x * 40 + 'px';
  entity.style.top = position.y * 40 + 'px';
}

// Check for walls
function canMove(x, y) {
  return grid[y] && grid[y][x] !== 1;
}

// Move pacman
document.addEventListener('keydown', (event) => {
  let newX = pacmanPosition.x;
  let newY = pacmanPosition.y;

  if (event.key === 'ArrowUp') newY -= 1;
  else if (event.key === 'ArrowDown') newY += 1;
  else if (event.key === 'ArrowLeft') newX -= 1;
  else if (event.key === 'ArrowRight') newX += 1;

  if (canMove(newX, newY)) {
    pacmanPosition.x = newX;
    pacmanPosition.y = newY;
    updatePosition(pacman, pacmanPosition);
    checkPelletCollision();
    checkCollisionWithGhost(); 
  }
});

// Check if pacman eats a pellet
function checkPelletCollision() {
  pellets.forEach((pellet, index) => {
    if (pacmanPosition.x === pellet.x && pacmanPosition.y === pellet.y) {
      pellets.splice(index, 1);
      document.querySelector(`.pellet[style*="left: ${pellet.x * 40 + 20}px"][style*="top: ${pellet.y * 40 + 20}px"]`).remove();
      score += 10;
      scoreDisplay.textContent = score;
    }
  });
}

// Check if pacman collides with the ghost
function checkCollisionWithGhost() {
  if (pacmanPosition.x === ghostPosition.x && pacmanPosition.y === ghostPosition.y) {
    gameOver();
  }
}

// End the game
function gameOver() {
  gameOverMessage.style.display = 'block';
  clearInterval(ghostMovementInterval);  
}

// BFS to pathfind to pacman
function bfs(start, target) {
  const queue = [[start]];
  const visited = new Set();
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const path = queue.shift();
    const { x, y } = path[path.length - 1];

    if (x === target.x && y === target.y) return path;

    const directions = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (let dir of directions) {
      if (canMove(dir.x, dir.y) && !visited.has(`${dir.x},${dir.y}`)) {
        visited.add(`${dir.x},${dir.y}`);
        queue.push([...path, dir]);
      }
    }
  }
  return null;
}

// Move the ghost using BFS
function moveGhost() {
  const path = bfs(ghostPosition, pacmanPosition);
  if (path && path.length > 1) {
    ghostPosition = path[1];
    updatePosition(ghost, ghostPosition);
    checkCollisionWithGhost();  
  }
}

// Ghost movement interval
const ghostMovementInterval = setInterval(moveGhost, 500);

// Setup game board and initial positions
createBoard();
updatePosition(pacman, pacmanPosition);
updatePosition(ghost, ghostPosition);
