export { round, reset };

let wins = 0;
let looses = 0;
let rounds = 0;
const tools = ["rock", "scissors", "paper"];
const results = [
  ["t", "c", "u"],
  ["u", "t", "c"],
  ["c", "u", "t"]
];

function round(myChoice) {
  rounds++;
  const compChoice = Math.floor(Math.random() * 3);
  const roundResult = results[compChoice][myChoice];
  switch (roundResult) {
    case "t":
      tie(myChoice, compChoice);
      break;
    case "u":
      win(myChoice, compChoice);
      break;
    case "c":
      loose(myChoice, compChoice);
      break;
    default:
      throw new Error("Something went wrong");
  }
}

function tie(myChoice, compChoice) {
  document.getElementById(
    "results"
  ).innerHTML += `Round ${rounds}, ${tools[myChoice]} vs. ${tools[compChoice]}, it's a tie!<br>`;
}

function win(myChoice, compChoice) {
  wins++;
  document.getElementById(
    "results"
  ).innerHTML += `Round ${rounds}, ${tools[myChoice]} vs. ${tools[compChoice]}, you've WON!<br>`;
  if (wins === 3) {
    document.getElementById("winner").innerHTML =
      '<p class="user">You won the game!</p>';
    [...document.getElementsByClassName("choice")].forEach(el => {
      el.disabled = true;
    });
  }
}

function loose(myChoice, compChoice) {
  looses++;
  document.getElementById(
    "results"
  ).innerHTML += `Round ${rounds}, ${tools[myChoice]} vs. ${tools[compChoice]}, you've LOST!<br>`;
  if (looses === 3) {
    document.getElementById("winner").innerHTML =
      '<p class="computer">Computer won the game!</p>';
    [...document.getElementsByClassName("choice")].forEach(el => {
      el.disabled = true;
    });
  }
}

function reset() {
  rounds = 0;
  wins = 0;
  looses = 0;
  document.getElementById("results").innerHTML = "";
  document.getElementById("winner").innerHTML = "";
  [...document.getElementsByClassName("choice")].forEach(el => {
    el.disabled = false;
  });
}
