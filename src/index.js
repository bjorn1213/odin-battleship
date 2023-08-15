import "./style.css";
// import shipFactory from "./ship";
// import gameboardFactory from "./gameboard";
// import playerFactory from "./player";
import gameFactory from "./game";
import { dummy } from "./DOMModule";

const battleshipGame = gameFactory();

const gameboard = battleshipGame.getGameboard();

gameboard.receiveAttack([6, 9]);
gameboard.receiveAttack([7, 9]);

dummy(gameboard);
