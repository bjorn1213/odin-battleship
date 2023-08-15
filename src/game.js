import shipFactory from "./ship";
import playerFactory from "./player";
import gameboardFactory from "./gameboard";

export default function gameFactory() {
  let player1;
  let player2;
  let players = [player1, player2];
  let currentPlayerIdx = 0;

  function dummyInitialise() {
    const shipPlacements1 = [
      { ship: shipFactory(1), location: [1, 9], orientation: "horizontal" },
      { ship: shipFactory(1), location: [9, 6], orientation: "vertical" },
      { ship: shipFactory(3), location: [4, 4], orientation: "horizontal" },
      { ship: shipFactory(3), location: [6, 9], orientation: "vertical" },
      { ship: shipFactory(5), location: [2, 5], orientation: "vertical" },
      { ship: shipFactory(7), location: [4, 2], orientation: "horizontal" },
    ];

    const shipPlacements2 = [
      { ship: shipFactory(1), location: [1, 9], orientation: "horizontal" },
      { ship: shipFactory(1), location: [9, 6], orientation: "vertical" },
      { ship: shipFactory(3), location: [4, 4], orientation: "horizontal" },
      { ship: shipFactory(3), location: [6, 9], orientation: "vertical" },
      { ship: shipFactory(5), location: [2, 5], orientation: "vertical" },
      { ship: shipFactory(7), location: [4, 2], orientation: "horizontal" },
    ];

    player1 = {
      player: playerFactory(),
      gameboard: gameboardFactory(),
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
      gameboard: gameboardFactory(),
    };

    for (let placement of shipPlacements2) {
      player2.gameboard.placeShip(
        placement.ship,
        placement.location,
        placement.orientation
      );
    }

    players = [player1, player2];
  }

  function toggleCurrentPlayer() {
    currentPlayerIdx = 1 - currentPlayerIdx;
  }

  function isGameFinished() {
    return player1.gameboard.isFinished() || player2.gameboard.isFinished();
  }

  function letPlayerTakeTurn() {
    const activePlayer = players[currentPlayerIdx];
    const nonActivePlayer = players[1 - currentPlayerIdx];
    if (activePlayer.player.isHuman()) {
      console.log("boring");
    } else {
      activePlayer.player.attack(nonActivePlayer.gameboard);
    }

    if (!nonActivePlayer.gameboard.lastAttackWasAHit()) {
      toggleCurrentPlayer();
    }
  }

  function getWinner() {
    let winner;
    if (!isGameFinished()) {
      winner = "Game not yet finished";
    } else {
      winner = player1.gameboard.isFinished()
        ? "Player 2 wins!"
        : "Player 1 winse!";
    }
    return winner;
  }

  dummyInitialise();

  function getGameboard() {
    return players[0].gameboard;
  }

  return { isGameFinished, letPlayerTakeTurn, getWinner, getGameboard };
}
