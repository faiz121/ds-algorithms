const topScores = (unsortedArray, highestScore) => {
  const sortedCount = Array(highestScore + 1).fill(0);

  unsortedArray.forEach(score => {
    sortedCount[score]++;
    // [0,0,0,0,1] score 4 occured 1 time
  })

  const sortedScores = [];
  sortedCount.forEach((count, score) => {
    for(var times = 0; times<count; times++) {
      sortedScores.push(score);
    }
  })
  return sortedScores;
}

console.log(topScores([37, 89, 41, 65, 91, 53], 100));