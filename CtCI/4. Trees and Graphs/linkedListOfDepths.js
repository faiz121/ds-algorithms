class Node { 
  constructor(element) { 
    this.element = element; 
    this.next = null
  } 
} 

class LinkedList { 
  constructor() { 
    this.head = null; 
    this.size = 0; 
  } 
  add(element) { 
    var node = new Node(element); 
    var current; 

    // if list is Empty add the 
    // element and make it head 
    if (this.head == null) 
      this.head = node; 
    else { 
      current = this.head; 
      
      while (current.next) { 
        current = current.next; 
      } 

      // add node 
      current.next = node; 
    } 
    this.size++; 
  }

  forEach(cb) { 
    var curr = this.head; 
    while (curr) { 
      cb(curr);
      curr = curr.next; 
    } 
  } 
} 

function listOfDepths(root) {
  const result = [];

  let current = new LinkedList();

  if(root !== null) {
    current.add(root)
  }
  
  while(current.size > 0) {
    result.push(current);

    let parents = current;
    current = new LinkedList();

    parents.forEach(node => {
      if(node.element.left) current.add(node.element.left)
      if(node.element.right) current.add(node.element.right)
    })
  }
  return result;
}