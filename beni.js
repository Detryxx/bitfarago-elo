let chairs = [];
let currPlayer = true;
let currentNonPlaceables = "";
let chairAmount = 0;
let playerOne = ["", 0];
let playerTwo = ["", 0];
let alreadyPlacedHere = [];
let isChairGameOver = false;

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
  for (let i = 0; i < chairAmount; i++) {
    if (
      document
        .getElementById(`chairGameChair${i}Button`)
        .getAttribute(onclick) !== ""
    ) {
      isChairGameOver = false;
    }
  }

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
}

function chairGameOver() {}

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
