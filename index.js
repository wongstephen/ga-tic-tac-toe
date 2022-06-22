const game = document.querySelector("#game");
let playerTracker = 0; // even O odd X
const score = { x: 0, o: 0, tie: 0 };
const xSprite = '<i class="fa-solid fa-xmark"></i>';
const oSprite = '<i class="fa-solid fa-o"></i>';
let trackRound = 0;
const spaceId = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

const winConditions = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["a", "d", "g"],
  ["b", "e", "h"],
  ["c", "f", "i"],
  ["a", "e", "i"],
  ["g", "e", "c"],
];

const createSquare = () => {
  spaceId.forEach((id) => {
    const div = document.createElement("div");
    div.classList.add("square");
    div.setAttribute("id", id);
    div.setAttribute("data-tile", "empty");
    tileAction(div);
    // div.innerText = id; //THIS TELLS YOU WHAT CELL IS LABELED WHAT
    game.appendChild(div);
  });
};

const tileLogic = (event) => {
  console.log(playerTracker);
  if (playerTracker % 2 === 0) {
    event.target.dataset.tile = "markedX";
    event.target.innerHTML = xSprite;
    playerTracker++;
  } else {
    event.target.dataset.tile = "markedO";
    event.target.innerHTML = oSprite;
    playerTracker++;
  }
};

const roundTracker = () => {
  const roundContainer = document.querySelector(".round");
  return (roundContainer.innerHTML = "Round " + trackRound);
};

const nextRound = () => {
  playerTracker = 0;

  //empty squares
  spaceId.forEach((id) => {
    const div = document.getElementById(id);
    div.setAttribute("data-tile", "empty");
    div.innerHTML = "";
    // div.innerText = id; //THIS TELLS YOU WHAT CELL IS LABELED WHAT
  });
  //remove tie or win screen
  const endScreenDom = document.querySelector(".end-screen");
  endScreenDom.style.display = "none";
  //click anywhere
};

const endScreen = (sprite, result = "Winner!") => {
  const endScreenDom = document.querySelector(".end-screen");
  const winnerText = document.querySelector(".winner-text");
  const winnerSprite = document.querySelector(".winner-sprite2");
  const round = document.querySelector(".round");

  round.innerHTML = roundTracker();

  winnerSprite.innerHTML = sprite;
  winnerSprite.classList.add("winSprite");

  winnerText.innerHTML = result;
  endScreenDom.style.display = "flex";

  endScreenDom.addEventListener("click", function () {
    nextRound();
  });
};

const updateScore = () => {
  const xScore = document.getElementById("xScore");
  const yScore = document.getElementById("yScore");
  const tieScore = document.getElementById("tieScore");
  xScore.innerText = score.x;
  yScore.innerText = score.o;
  // tieScore.innerText = score.tie;
};

const winLogic = () => {
  winConditions.forEach((row) => {
    const winArr = row.map((el) => {
      return document.getElementById(el).dataset.tile;
    });
    if (winArr.every((mark) => mark === "markedX")) {
      trackRound++;
      score.x += 1;
      updateScore();
      endScreen(xSprite);
    } else if (winArr.every((mark) => mark === "markedO")) {
      score.o += 1;
      trackRound++;
      updateScore();
      endScreen(oSprite);
    } else if (playerTracker === 9) {
      console.log(score.tie);
      // score.tie += 1;
      // updateScore();
      endScreen("TIE!", null);
    }
  });
};

const tileAction = (event) => {
  const checkTile = (event) => {
    // console.log(event.target);
    return event.target.dataset.tile === "empty" && true;
  };
  event.addEventListener("click", function (event) {
    if (checkTile(event)) {
      tileLogic(event);
      winLogic();
    } else {
      const error = document.querySelector(".error");
      error.style.display = "flex";
      setTimeout(function () {
        error.style.display = "none";
      }, 3000);
    }
  });
};

//Game reset
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", function () {
  Object.keys(score).forEach((e) => {
    console.log((score[e] = 0));
  });
  updateScore();
});

(function () {
  createSquare();
})();
