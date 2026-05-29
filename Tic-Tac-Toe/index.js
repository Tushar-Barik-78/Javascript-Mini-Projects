let turnBox = document.querySelector(".turnBox");
let resetBtn = document.querySelector(".resetBtn");
let GameBox = document.querySelector(".newGameBox");
let winH1 = document.getElementById("winH1");
let newBtn = document.querySelector(".winBtn");

let count = 0; //* for draw case
let player;
let turnO; // * true -> O /  false -> 1
let symbol;
// btn.classList.add("X"); // or "O"

function gameStart() {
  player = 1;
  turnO = Math.random() > 0.5; // * true -> O /  false -> 1
  symbol = turnO ? "O" : "X";
  turnBox.innerText = `Player ${player}'s turn -> ${symbol}`;
  count = 0;
}
gameStart();
// console.log(turnO ,symbol);

const parent = document.querySelector(".container");
const child = parent.children;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(targetBox, player) {
  // console.log(targetBox);

  // console.log(parent.children[0]);
  // console.log(child[0]);

  for (let pattern of winPattern) {
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(child[pattern[0]], child[pattern[1]], child[pattern[2]]);
    const firstChild = child[pattern[0]].innerText;
    const secondChild = child[pattern[1]].innerText;
    const thirdChild = child[pattern[2]].innerText;
    // console.log(firstChild,secondChild,thirdChild);

    if (
      firstChild != "" &&
      firstChild === secondChild &&
      firstChild == thirdChild
    ) {
      // alert(`Player${player} is win`)
      // turnBox.innerText = `Player${player} is win`;
      newGameBox(player);
    }
  }
}
function newGameBox(player) {
  GameBox.classList.remove("hide");
  if (player == undefined) {
    winH1.innerText = `The match is Draw`;
  } else {
    winH1.innerText = `Player${player} is win`;
  }
  for (let i = 0; i <= 8; i++) {
    child[i].disabled = true;
  }
  turnBox.innerText = "";
  resetBtn.disabled = true;
}

function newGame() {
  GameBox.classList.add("hide");
  for (let i = 0; i < 9; i++) {
    child[i].disabled = false;
    child[i].innerText = "";
  }
  resetBtn.disabled = false;
  gameStart();
}

newBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);

const putSymbol = (event) => {
  // console.log(event.target);

  const targetBox = event.target;
  if (targetBox.classList.contains("btn")) {
    //* check the box is filled or not
    // ! This section can be also done by btn disable
    // if(!targetBox.innerText == ""){
    //     alert("The box is already filled");
    //     return;
    // }

    // ! check the draw condition is met or not
    count++;
    if (count == 9) {
      newGameBox();
    }
    // console.log(count);

    //* add the symbol
    // symbol = (turnO) ? "O":"X";
    targetBox.innerText = symbol;
    // console.log(symbol);

    // ! check Win
    checkWin(targetBox, player);

    // * add the player's turn
    player = player == 1 ? 2 : 1;
    turnO = turnO ? false : true;
    symbol = turnO ? "O" : "X";
    turnBox.innerText = `Player ${player}'s turn -> ${symbol}`;
  }
  targetBox.disabled = true;
};

parent.addEventListener("click", putSymbol);




