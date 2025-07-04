function changeIntro() {
  const intro = document.getElementById('intro');
  intro.textContent = "Thanks for visiting my page! I'm currently open to exciting new opportunities.";
}

// Function to toggle contact section visibility (existing)
function toggleContactSection() {
  const contactSection = document.getElementById('contactSection');
  if (contactSection.style.display === 'none' || contactSection.style.display === '') {
      contactSection.style.display = 'block';
  } else {
      contactSection.style.display = 'none';
  }
}

// --- New functionality for showing/hiding main sections ---
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav ul li a');
  const sections = document.querySelectorAll('.new-section');

  // Function to hide all new sections
  function hideAllSections() {
      sections.forEach(section => {
          section.style.display = 'none';
      });
  }

  // Add click event listeners to navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default anchor jump behavior

          const targetId = link.getAttribute('href').substring(1); // Get the section ID from href (e.g., "gamesSection")
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
              hideAllSections(); // Hide all sections first
              targetSection.style.display = 'block'; // Show the clicked section
              targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
          }
      });
  });

  // Optionally, show the first section (e.g., Games) on page load, or keep all hidden.
  // Uncomment the line below if you want one section to be visible initially.
  // document.getElementById('gamesSection').style.display = 'block';
});


// --- Tic Tac Toe Game Logic (existing) ---
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
      return; // Cell already filled or game not active
  }

  gameBoard[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer); // Add class for styling

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard[winCondition[0]];
      let b = gameBoard[winCondition[1]];
      let c = gameBoard[winCondition[2]];

      if (a === '' || b === '' || c === '') {
          continue; // Not all cells in this winning condition are filled
      }
      if (a === b && b === c) {
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      gameStatus.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
  }

  // Check for a draw
  let roundDraw = !gameBoard.includes('');
  if (roundDraw) {
      gameStatus.textContent = 'It\'s a draw!';
      gameActive = false;
      return;
  }

  // If no win or draw, switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  gameStatus.textContent = `It's ${currentPlayer}'s turn`;

  cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('X', 'O');
  });
}

// Event Listeners for Tic Tac Toe
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial game status display
gameStatus.textContent = `It's ${currentPlayer}'s turn`;

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav ul li a');
  const sections = document.querySelectorAll('.new-section');

  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  function showSectionById(id) {
    hideAllSections();
    const target = document.getElementById(id);
    if (target) {
      target.style.display = 'block';
      window.scrollTo({
        top: target.offsetTop - 70, // Adjust for fixed nav
        behavior: 'smooth'
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSectionById(targetId);
    });
  });

  // Show the first section on page load (optional)
  // showSectionById('gamesSection');
});

// Toggle Google Mode (light minimalist theme)
function toggleGoogleMode() {
  document.body.classList.toggle('google-mode');
}

