const LinkedList = require("../../dataStructures/LinkedList");

const deleteMiddleNode = node => {
  if (node.next === null || node === null) return false;
  node.value = node.next.value;
  node.next = node.next.next;
  return true;
};

const myList = new LinkedList(0);
myList.appendToTail(1);
myList.appendToTail(2);
myList.appendToTail(3);
myList.appendToTail(4);
myList.appendToTail(5);
myList.appendToTail(6);
myList.appendToTail(7);
myList.appendToTail(8);
myList.appendToTail(9);
myList.print();
deleteMiddleNode(myList.head.next.next.next);
console.log(myList.print(), "should be \n0, 1, 2, 4, 5, 6, 7, 8, 9");
deleteMiddleNode(myList.head.next.next.next);
console.log(myList.print(), "should be \n0, 1, 2, 5, 6, 7, 8, 9");