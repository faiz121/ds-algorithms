const fibonacciBottomUP = n => {
  if (n < 0) throw new Error("Number should be positive");
  if (n < 2) return n;
  const fib = {};
  for (var k = 0; k <= n; k++) {
    let val;
    if (k <= 2) val = 1;
    else val = fib[k - 1] + fib[k - 2];
    fib[k] = val;
  }
  return fib[n];
};

// Tests

let desc = "zeroth fibonacci";
let actual = fibonacciBottomUP(0);
let expected = 0;
assertEqual(actual, expected, desc);

desc = "first fibonacci";
actual = fibonacciBottomUP(1);
expected = 1;
assertEqual(actual, expected, desc);

desc = "second fibonacci";
actual = fibonacciBottomUP(2);
expected = 1;
assertEqual(actual, expected, desc);

desc = "third fibonacci";
actual = fibonacciBottomUP(3);
expected = 2;
assertEqual(actual, expected, desc);

desc = "fifth fibonacci";
actual = fibonacciBottomUP(5);
expected = 5;
assertEqual(actual, expected, desc);

desc = "tenth fibonacci";
actual = fibonacciBottomUP(10);
expected = 55;
assertEqual(actual, expected, desc);

desc = "negative fibonacci";
const negativeFib = () => fibonacciBottomUP(-1);
assertThrowsError(negativeFib, desc);

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
