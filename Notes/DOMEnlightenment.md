## DOM Enlightenment Notes

### Chapter 1

#### 1.1 DOM
HTML code when parsed by a browser creates a document that contains nodes structrured in a tree format (i.e. DOM).
**The purpose of the DOM is to provide a programatic interface for scripting (removing, adding, replacing, eventing, modifiying) this live document using JavaScript.**

#### 1.2 Node object types
The most common types of nodes

* DOCUMENT_NODE (e.g. `window.document`)
* ELEMENT_NODE - Code 1 (`<body>, <a>, <p>, <script>, <style>, <html>, <h1> etc...`)
* ATTRIBUTE_NODE (e.g. `class="funEdges"`)
* TEXT_NODE (e.g. text characters in an html document including carriage returns and white space)
* DOCUMENT_FRAGMENT_NODE (e.g. `document.createDocumentFragment()`)
* DOCUMENT_TYPE_NODE (e.g. `<!DOCTYPE html>`)

Its important not only to remember that all nodes types inherit from Node but that the chain of inheritance can be long

#### 1.4 Properties and methods for working nodes

All node objects (e.g Element, Attr, Text etc...) inherit properties and methods from a primary Node object. These properties and methods are the baseline values and functions for manipulating, inspecting, and traversing the DOM.

Below I list out the most common Node properties and methods inherited by all node objects including the relevant inherited properties for working with nodes from sub-node interfaces.

**Node Properties:**
*  childNodes
*  firstChild
*  lastChild
*  nextSibling
*  nodeName
*  nodeType
*  nodeValue
*  parentNode
*  previousSibling

**Node Methods:**
* appendChild()
* cloneNode()
* compareDocumentPosition()
* contains()
* hasChildNodes()
* insertBefore()
* isEqualNode()
* removeChild()
* replaceChild()

**Document Methods:**
* document.createElement()
* document.createTextNode()

**HTML * Element Properties:**
* innerHTML
* outerHTML
* textContent
* innerText
* outerText
* firstElementChild
* lastElementChild
* nextElementChild
* previousElementChild
* children

**HTML element Methods:**
* insertAdjacentHTML()
  
#### 1.5 Identifying the type and name of a node

Every node has a nodeType and nodeName property that is inherited from Node. For example Text nodes have a nodeType code of 3 and nodeName value of '#text'. As previously mentioned the numeric value 3 is a numeric code representing the type of underlying object the node represents (i.e. Node.TEXT_NODE === 3). 

#### 1.7 Creating element and text nodes using JavaScript methods

The following two methods allow us to programatically create Element and Text nodes using JavaScript.

```javascript
document.createElement('div');
document.createTextNode('Hi')
```

#### 1.8 Creating and adding element and text nodes to the DOM using JavaScript strings

The `innerHTML`, `outerHTML`, `textContent` and `insertAdjacentHTML()` properties and methods provide the functionality to create and add nodes to the DOM using JavaScript strings.

`innerHTML` invokes a heavy & expensive HTML parser where as text node generation is trivial thus use the `innerHTML` & friends sparingly

`textContent` gets the content of all elements, including `<script>` and `<style>` elements, `innerText` does not. `innerText` is aware of style and will not return the text of hidden elements, whereas `textContent` will. 

The `textContent`, `innerText`, `outerText` property when being read will return all of the text nodes contained within the selected node. So for example (not a good idea in practice), `document.body.textContent` will get all the text nodes contained in the body element not just the first text node.


```html
<div id="A"></div>
<span id="B"></span>
<div id="C"></div>
<div id="D"></div>
<div id="E"></div>

<script>

//create a strong element and text node and add it to the DOM
document.getElementById('A').innerHTML = '<strong>Hi</strong>'; 

//create a div element and text node to replace <span id="B"></div> (notice span#B is replaced)
document.getElementById('B').outerHTML = '<div id="B" class="new">Whats Shaking</div>'

//create a text node and update the div#C with the text node
document.getElementById('C').textContent = 'dude';


//NON standard extensions below i.e. innerText & outerText

//create a text node and update the div#D with the text node
document.getElementById('D').innerText = 'Keep it';

//create a text node and replace the div#E with the text node (notice div#E is gone)
document.getElementById('E').outerText = 'real!';

console.log(document.body.innerHTML);
/* logs
<div id="A"><strong>Hi</strong></div>
<div id="B" class="new">Whats Shaking</div>
<span id="C">dude</span>
<div id="D">Keep it</div>
real!
*/

</script>
```


#### 1.10 Adding node objects to the DOM using appendChild()& insertBefore()


The `appendChild()` method will append a node(s) to the end of the child node(s) of the node the method is called on.

When it becomes necessary to control the location of insertion beyond appending nodes to the end of a child list of nodes we can use `insertBefore()`.

```html
<ul>
    <li>2</li>
    <li>3</li>
</ul>
<script>
var text1 = document.createTextNode('1');
var li = document.createElement('li');
li.appendChild(text1);
var ul = document.querySelector('ul');
ul.insertBefore(li,ul.firstChild);
</script>

```

#### 1.11 Removing and replacing nodes using removeChild() and replaceChild()

```html
<div id="A">Hi</div>
<div id="B">Dude</div>

<script>

//replace element node
var divA = document.getElementById('A');
var newSpan = document.createElement('span');
newSpan.textContent = 'Howdy';
divA.parentNode.replaceChild(newSpan,divA);

//remove text node
var divB = document.getElementById('B').firstChild;
divB.parentNode.removeChild(divB)
```

#### 1.12 Cloning nodes using cloneNode()

Using the cloneNode() method its possible to duplicate a single node or a node and all its children nodes. To clone a node and all of its children nodes you pass the cloneNode() method a parameter of of true. When cloning an Element node all attributes and values are also cloned. In fact, only attributes are copied! Everything else you can add (e.g. event handlers) to a DOM node is lost when cloning.

#### 1.13 Grokking node collections (i.e. Nodelist & HTMLcollection)

When selecting groups of nodes from a tree (cover in chaper 3) or accessing pre-defined sets of nodes, the nodes are either placed in a NodeList (e.g. document.querySelectorAll('*')) or HTMLCollection (e.g. document.scripts). 

#### 1.14 Gettting a list/collection of all immediate child nodes

Using the childNodes property produces an array like list (i.e. NodeList) of the immediate child nodes. The NodeList returned by childNodes only contains immediate child nodes

#### 1.15 Convert a NodeList or HTMLCollection to JavaScript Array

Converting a node list and html collection list to a true JavaScript array can provide a good deal of advantages. For one it gives us the ability to create a snapshot of the list that is not tied to the live DOM considering that `NodeList` and `HTMLCollection` are live lists. Secondly, converting a list to a JavaScript array gives access to the methods provided by the Array object (e.g. forEach, pop, map, reduce etc...).

```javascript
Array.prototype.slice.call(document.querySelectorAll('a'))
// or
Array.from(document.querySelectorAll('a'));
```

#### 1.16 Traversing nodes in the DOM

From a node reference (i.e. document.querySelector('ul')) its possible to get a different node reference by traversing the DOM using the following properties:

parentNode
firstChild
lastChild
nextSibling
previousSibling

We can traverse over just the Element Nodes using the properties

firstElementChild
lastElementChild
nextElementChild
previousElementChild
children

The childElementCount is used for calculating the number of child elements a node contains.

#### 1.17 Verify a node position in the DOM tree with contains() & compareDocumentPosition()

```javascript
var inside = document.querySelector('html').contains(document.querySelector('body'));

```

#### 1.18 How to determine if two nodes are identical

Two nodes are equal if and only if the following conditions are satisfied:
* The two nodes are of the same type.
* nodeName, nodeValue ..etc are identical
* Attributes are equal
* childNodes are equal

Calling the `.isEqualNode()` method on a node in the DOM will ask if that node is equal to the node that you pass it as a parameter.

`input[0].isEqualNode(input[1])`


### Chapter 2 - Document Nodes

The HTMLDocument constructor (which inherits from document) when instantiated represents specifically a DOCUMENT_NODE (i.e. window.document) in the DOM.

Available properties on document object:
* doctype
* documentElement
* implementation.*
* activeElement
* body
* head
* title
* lastModified
* referrer
* URL
* defaultview
* compatMode
* ownerDocument
* hasFocus()

We can also get generated HTML document information using `document.title`, `document.URL`, `document.referrer`, `document.lastModified`, and `document.compatMode`.

#### 2.4 document child nodes
Document nodes can contain one `DocumentType` node object and one `Element` node object. This should not be a surprise since HTML documents typically contain only one doctype (e.g. `<!DOCTYPE html>`) and one element (e.g. `<html lang="en">`).

#### 2.5 document provides shortcuts to `<!DOCTYPE>, <html lang="en">, <head>, and <body>`

Using the properties listed below we can get a shortcut reference to the following nodes:

* document.doctype refers to <!DOCTYPE> 
* document.documentElement refers to `<html lang="en">`
* document.head refers to `<head>`
* document.body refers to `<body>`

#### 2.7 Get a reference to the focus/active node in the document

Using the `document.activeElement` we can quickly get a reference to the node in the document that is focused/active.

```javascript
document.querySelector('textarea').focus();
console.log(document.activeElement); //logs <textarea>
```

#### 2.8 Determing if the document or any node inside of the document has focus

with `document.hasFocus()` method its possible to know if the user currently is focused on the window that has the HTML document loaded.

#### 2.9 Getting a reference to the Document from an element using ownerDocument

The `ownerDocument` property when called on a node returns a reference to the Document the node is contained within.

### Chapter 3 - Element Nodes

#### 3.1 HTML*Element object overview

Elements in an html document all have a unique nature and as such they all have a unique JavaScript constructor that instantiates the element as a node object in a DOM tree. For example an `<a>` element is created as a DOM node from the HTMLAnchorElement() constructor. Below is a list of unique JavaScript constructors: 

* HTMLHeadElement
* HTMLLinkElement
* HTMLTitleElement
* HTMLBodyElement
* HTMLInputElement
* HTMLTextAreaElement
* HTMLButtonElement
* .... and many more

#### 3.2 HTML*Element object properties and methods (including inherited)

Some of the commonly used properties on HTML*Element are:

* createElement()
* tagName
* children
* getAttribute()
* setAttribute()
* hasAttribute()
* removeAttribute()
* classList()
* dataset
* attributes

#### 3.3 Creating Elements
Element nodes are instantiated for us when a browser interputs an HTML document and a corresponding DOM is built based on the contents of the document. After this fact, its also possible to programaticlly create Element nodes using `createElement()`.
```javascript
var elementNode = document.createElement('textarea');
//HTMLTextAreaElement() constructs <textarea>
document.body.appendChild(elementNode);
```

#### 3.4 Get the tag name of an element

```javascript
console.log(document.querySelector('a').tagName); //logs A
```

#### 3.6 Getting, Setting, & Removing an element's attribute value

The most consistent way to get, set, or remove an elements attribute value is to use the `getAttribute()`, `setAttribute()`, and `removeAttribute()` method.

```javascript
var atts = document.querySelector('a');
atts.setAttribute('href','#');
atts.setAttribute('data-foo','dataFoo');
atts.setAttribute('style','margin:0;');

console.log(atts.getAttribute('href'));
console.log(atts.getAttribute('foo'));

atts.removeAttribute('href');
```
#### 3.7 Verifying an element has a specific attribute
The best way to determine (i.e. boolean) if an element has an attribute is to use the `hasAttribute()`  method.

```javascript
	atts.hasAttribute('href')
  atts.hasAttribute('checked')
```

#### 3.8 Getting a list of class attribute values

Using the classList property available on element nodes we can access a list of class attribute values than a space-delimited string value returned from the `className` property.

```javascript
console.log(elm.classList); 
//big brown bear {0="big", 1="brown", 2="bear", length=3, ...}
console.log(elm.className); //logs 'big brown bear'
```

#### 3.9 Adding & removing sub-values to a class attribute
Using the `classList.add()` and `classList.remove()` methods its extremely simple to edit the value of a class attribute. 

```javascript
var elm = document.querySelector('div');

elm.classList.add('cat');
elm.classList.remove('dog');
```

#### 3.10 Toggling a class attribute value

Using the `classList.toggle()` method we can toggle a sub-value of the class attribute. This allows us to add a value if its missing or remove a value if its already added. 

```javascript
elm.classList.toggle('visible');
```

#### 3.11 Determining if a class attribute value contains a specific value

```javascript
console.log(elm.classList.contains('brown')); //logs true
```

#### 3.12 Getting & Setting data-* attributes

The dataset property of a element node provides an object containing all of the attributes of an element that starts with data-*.

```html
<div data-foo="foo" data-bar="bar"></div>​
<script>
var elm = document.querySelector('div');
//get
console.log(elm.dataset.foo); //logs 'foo'
//set
elm.dataset.goo = 'goo';
</script>
```

### Chapter 4 - Element Node Selecting

#### 4.1 Selecting a specific element node

The most common methods for getting a reference to a single element node are:

* querySelector()
* getElementById()

```javascript
document.querySelector('li') // selects the first li element
document.getElementById('last') // selects the element 
// with id "last"
```

#### 4.2 Selecting/creating a list (aka NodeList) of element nodes

The most common methods for selecting/creating a list of nodes in an HTML document are:

* querySelectorAll()
* getElementsByTagName()
* getElementsByClassName()

```javascript
console.log(document.querySelectorAll('li'));
console.log(document.getElementsByTagName('li'));
console.log(document.getElementsByClassName('liClass'));
```

If its not clear the methods used in the code example above do not select a specific element, but instead creates a list (aka NodeLists) of elements that you can select from.

NodeLists created from getElementsByTagName() and getElementsByClassName() are considered live are will always reflect the state of the document even if the document is updated after the list is created/selected.

The querySelectorAll() method does not return a live list of elements. Meaning that the list created from querySelectorAll() is a snap shot of the document at the time it was created and is not reflective of the document as it changes. The list is static not live.

#### 4.3 Selecting all immediate child element nodes

Using the children property we can get a list of all the immediate children nodes that are element nodes.

#### 4.4 Contextual element selecting

The methods querySelector(), querySelectorAll(), getElementsByTagName(), and getElementsByClassName typically accessed from the document object are also defined on element nodes.

```javascript
var div = document.querySelector('div');
console.log(div.querySelector('ul'));
console.log(div.querySelectorAll('li'));
console.log(div.getElementsByTagName('li'));
console.log(div.getElementsByClassName('liClass'));
```

#### 4.5 Pre-configured selections/lists of element nodes

* document.all - all elements in HTML document
* document.forms - all `<form>` elements in HTML document
* document.images - all `<img>` elements in HTML document

#### 4.6 Verify an element will be selected using matches()

```html
<ul id="birds">
  <li>Orange-winged parrot</li>
  <li class="endangered">Philippine eagle</li>
  <li>Great white pelican</li>
</ul>

<script type="text/javascript">
  var birds = document.getElementsByTagName('li');

  for (var i = 0; i < birds.length; i++) {
    if (birds[i].matches('.endangered')) {
      console.log(birds[i].textContent); // Philippine eagle
    }
  }
</script>
```
