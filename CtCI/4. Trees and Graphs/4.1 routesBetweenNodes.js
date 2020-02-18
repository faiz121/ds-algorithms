function checkRoutes(adjList, start, end) {
  const visited = {};

  if (start === end) return true;

  const q = [start];

  while (q.length) {
    const item = q.shift();
    for (const neighbor of adjList[item]) {
      if (!visited[neighbor]) {
        if (neighbor === end) return true;
        else {
          q.push(neighbor);
        }
      }
    }
    visited[item] = true;
  }
  return false;
}

const adjList = {
  1: [2, 3],
  2: [4, 5],
  3: [],
  4: [6],
  5: [],
  6: [],
  7: []
};

checkRoutes(adjList, 1, 4); // true

checkRoutes(adjList, 1, 6); // true

checkRoutes(adjList, 2, 7); // false
