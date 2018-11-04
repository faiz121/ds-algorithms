// visualized BST https://codepen.io/faiz121/pen/wQBoRV?editors=0010
const BinarySearchTree = require("../../dataStructures/BinarySearchTree");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
const minimalTree = (array, start, end) => {
  if (end < start) return null;
  const mid = Math.floor((start + end) / 2);
  const node = new Node(array[mid]);
  node.left = minimalTree(array, start, mid-1);
  node.right = minimalTree(array, mid + 1, end);
  return node;
};


const bst = new BinarySearchTree(null);
const result = [];
const array = [1, 2, 3, 4, 8, 9 , 10, 11, 12];
bst.traverseBreadthFirst.call(minimalTree(array, 0, array.length - 1), (n) => result.push(n.value));
console.log(result.join(', '));




