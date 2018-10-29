class Trie {
  constructor() {
    this.rootNode = {};
  }
  checkPresentAndAdd(word) {
    let currentNode = this.rootNode;
    let newWord = false;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.hasOwnProperty(char)) {
        newWord = true;
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }
    if (!currentNode.hasOwnProperty("$")) {
      newWord = true;
      currentNode["$"] = {};
    }
    return newWord;
  }
}

// Tests

const trie = new Trie();

assertEquals(trie.checkPresentAndAdd("catch"), true, "new word 1");
assertEquals(trie.checkPresentAndAdd("cakes"), true, "new word 2");
assertEquals(trie.checkPresentAndAdd("cake"), true, "prefix of existing word");
assertEquals(trie.checkPresentAndAdd("cake"), false, "word already present");
assertEquals(trie.checkPresentAndAdd("caked"), true, "new word 3");
assertEquals(trie.checkPresentAndAdd("catch"), false, "all words still present");
assertEquals(trie.checkPresentAndAdd(""), true, "empty word");
assertEquals(trie.checkPresentAndAdd(""), false, "empty word present");

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
