export default function shipFactory(inputLength) {
  const shipLength = inputLength;
  let shipHits = 0;

  function getLength() {
    return shipLength;
  }

  function getHits() {
    return shipHits;
  }

  function hit() {
    shipHits += shipHits === shipLength ? 0 : 1;
  }

  function isSunk() {
    return shipHits === shipLength;
  }

  return { getLength, getHits, hit, isSunk };
}
