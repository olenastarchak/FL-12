const a2 = 2, a3 = 3, a5 = 5, a7 = 7, a8 = 8, a10 = 10, a14 = 14, a29 = 29, a30 = 30, a31 = 31, a48 = 48, a58 = 58,
    daysNum = 365, yearNum = 2019, dayInMs = 86400000;

function convert(...arr) {
  for (let i=0; i<arr.length; i++) {
    arr[i] = typeof arr[i] === 'number' ? String(arr[i]) : Number(arr[i]);
  }
  return arr;
}
convert('1', a2, a3, '4'); // [1, '2', '3', 4]

function executeforEach(arr, func) {
  for (let el of arr) {
    func(el);
  }  
}
executeforEach([1,a2,a3], el => console.log(el * a2)); // logs 2 4 6

function mapArray(arr, func) {
  const arr2 = [];
  executeforEach(arr, el => arr2.push(func(Number(el))));
  return arr2;
}
mapArray([a2, '5', a8], el => el + a3); // returns [5, 8, 11]

function filterArray(arr, func) {
  const arr2 = [];
  executeforEach(arr, el => func(el) ? arr2.push(el) : 0);
  return arr2;
}
filterArray([a2, a5, a8], el => el % a2 === 0); // returns [2, 8]

function flipOver(str) {
  let str2 = '';
  for (let i=str.length-1; i>=0; i--) {
    str2 += str[i];
  }  
  return str2;
}
flipOver('hey world'); // 'dlrow yeh'

function makeListFromRange(arr) {
  const arr2 = [];
  for (let i=arr[0]; i<=arr[1]; i++) {
    arr2.push(i);
  }
  return arr2;
}
makeListFromRange([a2, a7]); // [2, 3, 4, 5, 6, 7]

function getArrayOfKeys(arr, key) {
  const names = [];
  executeforEach(arr, el => names.push(el[key]));
  return names;
}
const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
getArrayOfKeys(actors, 'name'); // ['tommy', 'lee']

function substitute(arr) {
  return mapArray(arr, el => el>=a30 ? el : '*');
}
substitute([a58, a14, a48, a2, a31, a29]); // [58, '*', 48, '*', 31, '*']

function getPastDay(date, days) {
  return new Date(+date-days*dayInMs).getDate();
}
const date = new Date(yearNum, 0, a2);
getPastDay(date, 1); // 1, (1 Jan 2019)
getPastDay(date, a2); // 31, (31 Dec 2018)
getPastDay(date, daysNum); // 2, (2 Jan 2018)

function formatDate(date) {
  const YYYY = date.getFullYear();
  const M = date.getMonth() + 1;
  const d = date.getDate();
  const HH = date.getHours() < a10 ? '0' + date.getHours() : date.getHours();
  const mm = date.getMinutes() < a10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${YYYY}/${M}/${d} ${HH}:${mm}`;
}
formatDate(new Date('6/15/2018 09:15:00')); // "2018/6/15 09:15"
formatDate(new Date()); // "2020/1/7 12:56" // gets current local time