// Első

let chairs = [];
let currPlayer = true;
let currentNonPlaceables = "";
let chairAmount = 0;
let playerOne = ["", 0];
let playerTwo = ["", 0];
let alreadyPlacedHere = [];
let isChairGameOver = 0;

function canStartChairGame() {
  playerOne[0] = document.getElementById("chairGamePlayer1").value;
  playerTwo[0] = document.getElementById("chairGamePlayer2").value;
  if (playerOne[0] !== "" && playerTwo[0] !== "") {
    chairGame();
    document.getElementById("chairsDiv").classList.remove("hidden");
    document.getElementById("chairGameInit").classList.add("hidden");
  }
}

function moveToChair(chairNum) {
  for (
    let i = alreadyPlacedHere[alreadyPlacedHere.length - 1] - 1;
    i < alreadyPlacedHere[alreadyPlacedHere.length - 1] + 2;
    i++
  ) {
    if (!alreadyPlacedHere.includes(i) && i >= 0 && i < chairAmount) {
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.remove("cursor-not-allowed");
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.add("cursor-pointer");
      document
        .getElementById(`chairGameChair${i}Button`)
        .setAttribute("onclick", `moveToChair(${i})`);
    }
  }

  chairs[chairNum][0] = currPlayer;
  if (currPlayer) {
    document.getElementById(`chairGameChair${chairNum}`).innerHTML =
      playerOne[0];
    playerOne[1] += parseInt(
      document.getElementById(`chairGameChair${chairNum}Value`).innerHTML,
    );
  } else {
    document.getElementById(`chairGameChair${chairNum}`).innerHTML =
      playerTwo[0];
    playerTwo[1] += parseInt(
      document.getElementById(`chairGameChair${chairNum}Value`).innerHTML,
    );
  }

  if (currPlayer) {
    currPlayer = false;
  } else {
    currPlayer = true;
  }

  for (let i = chairNum - 1; i < chairNum + 2; i++) {
    if (i >= 0 && i < chairAmount && !alreadyPlacedHere.includes(i)) {
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.add("cursor-not-allowed");
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.remove("cursor-pointer");
      document
        .getElementById(`chairGameChair${i}Button`)
        .setAttribute("onclick", "");
    }
  }
  alreadyPlacedHere.push(chairNum);
  for (let i = 0; i < chairAmount; i++) {
    console.log(isChairGameOver);
    if (
      document
        .getElementById(`chairGameChair${i}Button`)
        .getAttribute("onclick") !== ""
    ) {
      isChairGameOver++;
    }
  }
  if (isChairGameOver === 0) {
    chairGameOver();
  } else isChairGameOver = 0;
}

function chairGameOver() {
  document.getElementById("chairsDiv").classList.add("hidden");
  document.getElementById("chairGameOverDiv").classList.remove("hidden");
  document.getElementById("chairGamePointsForPlayer1").innerHTML = playerOne[1];
  document.getElementById("chairGamePointsForPlayer2").innerHTML = playerTwo[1];
  if (playerOne[1] > playerTwo[1]) {
    document
      .getElementById("chairGamePointsForPlayer1")
      .classList.add("text-green-500");
    document
      .getElementById("chairGamePointsForPlayer2")
      .classList.add("text-red-500");
  } else if (playerTwo[1] < playerOne[1]) {
    document
      .getElementById("chairGamePointsForPlayer2")
      .classList.add("text-green-500");
    document
      .getElementById("chairGamePointsForPlayer1")
      .classList.add("text-red-500");
  } else {
    document
      .getElementById("chairGamePointsForPlayer1")
      .classList.add("text-green-500");
    document
      .getElementById("chairGamePointsForPlayer2")
      .classList.add("text-green-500");
  }
}

function chairGame() {
  chairAmount = document.getElementById("chairGameNumberInput").value;
  let chairsToHTML = "";
  let chairClasses = "w-20";
  let mainDivClasses = "flex m-auto";
  let buttonClasses = "w-20 cursor-pointer";
  for (let i = 0; i < chairAmount; i++) {
    chairs.push(["", Math.floor(Math.random() * 11) + 5]);
    chairsToHTML += `<div class="text-center"><p id="chairGameChair${i}Value">${chairs[chairs.length - 1][1]}</p><button id="chairGameChair${i}Button" class="${buttonClasses}" onclick="moveToChair(${i})"><img src="chair-2-svgrepo-com.svg" class="${chairClasses}" alt="" /></button><p id="chairGameChair${i}"></p></div>`;
  }

  document.getElementById("chairsDiv").innerHTML =
    `<div class="${mainDivClasses}">${chairsToHTML}</div>`;
}

// Második

const circleSize = 10;
const fps = 60;
let circles = [];
let memoryGameCtx;
let memoryGameWaiters = [];
let circleAmount = 3;
let isMemoryGameOver = false;
let canvasElement;
let allXPosS = [];
let allYPosS = [];

function collisionDetection(x, y) {
  for (e of allXPosS) {
    for (let i = x - circleSize; i < x + circleSize + 1; i++) {
      if (e === i) {
        reutrn(false);
      } else {
        for (e of allyPosS) {
          for (let i = y - circleSize; i < y + circleSize + 1; i++) {
            if (e === i) {
              reutrn(false);
            }
          }
        }
      }
    }
  }
  retuurn(true);
}

function initMemoryGame() {
  canvasElement = document.getElementById("memoryGame");
  memoryGameCtx = canvasElement.getContext("2d");
  canvasElement.addEventListener("click", memoryGameClick);
  canvasElement.addEventListener("mousemove", memoryGameMouse);
  circleAmount = document.getElementById("memoryGameDifficulty").value;
  for (let i = 0; i < circleAmount; i++) {
    let x = Math.floor(Math.random() * 485);
    let y = Math.floor(Math.random() * 485);
    while (
      allXPosS.includes(x) ||
      allYPosS.includes(y) ||
      !collisionDetection(x, y)
    ) {
      x = Math.floor(Math.random() * 485);
      y = Math.floor(Math.random() * 485);
      console.log("while");
    }

    circles.push(new memoryGameObject(x, y, i));
    allXPosS.push(x);
    allYPosS.push(y);
  }
}

class memoryGameObject {
  constructor(x, y, number) {
    this.x = x;
    this.y = y;
    this.isVisible = false;
    this.isNumberVisible = true;
    this.number = number;
  }

  async draw() {
    memoryGameCtx.beginPath();
    memoryGameCtx.arc(this.x, this.y, circleSize, 0, 2 * Math.PI);
    memoryGameCtx.lineWidth = 1;
    memoryGameCtx.strokeStyle = "#999999";
    memoryGameCtx.fillText(this.number, this.x, this.y);
    memoryGameCtx.stroke();
  }
}

function memoryGameMouse() {
  var rect = canvasElement.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
}

async function memoryGameClick() {
  var rect = canvasElement.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  for (e of circles) {
    document.getElementById("piros_win").innerHTML =
      e.color == "red" ? "nyertél" : "vesztettél";
    for (i of cards) {
      i.can_hover = false;

      gameover_callback();
      canvasElement.removeEventListener("mousemove", mouse);
      canvasElement.removeEventListener("click", click);
      break;
    }
  }
}

function memoryGameRender() {
  memoryGameCtx.clearRect(0, 0, 500, 500);
  for (e of circles) {
    e.draw();
  }
  const waiter = memoryGameWaiters.slice();
  for (e of waiter) {
    e();
  }
  memoryGameWaiters = [];
  if (!isMemoryGameOver) {
    setTimeout(memoryGameRender, 1000 / fps);
  }
}
