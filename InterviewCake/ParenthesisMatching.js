const ParenMatching = (input, n) => {
  let othersOpen = 0;
  let result = null;
  for (var i = n + 1; i < input.length; i++) {
    const currentChar = input[i];
    if (currentChar === "(") othersOpen += 1;
    if (currentChar === ")") {
      if (!othersOpen) {
        result = i;
        return result;
      } else {
        othersOpen -= 1;
      }
    }
  }
  throw new Error("No matching closer");
};

// Tests

let desc = "all openers then closers";
let actual = ParenMatching("((((()))))", 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = "mixed openers and closers";
actual = ParenMatching("()()((()()))", 5);
expected = 10;
assertEqual(actual, expected, desc);

desc = "no matching closer";
const noCloser = () => ParenMatching("()(()", 2);
assertThrowsError(noCloser, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}
