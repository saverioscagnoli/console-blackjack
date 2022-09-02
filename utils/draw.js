function draw(deck, hand) {
  let picked = deck[Math.floor(Math.random() * deck.length)];
  deck.splice(deck.indexOf(picked), 1);
  hand.push(picked);
  return picked;
}

export { draw };
