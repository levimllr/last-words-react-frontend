function indexColor(index) {
  let score;
  if (index === 0) {
      score = 'purple';
  } else if (index === 1) {
      score = 'blue';
  } else if (index === 2) {
      score = 'green';
  } else if (index === 3) {
      score = 'gold';
  } else if (index === 4) {
      score = 'orange';
  } else if (index === 5) {
      score = 'red';
  }
  return score;
};

export { indexColor };