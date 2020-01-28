const rootNode = document.getElementById('root');


const theMainPage = document.createElement('div');
rootNode.appendChild(theMainPage);
const addNewSetPage = document.createElement('div');
rootNode.appendChild(addNewSetPage);
const modifySetPage = document.createElement('div');
rootNode.appendChild(modifySetPage);

window.addEventListener('hashchange', () => {
  hideAllPages()
  switch (location.hash) {
    case '#':
      showHomePage();
      break;
    case '#/add':
      showAddSetPage();
      break;
    default:
      showHomePage();      
  }
}, false);

const hideAllPages = () => {
  theMainPage.style.display = 'none';
  addNewSetPage.style.display = 'none';
  modifySetPage.style.display = 'none';
}

const showHomePage = () => {
  theMainPage.style.display = 'block';
  showMySets();
}

const showAddSetPage = () => {
  addNewSetPage.style.display = 'block';
}

//main page
const header = document.createElement('h1');
theMainPage.appendChild(header);
header.innerHTML = 'Simple TODO List';

const link = document.createElement('a');
theMainPage.appendChild(link);
link.href = '#/add';

const button = document.createElement('button');
link.appendChild(button);
button.innerHTML = 'Add new';

const emptyList = document.createElement('p');
theMainPage.appendChild(emptyList);

const listName = document.createElement('p');
emptyList.id = 'empty';
emptyList.appendChild(listName);


//second page
const header2 = document.createElement('h1');
addNewSetPage.appendChild(header2);
header2.innerHTML = 'Add smth here';

const inputName = document.createElement('input');
addNewSetPage.appendChild(inputName);
inputName.id = 'inputField';
inputName.placeholder = 'Enter name';

const addTermsButton = document.createElement('button');
addNewSetPage.appendChild(addTermsButton);
addTermsButton.innerHTML = 'Add terms';
addTermsButton.addEventListener('click', multipleInputs);

const linkSave = document.createElement('a');
addNewSetPage.appendChild(linkSave);
linkSave.href = '#';

const saveButton = document.createElement('button');
linkSave.appendChild(saveButton);
saveButton.innerHTML = 'Save changes';

const linkCanc = document.createElement('a');
addNewSetPage.appendChild(linkCanc);
linkCanc.href = '#';

const cancelButton = document.createElement('button');
linkCanc.appendChild(cancelButton);
cancelButton.innerHTML = 'Cancel';

function multipleInputs() {
  const termContainer = document.createElement('div');
  termContainer.classList.add('container');
  addNewSetPage.appendChild(termContainer);

  const inputTerm = document.createElement('input');
  termContainer.appendChild(inputTerm);
  inputTerm.placeholder = 'Enter term';

  const inputDefin = document.createElement('input');
  termContainer.appendChild(inputDefin);
  inputDefin.placeholder = 'Enter definition';

  const removeButton = document.createElement('button');
  termContainer.appendChild(removeButton);
  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', function(){
    termContainer.remove();
    })

  cancelButton.addEventListener('click', function(){
    termContainer.remove();
    })
}

//add items
saveButton.addEventListener('click', addItems);
let listOfItems = [];
const num0 = 0;

function addItems() {
  let allSets = JSON.parse(localStorage.getItem('sets')) || [];
  allSets.push(document.getElementById('inputField').value);
  localStorage.setItem('sets', JSON.stringify(allSets));
  console.log(document.getElementById('inputField').value)
  console.log(allSets)
  if(inputName.value === '') {
    return false;
  }
  let contain = document.querySelectorAll('.container');
  let items = [];
  for (let el of contain) {
    if (el.children[num0].value === '' || el.children[1].value === '') {
      continue;
    } else {
      items.push(el.children[num0].value, el.children[1].value);
    }
  }
  listOfItems.push(items);
  localStorage.setItem(document.getElementById('inputField').value, JSON.stringify(listOfItems));
  Array.from(document.querySelectorAll('.container')).forEach(x => x.remove());
  document.getElementById('inputField').value = '';
}

function showMySets() {
  const myData = JSON.parse(localStorage.getItem('sets')) || [];
  const allChilds = document.getElementById('empty');
  Array.from(allChilds.children).forEach(x => x.remove());
  for (let el of myData) {
    const set = JSON.parse(localStorage.getItem(el));
    const newDiv = document.createElement('div');
    newDiv.textContent = el;
    newDiv.classList.add('divSet');
    for (let term of set) {
      const newTerm = document.createElement('div');
      newTerm.textContent = term;
      newTerm.classList.add('termDiv');
      newDiv.append(newTerm);
    }
    allChilds.append(newDiv);
  } 
}

hideAllPages();
showHomePage();