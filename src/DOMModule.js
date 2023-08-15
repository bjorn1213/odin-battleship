import gameboardFactory from "./gameboard";

function createMainPage() {
  const root = document.querySelector("body");

  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("gameboard-container");

  root.appendChild(gameBoardContainer);
}

function generateGameboardDOM(gameboard) {
  const gameBoardDom = document.createElement("div");
  gameBoardDom.classList.add("game-board");

  for (let y = 10; y > 0; y--) {
    for (let x = 1; x <= 10; x++) {
      const gameBoardSquare = document.createElement("div");
      gameBoardSquare.classList.add("board-square");

      gameBoardSquare.setAttribute("data", `[${x},${y}]`);

      if (gameboard.hasShip([x, y])) {
        gameBoardSquare.classList.add("ship");
      }

      if (gameboard.coordinateHasBeenAttacked([x, y])) {
        gameBoardSquare.classList.add("hit");
      }
      gameBoardDom.append(gameBoardSquare);
    }
  }

  return gameBoardDom;
}

function dummy(gameboard) {
  createMainPage();
  const gameBoardContainer = document.querySelector(".gameboard-container");
  gameBoardContainer.append(generateGameboardDOM(gameboard));
}

export { createMainPage, generateGameboardDOM, dummy };
