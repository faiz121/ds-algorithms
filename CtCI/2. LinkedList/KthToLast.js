const LinkedList = require("../../dataStructures/LinkedList");

const kthToLast = (node, k) => {
  let i = 1;
  let slowRunner = node;
  let fastRunner = node;
  while (i <= k) {
    fastRunner = fastRunner.next;
    i++;
  }
  while (fastRunner.next !== null) {
    fastRunner = fastRunner.next;
    slowRunner = slowRunner.next;
  }
  return slowRunner;
};

const myList = new LinkedList(0);
myList.insertAfter(myList.head, 1);
myList.insertAfter(myList.head.next, 3);
myList.insertAfter(myList.head.next, 2);
myList.appendToTail(4);
myList.appendToTail(5);
myList.appendToTail(6);
myList.appendToTail(7);
myList.print();
console.log(kthToLast(myList.head, 3).value, "4");
console.log(kthToLast(myList.head, 2).value, "5");
console.log(kthToLast(myList.head, 1).value, "6");
