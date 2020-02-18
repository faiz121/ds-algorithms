// directed graph
class Graph {
  constructor() {
    this.nodes = {};
  }

  addEdge(node, edge) {
    if (this.nodes[node] === undefined) {
      return "node does not exist";
    } else if (this.nodes[node][edge]) {
      return `edge ${node}-${edge} already exists`;
    } else {
      this.nodes[node][edge] = true;
    }
  }

  addNode(value) {
    if (this.nodes[value] !== undefined) {
      return `node of value ${value} already exists`;
    } else {
      this.nodes[value] = {};
    }
  }
}

class CheckCyles {
  constructor(graph) {
    this.graph = graph;
    this.white = new Set();
    this.grey = new Set();
    this.black = new Set();
    for (let node in graph) {
      this.white.add(node);
    }
  }
  cycleDetection() {
    return [...this.white].some(node => {
      return this.dfs(node);
    });
  }
  dfs(node) {
    this.moveNode(node, this.white, this.grey);

    for (var neighbor in this.graph[node]) {
      if (this.black.has(neighbor)) {
        continue;
      }
      if (this.grey.has(neighbor)) {
        return true;
      }
      if (this.dfs(neighbor)) return true;
    }
    this.moveNode(node, this.grey, this.black);
    return false;
  }

  moveNode(node, source, dest) {
    source.delete(node);
    dest.add(node);
  }
}
// Testing
const graph = new Graph();
["a", "b", "c", "d"].forEach(node => {
  graph.addNode(node);
});

const dependencies = [["a", "b"], ["b", "c"], ["c", "d"], ["d", "a"]];
dependencies.forEach(d => {
  graph.addEdge(d[0], d[1]);
});

const cycles = new CheckCyles(graph.nodes);
cycles.cycleDetection(); // true
