/*
BINARY SEARCH TREES

Abstract data type
A binary search tree is a tree with the additional constraints:
- each node has only two child nodes (node.left and node.right)
- all the values in the left subtree of a node are less than or equal to the value of the node
- all the values in the right subtree of a node are greater than the value of the node

*** Operations:

bsTree.insert(value)
=> bsTree (return for chaining purposes)
Insert value into correct position within tree

bsTree.contains(value)
=> true/false
Return true if value is in tree, false if not

bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.isValid()
=> returns true if BST is a valid BST otherwise returns false. This method is useful for checking your other methods.

bsTree.removeNode(value)
=> node
Remove node from tree.

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/
class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  // O(logn);
  insert(value) {
    if (value <= this.value) {
      if (this.left) this.left.insert(value);
      else this.left = new BinarySearchTree(value);
    } else {
      if (this.right) this.right.insert(value);
      else this.right = new BinarySearchTree(value);
    }
    return this;
  }
  // O(logn);
  contains(value) {
    if (this.value === value) return true;
    if (value < this.value) !!this.left && this.left.contains(value);
    if (value > this.value) !!this.right && this.right.contains(value);
    return false;
  }
  // O(n)
  traverseDepthFirst_inOrder(fn) {
    if (!this.left && !this.right) return fn(this);
    if (this.left) this.left.traverseDepthFirst_inOrder(fn);
    fn(this);
    if (this.right) this.right.traverseDepthFirst_inOrder(fn);
  }
  // O(n)
  traverseDepthFirst_preOrder(fn) {
    fn(this);
    if (this.left) this.left.traverseDepthFirst_inOrder(fn);
    if (this.right) this.right.traverseDepthFirst_inOrder(fn);
  }
  // O(n)
  traverseDepthFirst_postOrder(fn) {
    if (this.left) this.left.traverseDepthFirst_inOrder(fn);
    if (this.right) this.right.traverseDepthFirst_inOrder(fn);
    fn(this);
  }
  // O(n)
  traverseBreadthFirst(fn) {
    const queue = [this];
    while (queue.length) {
      const node = queue.shift();
      fn(node);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  // O(n)
  checkIfFull() {
    var result = true;
    this.traverseBreadthFirst(function(node) {
      if (!node.left && node.right) result = false;
      if (!node.right && node.left) result = false;
    });
    return result;
  }
  // O(n)
  checkIfBalanced() {
    var checkHeights = node => {
      if (node === null) return -1;

      let leftHeight = checkHeights(node.left);
      if (leftHeight === -Infinity) return -Infinity;
      let rightHeight = checkHeights(node.right);
      if (rightHeight === -Infinity) return -Infinity;

      let heightDiff = leftHeight - rightHeight;
      if (Math.abs(heightDiff) > 1) {
        return -Infinity;
      } else {
        return Math.max(leftHeight, rightHeight) + 1;
      }
    };
    return checkHeights(this) !== -Infinity;
  }
  // O(n)
  isAValidBST(node = this, min = -Infinity, max = +Infinity) {
    if (!node) return true;
    if (node.value <= min || node.value > max) return false;
    return (
      this.isAValidBST(node.left, min, node.value) &&
      this.isAValidBST(node.right, node.value, max)
    );
  }
}

const bsTree = new BinarySearchTree(8);
bsTree
  .insert(5)
  .insert(13)
  .insert(12)
  .insert(14)
  .insert(3)
  .insert(6)
  .insert(2)
  // .insert(1) // add these to make it unbalanced
  // .insert(0)
  .insert(7)
  .insert(11)
  .insert(15);

const result_traverseDepthFirst_inOrder = [];
bsTree.traverseDepthFirst_inOrder(function(node) {
  result_traverseDepthFirst_inOrder.push(node.value);
});

console.log(
  result_traverseDepthFirst_inOrder,
  "should be [2, 3, 5, 6, 7, 8, 11, 12, 13, 14]"
);
console.log("checkIfBalanced ", bsTree.checkIfBalanced());

// console.log("IsAValidBST", bsTree.isAValidBST());
// const result_traverseBreadthFirst = [];

// bsTree.traverseBreadthFirst(function(node) {
//   result_traverseBreadthFirst.push(node.value);
// });

// // bsTree.left.left.value = 10 change a value so its not a valid BST anymore
// console.log("IsAValidBST", bsTree.isAValidBST()); // if you uncomment above, this will fail
// console.log(result_traverseBreadthFirst, "Actual");
// console.log("[8, 5, 13, 3, 6, 12, 14, 1, 7, 11, 15, 0]", "expected");

module.exports = BinarySearchTree;
