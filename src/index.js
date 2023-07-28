import "./style.css";
import shipFactory from "./ship";
import gameboardFactory from "./gameboard";

const ship = shipFactory(3);
const gameboard = gameboardFactory();

gameboard.placeShip(ship, [
  [1, 1],
  [1, 3],
]);
