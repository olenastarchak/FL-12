let makeNumber = string => string.trim().split('').filter(element => !isNaN(element)).join('');
function countNumbers(string) {
  let counts = {};
  makeNumber(string).split('').forEach(function(x) { 
    counts[x] = (counts[x] || 0)+1;
  });
  return counts;
}
countNumbers('erer384jj4444666888jfd123');
// => {'1': 1, '2': 1, '3': 2, '4': 5, '6': 3, '8': 4}
countNumbers('jdjjka000466588kkkfs662555');
// => {'0': 3, '2': 1, '4': 1, '5': 4, '6': 4, '8': 2}
countNumbers(''); // => {}