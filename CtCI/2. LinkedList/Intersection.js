const LinkedList = require("../../dataStructures/LinkedList");
// Steps
// 1. Run through each linkedList to get the lengths and tails
// 2. Compare the tails, if they are different return immediately
// 3. Set two pointers to start of each linkedList (shorter and longer)
// 4. Travers through each list untilthe pointers are the same.

const intersection = (list1, list2) => {
  const { tail: list1Tail, size: list1Size } =  tailAndResult(list1);
  const { tail: list2Tail, size: list2Size } =  tailAndResult(list2);

  if(list1Tail !== list2Tail) return null;
  let longer = list1Size > list2Size ? list1 : list2;
  let shorter = list1Size < list2Size ? list1 : list2;
  longer = getKthNode(longer, Math.abs(list1Size - list2Size));

  while (shorter !== longer) {
    shorter = shorter.next;
    longer = longer.next;
  }
  return longer // or shorter is fine as well, since we found the intersection 

};

const getKthNode = (list, k) => {
  let current = list;
  while(k > 0 && current.next !== null) {
    current = current.next;
    k--;
  }
  return current;
}

const tailAndResult = (list) => {
  if(list === null) return null;
  let current = list;
  let size = 1;
  while(current && current.next !== null) {
    current = current.next;
    size++;
  }
  return { tail: current, size };
}

const l1 = new LinkedList(3);
const l2 = new LinkedList(4);
l2.appendToTail(6);
l1.appendToTail(1);
l1.appendToTail(5);
l1.appendToTail(9);
l1.appendToTail(7);
l1.appendToTail(2);
l1.appendToTail(1);
l2.head.next.next = l1.head.next.next.next.next;

console.log(intersection(l1.head, l2.head).value, "should be 7");
