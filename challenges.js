//? GAME RULES:

//? - The game has 2 players, playing in rounds
//? - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score

//? - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn

//? - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn

//? - The first player to reach 100 points on GLOBAL score wins the game

var scores, roundScore, activePlayer, gamePlaying, lastDiceRoll;

initGame();

// *********************************************************
//*******     Functionality of Roll Dice Button    ********
// *******************************************************

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //   1. Generate a Random Number
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    //   2. Display the Result
    var dice1_DOM = document.querySelector(".dice-1");
    var dice2_DOM = document.querySelector(".dice-2");
    dice1_DOM.style.display = "block";
    dice2_DOM.style.display = "block";
    dice1_DOM.src = "dice-" + dice1 + ".png";
    dice2_DOM.src = "dice-" + dice2 + ".png";

    //   3. Update the RoundScore IF the rolled number was not a 1
    if (dice === 6 && lastDiceRoll === 6) {
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      // Add Score
      roundScore += dice;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // 4. Change the Player's turn
      nextPlayer();
    }

    lastDiceRoll = dice;
  }
});

// ****************************************************************
// *******         Functionality of Hold Button       ************
// **************************************************************

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Add Current Score to Global Score
    scores[activePlayer] += roundScore;

    // 2. Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".set-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // 3. Check if player Won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner !";
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // 4. Change the Player's turn
      nextPlayer();
    }
  }
});

// ****************************************************************
// *******       Functionality of New Game Button     ************
// **************************************************************

document.querySelector(".btn-new").addEventListener("click", initGame);

// ****************************************************************
// *******                Toggle Players              ************
// **************************************************************

function nextPlayer() {
  // Next Player ie. Changes turns
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

// ****************************************************************
// *******            Game Initialization             ************
// **************************************************************

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
