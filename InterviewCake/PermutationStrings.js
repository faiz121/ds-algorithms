function permutations(str) {
  var results = {};
  function recurse(word, remainder) {
    if (remainder.length === 0) {
      return (results[word] = true);
    }
    for (var i = 0; i < remainder.length; i++) {
      recurse(
        word + remainder[i],
        remainder.substr(0, i) + remainder.substr(i + 1)
      );
    }
  }
  recurse("", str);
  return Object.keys(results);
}

// Tests

let desc = "empty string";
let input = "";
let actual = new Set(permutations(input));
let expected = new Set([""]);
assert(isSetsEqual(actual, expected), desc);

desc = "one character string";
input = "a";
actual = new Set(permutations(input));
expected = new Set(["a"]);
assert(isSetsEqual(actual, expected), desc);

desc = "two character string";
input = "ab";
actual = new Set(permutations(input));
expected = new Set(["ab", "ba"]);
assert(isSetsEqual(actual, expected), desc);

desc = "three character string";
input = "abc";
actual = new Set(permutations(input));
expected = new Set(["abc", "acb", "bac", "bca", "cab", "cba"]);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false;
  }
  for (let a of as) {
    if (!bs.has(a)) return false;
  }
  return true;
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL`);
  }
}
