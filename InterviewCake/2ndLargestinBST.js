function findLargest(rootNode) {
  var current = rootNode;
  while (current) {
    if (!current.right) return current.value;
    current = current.right;
  }
}
function findSecondLargest(rootNode) {
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error("Tree must have at least 2 nodes");
  }
  var current = rootNode;
  while (current) {
    // case: current is largest and has a left subtree
    // 2nd largest is the largest in that subtree
    if (current.left && !current.right) {
      return findLargest(current.left);
    }
    // case: current is parent of largest, and
    // largest has no children, so
    // current is 2nd largest
    if (current.right && !current.right.left && !current.right.right) {
      return current.value;
    }
    current = current.right;
  }
}
