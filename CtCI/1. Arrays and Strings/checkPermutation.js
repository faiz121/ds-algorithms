const checkPerm = (str1, str2) => {
  // O(nlogn) because of sorting
  str1.split('').sort().join('');
  str2.split('').sort().join('');
  return str1 === str2;
}

var checkPerm2 = (str1, str2) => {
  // O(n) time and space
  const occurences = {};
  for(var i=0; i<str1.length; i++) {
    const char = str1[i];
    if(occurences[char]) occurences[char]++
    else occurences[char] = 1;
  }
  for(var i=0; i<str2.length; i++) {
    const char = str2[i];
    if(occurences[char]) occurences[char]--;
    else return false;
    if(occurences[char] < 0) return false;
  }
  return true;
}

checkPerm2('abcd', 'dcba'); 