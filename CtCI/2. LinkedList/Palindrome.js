const LinkedList = require("../../dataStructures/LinkedList");
const Stack = require("../../dataStructures/stack");

const isPalindrome = node => {
  const stack = [];
  let slowRunner = node;
  let fastRunner = node.next;
  while (fastRunner && fastRunner.next !== null) {
    stack.push(slowRunner.value);
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }
  slowRunner = slowRunner.next;
  while (slowRunner.next !== null && stack.length > 0) {
    let stackVal = stack.pop();
    if (slowRunner.value !== stackVal) {
      return false;
    }
    slowRunner = slowRunner.next
  }
  return true;
};

const ll = new LinkedList(0);
ll.appendToTail(1);
ll.appendToTail(2);
ll.appendToTail(3);
ll.appendToTail(2);
ll.appendToTail(1);
ll.appendToTail(0);
console.log(ll.print());
console.log(isPalindrome(ll.head), "should be true");
