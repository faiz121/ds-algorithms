class Trie {
  constructor(letter = "") {
    this.value = letter;
    this.children = {};
    this.isWord = false;
  }
  add(word, node = this) {
    for (const letter of word) {
      if (node.children[letter]) {
        node = node.children[letter];
      } else {
        const newNode = new Trie(letter);
        node.children[letter] = newNode;
        node = newNode;
      }
    }

    node.isWord = true;
  }
  find(word, node = this) {
    let value = "";

    for (const letter of word) {
      if (node.children[letter]) {
        node = node.children[letter];
        value += letter;
      }
    }
    return value === word ? node : null;
  }
  remove(word = "", node = this) {
    if (!word) return null;

    const chain = [];

    // traverse down trie
    for (const letter of word) {
      if (node.children[letter]) {
        chain.push(node); // we want all nodes accessible in chain so we can move backwards and remove dangling nodes
        node = node.children[letter];
      } else {
        return null; // word is not in trie
      }
    }

    if (Object.keys(node.children).length) {
      // if any children, we should only change isWord flag
      node.isWord = false;
      return node;
    }

    // Zero children in node.
    // continue until we hit a breaking condition
    let child = chain.length ? chain.pop() : null; // whatever node was
    let parent = chain.length ? chain.pop() : null; // if node has parent
    while (true) {
      child && parent && delete parent.children[child.value]; // remove child;

      if (Object.keys(parent.children).length || !chain.length) {
        // if more children or chain is empty, we're done!
        node.isWord = false;
        return node;
      }
      // otherwise, we have no more children for our parent and we should keep deleting nodes
      // our next parent is what we pop from the chain
      // our child is what our parent was.
      child = parent;
      parent = chain.pop();
    }
  }
  findWords(value = "", node = this.find(value), words = []) {
    Object.keys(node.children).forEach(c => {
      const child = node.children[c];
      if (child.isWord) words.push(value + child.value);
      child.findWords(value + child.value, child, words);
    });

    return words;
  }
  hasWord(word) {
    const node = this.find(word);
    return !!node && node.isWord;
  }
}


// Tests
let desc = "";
let actual;
let expected;
let trie;

desc = "should be able to add words to the trie";
trie = new Trie();
trie.add("add");
trie.add("words");
trie.add("please");
assertEqual(trie.hasWord("add"), true, desc);
assertEqual(trie.hasWord("words"), true, desc);
assertEqual(trie.hasWord("please"), true, desc);

desc =
  "should not recognize parts of added words as words if the parts have not been added";
const word = "word";
trie = new Trie();
trie.add(word);
for (const char of word) {
  assertEqual(trie.hasWord(char), false, desc);
}

desc = "should be able to return an array of all the words added";
trie = new Trie();
trie.add("trie");
trie.add("javascript");
trie.add("recursion");
actual = trie.findWords().sort();
expected = ["javascript", "recursion", "trie"];
assertArrayEquals(actual, expected, desc);

desc = "should return words that match a given prefix and have been added";
trie = new Trie();
trie.add("wow");
trie.add("word");
trie.add("wait");
actual = trie.findWords("wo").sort();
expected = ["word", "wow"];
assertArrayEquals(actual, expected, desc);

desc = "should be able to remove words from the trie";
trie = new Trie();
trie.add("one");
trie.add("two");
trie.add("three");
trie.add("forty-two");
actual = trie.findWords().sort();
expected = ["forty-two", "one", "three", "two"];
assertArrayEquals(actual, expected, desc);

trie.remove("forty-two");
actual = trie.findWords().sort();
expected = ["one", "three", "two"];
assertArrayEquals(actual, expected, desc);

desc = "should not remove partial words from the trie";
trie = new Trie();
expected = ["once", "one", "only"];
trie.add("one");
trie.add("once");
trie.add("only");

assertArrayEquals(trie.findWords().sort(), expected, desc);
trie.remove("onl");
assertArrayEquals(trie.findWords().sort(), expected, desc);

function assertArrayEquals(a, b, desc) {
  if (a.sort().join(",") === b.sort().join(",")) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
