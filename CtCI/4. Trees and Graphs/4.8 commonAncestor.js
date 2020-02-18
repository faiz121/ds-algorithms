const BST = require('../../dataStructures/BinarySearchTree');
// Explanation https://www.youtube.com/watch?v=13m9ZCB8gjw
const lca = (root, n1, n2) => {
  if (root === null) return null;
  if (root.value === n1 || root.value === n2) return root.value;

  let leftVal = lca(root.left, n1, n2);
  let rightVal = lca(root.right, n1, n2);
  if(leftVal !== null && rightVal !== null) return root.value;
  if(leftVal === null && rightVal === null) return null;
  return leftVal !== null ? leftVal : rightVal;
};

const bsTree = new BST(8);
bsTree
  .insert(5)
  .insert(13)
  .insert(12)
  .insert(14)
  .insert(3)
  .insert(6)
  .insert(2)
  .insert(7)
  .insert(11)
  .insert(15);

console.log(lca(bsTree, 2, 7), "should be 5");
console.log(lca(bsTree, 3, 12), "should be 8");
console.log(lca(bsTree, 11, 15), "should be 13");