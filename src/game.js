import shipFactory from "./ship";
import playerFactory from "./player";
import gameboardFactory from "./gameboard";

export default function gameFactory() {
  let player1;
  let player2;

  function dummyInitialise() {
    const shipPlacements1 = [
      { ship: shipFactory(1), location: [1, 2], orientation: "horizontal" },
      { ship: shipFactory(1), location: [9, 5], orientation: "vertical" },
      { ship: shipFactory(3), location: [4, 7], orientation: "horizontal" },
      { ship: shipFactory(3), location: [6, 2], orientation: "vertical" },
      { ship: shipFactory(5), location: [2, 6], orientation: "vertical" },
      { ship: shipFactory(7), location: [4, 9], orientation: "horizontal" },
    ];

    const shipPlacements2 = [
      { ship: shipFactory(1), location: [1, 2], orientation: "horizontal" },
      { ship: shipFactory(1), location: [9, 5], orientation: "vertical" },
      { ship: shipFactory(3), location: [4, 7], orientation: "horizontal" },
      { ship: shipFactory(3), location: [6, 2], orientation: "vertical" },
      { ship: shipFactory(5), location: [2, 6], orientation: "vertical" },
      { ship: shipFactory(7), location: [4, 9], orientation: "horizontal" },
    ];

    player1 = {
      player: playerFactory(),
      gameboard: gameFactory(),
    };

    for (let placement of shipPlacements1) {
      player1.gameboard.placeShip(
        placement.ship,
        placement.location,
        placement.orientation
      );
    }

    player2 = {
      player: playerFactory(),
      gameboard: gameFactory(),
    };

    for (let placement of shipPlacements2) {
      player2.gameboard.placeShip(
        placement.ship,
        placement.location,
        placement.orientation
      );
    }
  }

  dummyInitialise();

  return {};
}
