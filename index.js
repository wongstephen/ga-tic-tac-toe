const game = document.querySelector("#game");
let playerTracker = 0; // even O odd X
const score = { x: 0, y: 0 };
const xSprite = '<i class="fa-solid fa-xmark"></i>';
const oSprite = '<i class="fa-solid fa-o"></i>';
let trackRound = 0;

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
  const spaceId = ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach(
    (id) => {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("id", id);
      div.setAttribute("data-tile", "empty");
      tileAction(div);
      // div.innerText = id; //THIS TELLS YOU WHAT CELL IS LABELED WHAT
      game.appendChild(div);
    }
  );
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

const endScreen = (sprite) => {
  const endScreenDom = document.querySelector(".end-screen");
  const div1 = document.createElement("div");
  div1.innerHTML = sprite;
  div1.classList.add("winSprite");
  endScreenDom.appendChild(div1);
  const div2 = document.createElement("div");
  div2.innerHTML = "WINNER!";
  endScreenDom.appendChild(div2);
  endScreenDom.style.display = "flex";
  console.log(endScreenDom);
};

const winLogic = () => {
  winConditions.forEach((row) => {
    const winArr = row.map((el) => {
      return document.getElementById(el).dataset.tile;
    });
    if (winArr.every((mark) => mark === "markedX")) {
      trackRound++;
      endScreen(xSprite);
    } else if (winArr.every((mark) => mark === "markedO")) {
      trackRound++;
      endScreen(oSprite);
    } else if (playerTracker === 9) {
      const endScreenDom = document.querySelector(".end-screen");
      endScreenDom.innerHTML = "TIE!";
      endScreenDom.style.display = "flex";
      console.log(endScreenDom);
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

(function () {
  createSquare();
})();
