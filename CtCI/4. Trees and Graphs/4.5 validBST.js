function isAValidBST(node = this, min = -Infinity, max = +Infinity) {
  if (!node) return true;
  if (node.value <= min || node.value > max) return false;
  return (
    this.isAValidBST(node.left, min, node.value) &&
    this.isAValidBST(node.right, node.value, max)
  );
}
