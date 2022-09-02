function shuffle(deck) {
  let cI = deck.length,
    rI;
  while (cI != 0) {
    rI = Math.floor(Math.random() * cI);
    cI--;
    [deck[cI], deck[rI]] = [deck[rI], deck[cI]];
  }
}

export { shuffle };
