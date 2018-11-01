const isUnique = str => {
  const uniqueArray = Array(128).fill(false);
  for (var i = 0; i < str.length; i++) {
    const val = str.charCodeAt(i);
    if (uniqueArray[val]) {
      return false;
    }
    uniqueArray[val] = true;
  }
  return true;
};

//or if the input string can be sorted then

var isUniqueWithSort = str => {
  str.split('').sort().join('');
  for (var i = 0; i < str.length; i++) {
    if(str[i] === str[i+1]) {
      return false;
    }
  }
  return true;
};

isUnique("abcd");
