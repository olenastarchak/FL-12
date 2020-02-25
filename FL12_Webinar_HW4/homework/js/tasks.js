// task1
const maxElement = (arr) =>  Math.max(...arr);

const array = [1, 2 ,3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];
console.log(maxElement(array));

// task2
const copyArray = (arr) => [...arr];

const array1 = [1, 2, 3];
const copiedArray = copyArray(array1);
console.log(array1, copiedArray);
console.log(array1 === copiedArray);

// task3
const addUniqueId = (obj) => Object.assign(obj, {id: Symbol()});

console.log(addUniqueId({name: 123}));

// task4
const regroupObject = ({name: firstName, details: {id, age, university}}) => ({
    university, user: {age, firstName, id}});

const oldObj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
console.log(regroupObject(oldObj));

// task5
const findUniqueElements = (items) => [...new Set(items)];

const array2 = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
console.log(findUniqueElements(array2));

// task6
const hideNumber = (phone) => phone.slice(-4).padStart(phone.length, '*');

const phoneNumber = '0123456789';
console.log(hideNumber(phoneNumber));

// task7
const isRequired = () => {throw new Error('Missing property');};
const add = (num1, num2 = isRequired()) => num1 + num2;

console.log(add(1, 3));
console.log(add(1));

// task8
function fetchRepos(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let names = [];
      for (let el of data) {
        names.push(el.name);
      }
      names.sort();
      console.log(names);
    })
}

console.log(fetchRepos('https://jsonplaceholder.typicode.com/users'));

// task9
async function fetchReposAsync(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  let names = [];
  for (let el of data) {
    names.push(el.name);
  }
  names.sort();
  console.log(names);
}
  
console.log(fetchReposAsync('https://jsonplaceholder.typicode.com/users'));