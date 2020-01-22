const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function recur(currentNode, rootNode) {
  for (let el of currentNode) {
    let container = document.createElement('div');
    let n = document.createElement('div');
    let i = document.createElement('i');
    container.classList.add('hideChildren');
    i.classList.add('material-icons');
    n.classList.add('highlight');
    n.textContent = el.title;
    i.textContent = el.folder ? 'folder' : 'insert_drive_file';
    if (i.textContent === 'insert_drive_file') {
      i.classList.add('grey');
    }
    container.append(i, n);
    rootNode.append(container);
    container.classList.add('node');
    container.addEventListener('click', showHidden);
    if (el.folder) {
      if (el.children) {
        recur(el.children, container);
      } else {
        let container2 = document.createElement('div');
        let n = document.createElement('div');
        n.textContent = 'Folder is empty';
        n.classList.add('highlight2');
        container2.append(n);
        container2.classList.add('node');
        container2.addEventListener('click', showHidden);
        container.append(container2);
      }
    }
  }
}

function showHidden(e) {
  e.stopPropagation();
  e.currentTarget.classList.toggle('hideChildren');
  const icon = e.currentTarget.firstChild;
  if (icon.textContent === 'folder') {
    icon.textContent = 'folder_open';
  } else if (icon.textContent === 'folder_open') {
    icon.textContent = 'folder';
  }
}

recur(structure, rootNode);