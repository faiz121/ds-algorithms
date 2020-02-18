const BST = require("../../dataStructures/BinarySearchTree"); 
// we don't necessarily need a BST, we just need a tree

const matchTrees = (r1, r2) => {
  // nothing left in subtree
  if (r1 === null && r2 === null) return true;
  // tree is empty, so they don't match
  else if (r1 === null || r2 === null) return false;
  else if (r1.value !== r2.value) return false;
  else return matchTrees(r1.left, r2.left) && matchTrees(r1.right, r2.right);
};

const subTree = (r1, r2) => {
  if (r1 === null) return false;
  else if (r1.value === r2.value && matchTrees(r1, r2)) return true;
  return subTree(r1.left, r2) || subTree(r1.right, r2);
};

const containsTree = (t1, t2) => {
  if (t2 === null) return true;
  return subTree(t1, t2);
};

const tree1 = new BST(8);
tree1
  .insert(5)
  .insert(13)
  .insert(12)
  .insert(14)
  .insert(3)
  .insert(6);

const tree2 = new BST(13);
tree2.insert(12).insert(14);

const tree3 = new BST(13); // not a subtree
tree3.insert(9).insert(15);

console.log(containsTree(tree1, tree2), "should return true");
console.log(containsTree(tree1, tree3), "should return false");
