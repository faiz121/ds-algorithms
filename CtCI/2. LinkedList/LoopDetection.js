const LinkedList = require("../../dataStructures/LinkedList");

const loopDetection = node => {
  let slowRunner = node;
  let fastRunner = node && node.next;
  let loopDetected = false;
  while (fastRunner && fastRunner.next) {
    if (slowRunner === fastRunner) {
      loopDetected = true;
      return loopDetected;
    }
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }
  return loopDetected;
};

const myList = new LinkedList(0);
myList.appendToTail(1);
myList.appendToTail(2);
myList.appendToTail(3);
myList.appendToTail(4);
myList.appendToTail(5);
myList.appendToTail(6);
console.log(loopDetection(myList.head), "should be false");
myList.head.next.next.next.next.next = myList.head.next.next; // 5 is connected to 3 forming a loop
console.log(loopDetection(myList.head), "should be true");
