import "./style.css";
// import shipFactory from "./ship";
// import gameboardFactory from "./gameboard";
// import playerFactory from "./player";
import gameFactory from "./game";

const battleshipGame = gameFactory();

while (!battleshipGame.isGameFinished()) {
  battleshipGame.letPlayerTakeTurn();
}

console.log(battleshipGame.getWinner());
