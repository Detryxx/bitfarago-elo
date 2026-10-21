let chairs = [];
let currPlayer = true;
let currentNonPlaceables = "";
function canStartChairGame() {
  let playerOneName = document.getElementById("chairGamePlayer1").value;
  let playerTwoName = document.getElementById("chairGamePlayer2").value;
  if (playerOneName !== "" && playerTwoName !== "") {
    chairGame();
    document.getElementById("chairsDiv").classList.remove("hidden");
    document.getElementById("chairGameInit").classList.add("hidden");
  }
}

function moveToChair(chairNum) {
  chairs[chairNum][0] = currPlayer;
  document.getElementById(`chairGameChair${chairNum}`).innerHTML = currPlayer;
  if (currPlayer) {
    currPlayer = false;
  } else {
    currPlayer = true;
  }
  for (let i = chairNum - 1; i < chairNum + 2; i++) {
    console.log(i);
    if (i >= 0) {
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.add("cursor-not-allowed");
      document
        .getElementById(`chairGameChair${i}Button`)
        .classList.remove("cursor-pointer");
      document
        .getElementById(`chairGameChair${i}Button`)
        .setAttribute("onclick", "asd");
    }
  }
}

function chairGame() {
  let chairAmount = document.getElementById("chairGameNumberInput").value;
  let playerOneName = "";
  let playerTwoName = "";
  let chairsToHTML = "";
  let chairClasses = "w-20";
  let mainDivClasses = "flex m-auto";
  let buttonClasses = "w-20 cursor-pointer";
  for (let i = 0; i < chairAmount; i++) {
    chairs.push(["", Math.floor(Math.random() * 11) + 5]);
    chairsToHTML += `<div class="text-center"><button id="chairGameChair${i}Button" class="${buttonClasses}" onclick="moveToChair(${i})"><img src="chair-2-svgrepo-com.svg" class="${chairClasses}" alt="" /></button><p id="chairGameChair${i}"></p></div>`;
  }

  document.getElementById("chairsDiv").innerHTML =
    `<div class="${mainDivClasses}">${chairsToHTML}</div>`;
}
