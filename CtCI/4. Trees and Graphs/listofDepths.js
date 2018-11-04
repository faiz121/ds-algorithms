const BST = require("../../dataStructures/BinarySearchTree");

var LinkedList = function(value) {
  this.value = value;
  this.next = null;
};

var Queue = require('../../dataStructures/Queue');

var listOfDepths = function(bst) {
  var listOfLists = [];
  var list = null;
  var newNode;
  var q = new Queue();
  var nextq = new Queue();
  var currNode = bst;

  q.enqueue(currNode);
  while (!q.isEmpty()) {
    currNode = q.dequeue();
    newNode = new LinkedList(currNode.value);
    newNode.next = list;
    list = newNode;
    if (currNode.left !== null) {
      nextq.enqueue(currNode.left);
    }
    if (currNode.right !== null) {
      nextq.enqueue(currNode.right);
    }
    if (q.isEmpty()) {
      listOfLists.push(list);
      list = null;
      q = nextq;
      nextq = new Queue();
    }
  }
  return listOfLists;
};

/* TEST */
// 1, 2, 3, 4, 5, 6, 7
var tree = new BST(4);
tree.insert(2);
tree.insert(6);
tree.insert(1);
tree.insert(3);
tree.insert(5);
tree.insert(7);

console.log(listOfDepths(tree));