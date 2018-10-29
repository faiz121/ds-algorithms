function Queue(capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._head = 0;
  this._tail = 0;
}

// O(1)
Queue.prototype.enqueue = function(value) {
  if (this.count() < this._capacity) {
    this._storage[this._tail++] = value;
    return this.count();
  }
  return "Max capacity already reached. Remove element before adding a new one.";
};

// O(1)
Queue.prototype.dequeue = function() {
  var element = this._storage[this._head];
  delete this._storage[this._head];
  if (this._head < this._tail) this._head++;
  return element;
};

// O(1)
Queue.prototype.peek = function() {
  return this._storage[this._head];
};

// O(1)
Queue.prototype.count = function() {
  return this._tail - this._head;
};

// O(n)
Queue.prototype.contains = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._storage[i] === value) return true;
  }
  return false;
};

// O(n)
Queue.prototype.until = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._storage[i] === value) return i - this._head + 1;
  }
  return null;
};

// Assume we have an efficient queue implementation, Queue()
// with enqueue and dequeue methods and a size property
function shortestPathBfs(graph, startNode, endNode) {
  if (!graph.hasOwnProperty(startNode)) {
    throw new Error("Start node not in graph!");
  }
  if (!graph.hasOwnProperty(endNode)) {
    throw new Error("End node not in graph!");
  }
  var nodesToVisit = new Queue(50);
  nodesToVisit.enqueue(startNode);
  // keep track of how we got to each node
  // we'll use this to reconstruct the shortest path at the end
  var howWeReachedNodes = {};
  howWeReachedNodes[startNode] = null;
  while (nodesToVisit.count() > 0) {
    var currentNode = nodesToVisit.dequeue();
    // stop when we reach the end node
    if (currentNode === endNode) {
      // somehow reconstruct the path here
      return reconstructPaths(howWeReachedNodes, startNode, endNode);
    }
    graph[currentNode] &&
      graph[currentNode].forEach(function(neighbor) {
        if (!(neighbor in howWeReachedNodes)) {
          // keep track of how we got to this node
          howWeReachedNodes[neighbor] = currentNode;
          nodesToVisit.enqueue(neighbor);
        }
      });
  }
  return null;
}

function reconstructPaths(howWeReachedNodes, startNode, endNode) {
  let currentNode = endNode;
  const result = [];
  while (currentNode !== null) {
    result.push(currentNode);
    currentNode = howWeReachedNodes[currentNode];
  }
  return result.reverse();
}

const graph = {
  Min: ["William", "Jayden", "Omar"],
  William: ["Min", "Noam"],
  Noam: ["Amelia"],
  Jayden: ["Min", "Amelia", "Ren", "Noam"],
  Ren: ["Jayden", "Omar"],
  Amelia: ["Jayden", "Adam", "Miguel"],
  Adam: ["Amelia", "Miguel", "Sofia", "Lucas"],
  Miguel: ["Amelia", "Adam", "Liam", "Nathan"]
};

// console.log(shortestPathBfs(graph, "Min", "Adam"), "Actual");
// console.log("['Min', 'Jayden', 'Amelia', 'Adam']", "Expected");

// tests
let desc = "";
let expected;
let actual;
const getNetwork = () => ({
  a: ["b", "c", "d"],
  b: ["a", "d"],
  c: ["a", "e"],
  d: ["a", "b"],
  e: ["c"],
  f: ["g"],
  g: ["f"]
});
desc = "twoHopPath1Test";
expected = ["a", "c", "e"];
actual = shortestPathBfs(getNetwork(), "a", "e");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "twoHopPath2Test";
expected = ["d", "a", "c"];
actual = shortestPathBfs(getNetwork(), "d", "c");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "oneHopPath1Test";
expected = ["a", "c"];
actual = shortestPathBfs(getNetwork(), "a", "c");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "oneHopPath2Test";
expected = ["f", "g"];
actual = shortestPathBfs(getNetwork(), "f", "g");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "oneHopPath3Test";
expected = ["g", "f"];
actual = shortestPathBfs(getNetwork(), "g", "f");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "zeroHopPath";
expected = ["a"];
actual = shortestPathBfs(getNetwork(), "a", "a");
assertNotNull(actual, desc);
assertArrayEquals(expected, actual, desc);

desc = "noPathTest";
actual = shortestPathBfs(getNetwork(), "a", "f");
assertNull(actual, desc);

desc = "Start Node Not Present Test";
const noStart = () => shortestPathBfs(getNetwork(), "h", "a");
assertThrowsError(noStart, desc);

desc = "End Node Not Present Test";
const noEnd = () => shortestPathBfs(getNetwork(), "a", "h");
assertThrowsError(noEnd, desc);

function assertNotNull(actual, desc) {
  if (actual !== null) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${actual} !== null`);
  }
}

function assertNull(actual, desc) {
	if (actual === null) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${actual} === null`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}

function assertArrayEquals(a, b, desc) {
  if (a.sort().join(",") === b.sort().join(",")) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}