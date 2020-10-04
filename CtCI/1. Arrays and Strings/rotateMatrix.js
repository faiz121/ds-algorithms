var rotate = function(matrix) {
  let N = matrix.length;
  
  for(let i=0; i<N; i++) {
    for(let j=i; j<N; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  
  for(let i=0; i<N; i++) {
    for(let j=0; j<Math.floor(N/2); j++) {
      let temp = matrix[i][N-1-j];
      matrix[i][N-1-j] = matrix[i][j]
      matrix[i][j] = temp
    }
  }
};
