import { sum } from "./sum.js";

function getData(pHand, dHand, name, playerTurn = true) {
  let data;
  if (playerTurn) {
    data = `\n${name}${name.endsWith("s") ? "'" : "'s"} hand: ${pHand
      .map((c) => c.str)
      .join(", ")} → sum: ${sum(pHand)}\nDealer's hand: ${
      dHand[0].str
    }, ? → sum: ?\n`;
  } else {
    data = `\n${name}${name.endsWith("s") ? "'" : "'s"} hand: ${pHand
      .map((c) => c.str)
      .join(", ")} → sum: ${sum(pHand)}\nDealer's hand: ${dHand
      .map((c) => c.str)
      .join(", ")} → sum: ${sum(dHand)}\n`;
  }
  return data;
}

export { getData };
