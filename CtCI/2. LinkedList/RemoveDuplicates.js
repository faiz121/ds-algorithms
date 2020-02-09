const LinkedList = require("../../dataStructures/LinkedList");

LinkedList.prototype.RemoveDuplicatesNoBuffer = function() {
  let current = this.head;
  while(current !== null) {
    let runner = current;
    while(runner.next !== null) {
      if(runner.next.value === current.value) {
        runner.next = runner.next.next
      } else {
        runner = runner.next;
      }
    }
    current = current.next;
  }
}

LinkedList.prototype.RemoveDuplicates = function() {
  let prev = { next: null };
  let current = this.head;
  let set = new Set();
  while(current !== null) {
    if(set.has(current.value)) {
      prev.next = current.next;
    } else {
      set.add(current.value)
      prev = current;
    }
    current = current.next;
  }
}

const myList = new LinkedList(0);
myList.insertAfter(myList.head, 1);
myList.insertAfter(myList.head.next, 3);
myList.insertAfter(myList.head.next, 2);
myList.appendToTail(4);
myList.appendToTail(5);
myList.appendToTail(6);
myList.appendToTail(6);
myList.appendToTail(7);
myList.appendToTail(5);
myList.print(); // "0, 1, 2, 3, 4, 5, 6, 6, 7, 5"


myList.RemoveDuplicates();
myList.print(); // "0, 1, 2, 3, 4, 5, 6, 7"
