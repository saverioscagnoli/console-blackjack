let suits = ["♠", "♥", "♦", "♣"];
let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push({ value: values[j], str: ranks[j] + suits[i] });
    }
  }
  return deck;
}

export { createDeck };
