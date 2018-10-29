function changePossibilitiesRecursion(amountLeft, denominations, currentIndex) {
  currentIndex = currentIndex || 0;
  // base cases:
  // we hit the amount spot on. yes!
  if (amountLeft === 0) return 1;
  // we overshot the amount left (used too many coins)
  if (amountLeft < 0) return 0;
  // we're out of denominations
  if (currentIndex === denominations.length) return 0;
  console.log(
    "checking ways to make " +
      amountLeft +
      " with " +
      denominations.slice(currentIndex)
  );
  // choose a current coin
  var currentCoin = denominations[currentIndex];
  // see how many possibilities we can get
  // for each number of times to use currentCoin
  var numPossibilities = 0;
  while (amountLeft >= 0) {
    numPossibilities += changePossibilitiesTopDown(
      amountLeft,
      denominations,
      currentIndex + 1
    );
    amountLeft -= currentCoin;
  }
  return numPossibilities;
}

function changePossibilities(amount, denominations) {
  // intialize an array of zeros with indices up to amount
  var waysOfDoingNcents = [];
  for (var i = 0; i <= amount; i++) {
    waysOfDoingNcents[i] = 0;
  }
  waysOfDoingNcents[0] = 1;
  denominations.forEach(function(coin) {
    for (var higherAmount = coin; higherAmount <= amount; higherAmount++) {
      var higherAmountRemainder = higherAmount - coin;
      waysOfDoingNcents[higherAmount] +=
        waysOfDoingNcents[higherAmountRemainder];
    }
  });
  return waysOfDoingNcents[amount];
}

console.log(changePossibilities(4, [1, 2, 3]));

// Tests

let desc = "sample input";
let actual = changePossibilities(4, [1, 2, 3]);
let expected = 4;
assertEqual(actual, expected, desc);

desc = "one way to make zero cents";
actual = changePossibilities(0, [1, 2]);
expected = 1;
assertEqual(actual, expected, desc);

desc = "no ways if no coins";
actual = changePossibilities(1, []);
expected = 0;
assertEqual(actual, expected, desc);

desc = "big coin value";
actual = changePossibilities(5, [25, 50]);
expected = 0;
assertEqual(actual, expected, desc);

desc = "big target amount";
actual = changePossibilities(50, [5, 10]);
expected = 6;
assertEqual(actual, expected, desc);

desc = "change for one dollar";
actual = changePossibilities(100, [1, 5, 10, 25, 50]);
expected = 292;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
