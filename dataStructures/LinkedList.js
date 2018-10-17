/*

LINKED LIST

Comprised of nodes that represent a sequence.
Each node is composed of data and a reference/link to the next node.


*** Operations:

** Part 1

myList.forEach(callbackFn)
invoke callback function with the value of each node

myList.print()
=> string with all values in list (ex: '0, 1, 2, 3')

myList.insertAfter(refNode, value)
=> new node
insert new node associated with value passed in after refNode

myList.removeAfter(refNode)
=> removed node
remove node after the refNode

myList.insertHead(value)
=> new head
insert new head node at the beginning of the list with the value passed in

myList.removeHead()
=> removed head node
remove the head node of the linked list

myList.findNode(value)
=> first node that has a value matching what was passed in


* Optimization:
Say we have a linked list that has 100 items and we want to add an item to the very end. How would you do that with your current implementation? How can you modify the data structure to add an item to the end in constant time?

myList.appendToTail(value)
=> new tail node
add a new tail node at the end of the list with the associated value passed in

myList.removeTail()
=> removed tail node
remove the tail node from the list


** Part 2

Now let's think about creating insertBefore and removeBefore methods for the nodes in our list. Can you think of an efficient way to do so?

Think about time complexity. What would it be for your current implementation of a linked list?

How can we modify our data structures (Node and Linked List classes) so that we can make these O(1) operations?

Once you've come up with a plan, implement the following methods.

myList.insertBefore(refNode, value)
=> new node inserted
insert new node with associated value before refNode

myList.removeBefore(refNode)
=> removed node
remove node before the refNode passed in


*** Additional Exercises:

Implement a circularly linked list:
https://en.wikipedia.org/wiki/Linked_list#Circularly_linked_list

Reimplement stack and queue data structures using linked lists.


 */


// PART 1

function Node(value) {
    this.next = null;
    this.value = value;
  }
  
  function LinkedList(headValue) {
    if (headValue === undefined) console.log('Must provide value for first node');
    this.head = new Node(headValue);
    this.tail = this.head;
  }
  
  LinkedList.prototype.forEach = function(callback) {
    let currentNode = this.head;
    while(currentNode) {
      callback(currentNode.value);
      currentNode = currentNode.next;
    }
  };
  // Time complexity: O(n)
  
  LinkedList.prototype.print = function() {
    let result = [];
    this.forEach((value) => {
      result.push(value);
    })
    return result.join(', ');
  };
  // Time complexity: O(n)
  
  LinkedList.prototype.insertAfter = function(node, value) {
    const oldNext = node.next;
    const newNext = new Node(value);
    node.next = newNext;
    newNext.next = oldNext;
    if(this.tail === node) this.tail = newNext;
    return newNext;
  };
  // Time complexity:
  
  LinkedList.prototype.removeAfter = function(node) {
    const removedNode = node.next; // to be removed
    if(!removedNode) return 'nothing to remove';
    const newNext = removedNode.next;
    node.next = newNext;
    removedNode.next = null;
    if(this.tail === removedNode) this.tail = node;
    return removedNode;
  };
  // Time complexity:
  
  LinkedList.prototype.insertHead = function(value) {
    var newHead = new Node(value);
    var oldHead = this.head;
    this.head = newHead;
    newHead.next = oldHead;
    return this.head;
  };
  // Time complexity:
  
  LinkedList.prototype.removeHead = function() {
    var oldHead = this.head;
    var newHead = oldHead.next;
    this.head = newHead;
    oldHead.next = null;
    return oldHead;
  }
  
  LinkedList.prototype.findNode = function(value) {
    let currentNode = this.head;
    while(currentNode) {
      if (currentNode.value === value) return currentNode;
      currentNode = currentNode.next;
    }
    return `No node with ${value} was found`;
  };
  // Time complexity:
  
  LinkedList.prototype.appendToTail = function(value) {
    var newTail = new Node(value);
    this.tail.next = newTail;
    this.tail = newTail;
    return newTail;
  };
  // Time complexity:
  
  
  // PART 2:
  
  LinkedList.prototype.insertBefore = function(node, value) {
    // implement me...
  };
  // Time complexity:
  
  LinkedList.prototype.removeBefore = function(node) {
    // implement me...
  };
  // Time complexity:
  
  
  
  /*
  *** Exercises:
  
  1. Implement a stack using a linked list.
  
  2. Implement a queue using a linked list.
  
  3. Write a method that remove duplicates from an unsorted linked list. What is the time complexity? Re-implement the method without using any additional storage structure (constant space complexity). What is the time complexity?
  
  4. Reverse a linked list. Do not use any additional storage structures.
  
  5. Find the kth to last element of a singly linked list.
  
  6. Detect if a linked list has a loop.
  
  7. Check if a linked list is a palindrome.
  
  8. Given two linked lists that represent numbers, return a linked list that represents the sum of those numbers:
    4 2 5        (4 -> 2 -> 5)
  + 7 3 1        (7 -> 3 -> 1)
  --------
  1 1 5 6   (1 -> 1 -> 5 -> 6)
  
   */
  
  
  var myList = new LinkedList(0);
  
  console.log(myList.print(), 'should be 0');
  console.log(myList.insertAfter(myList.head, 1), 'should be 1');
  console.log(myList.print(), 'should be 0, 1');
  console.log(myList.insertAfter(myList.head.next, 3), 'should be 3');
  console.log(myList.print(), 'should be 0, 1, 3');
  console.log(myList.insertAfter(myList.head.next, 2), 'should be 2');
  console.log(myList.print(), 'should be 0, 1, 2, 3');
  console.log(myList.removeAfter(myList.head), 'should be 1');
  console.log(myList.print(), 'should be 0, 2, 3');
  console.log(myList.insertHead(-1), 'should be -1');
  console.log(myList.print(), 'should be -1, 0, 2, 3');
  console.log(myList.removeHead(), 'should be -1');
  console.log(myList.print(), 'should be 0, 2, 3');
  console.log(myList.appendToTail(4), 'should be 4');
  console.log(myList.print(), 'should be 0, 2, 3, 4');
  console.log(myList.findNode(0) === myList.head, 'should be true');
  console.log(myList.findNode(3) === myList.head.next.next, 'should be true');
  myList.insertAfter(myList.findNode(2), 2.5);
  console.log(myList.print(), 'should be 0, 2, 2.5, 3, 4');
  myList.removeAfter(myList.findNode(2));
  console.log(myList.print(), 'should be 0, 2, 3, 4');