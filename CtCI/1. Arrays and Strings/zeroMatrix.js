function zeroMatrix(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  
  let rows = new Array(m).fill(1)
  let cols = new Array(n).fill(1)

  for(let i=0; i<m; i++) {
      for(let j=0; j<n; j++) {
          if(matrix[i][j] === 0) {
              rows[i] = 0;
              cols[j] = 0;
          }
      }
  }

  for(let i=0; i<rows.length; i++) {
      if(rows[i] === 0) {
          for(let j=0; j<n; j++) {
            matrix[i][j] = 0;
          }
      }
  }

  for(let j=0; j<cols.length; j++) {
      if(cols[j] === 0) {
          for(let i=0; i<m; i++) {
              matrix[i][j] = 0
          }
      }
  }
  return matrix
}
