function sum(hand) {
  let sum = 0;
  let values = hand.map((c) => c.value);
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }
  return sum;
}

export { sum };
