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

  removeEdge(node, edge) {
    if (this.nodes[node] === undefined) {
      return "node does not exist";
    } else {
      delete this.nodes[node][edge];
    }
  }

  removeNode(node) {
    if (this.nodes[node] === undefined) {
      return "node does not exist";
    } else {
      delete this.nodes[node];
      for (var currNode in this.nodes) {
        if (this.nodes[currNode][node] !== undefined) {
          delete this.nodes[currNode][node];
        }
      }
    }
  }

  findNodeWithNoChildren() {
    for (var node in this.nodes) {
      if (Object.keys(this.nodes[node]).length === 0) {
        return node;
      }
    }
    return undefined;
  }
}

var buildOrder = function(projects, dependencies) {
  var graph = new Graph();
  projects.forEach(project => {
    graph.addNode(project);
  });
  dependencies.forEach(dependency => {
    graph.addEdge(dependency[1], dependency[0]);
  });
  var answer = [];
  var currNode = graph.findNodeWithNoChildren();
  while (currNode !== undefined) {
    answer.push(currNode);
    graph.removeNode(currNode);
    currNode = graph.findNodeWithNoChildren();
  }
  if (answer.length === projects.length) {
    return answer;
  } else {
    throw Error;
  }
};

/* TEST */
var projects = ["a", "b", "c", "d", "e", "f"];
var dependencies = [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]];

console.log(buildOrder(projects, dependencies));
