const URLify = (string, length) => {
  const stringArray = string.split(""); // O(n)
  for (var i = 0; i < stringArray.length; i++) { // O(n)
    const char = string[i];
    if(char === ' ') {
      stringArray.splice(i, 1, '%20');
    }
  }
  return stringArray.join(''); // O(n)
};
