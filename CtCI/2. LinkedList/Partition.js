const LinkedList = require("../../dataStructures/LinkedList");

const partition = (node, pivot) => {
  let head = node;
  let tail = node;

  while (node !== null) {
    let next = node.next;
    if(node.value < pivot) {
      node.next = head;
      head = node;
    } else {
      tail.next = node;
      tail = node;
    }
    node = next;
  }
  tail.next = null;
  return head;
};

const myList = new LinkedList(0);
myList.appendToTail(1);
myList.appendToTail(2);
myList.appendToTail(3);
myList.appendToTail(4);
myList.appendToTail(5);
myList.appendToTail(6);
console.log(myList.print())
let result = [];
myList.forEach.call({ head: partition(myList.head, 3)}, (val) => result.push(val));
console.log(result.join(", "));
