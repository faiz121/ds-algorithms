function checkIfBalanced(node) {
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
  return checkHeights(node) !== -Infinity;
}
