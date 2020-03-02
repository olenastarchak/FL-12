const rootNode = document.getElementById("root");

const allUsersPage = document.createElement("div");
rootNode.append(allUsersPage);
const editUserPage = document.createElement("div");
rootNode.append(editUserPage);
const allPostsPage = document.createElement("div");
rootNode.append(allPostsPage);

window.addEventListener("hashchange", () => {
    hideAllPages();
    switch (true) {
      case /^#$/.test(location.hash):
        showHomePage();
        break;
      case /^#edit/.test(location.hash):
        showEditPage();
        break;
      case /^#post/.test(location.hash):
        showPostsPage();
        break;
      default:
        showHomePage();
    }
  }, false);

const hideAllPages = () => {
  allUsersPage.style.display = "none";
  editUserPage.style.display = "none";
  allPostsPage.style.display = "none";
};

const showHomePage = () => {
  allUsersPage.style.display = "block";
  renderPage();
};

const showEditPage = () => {
  editUserPage.style.display = "block";
  renderEditPage();
};

const showPostsPage = () => {
  allPostsPage.style.display = "block";
  renderPostsPage();
};

// first page
function renderPage() {
  allUsersPage.innerHTML = "";
  showSpinner();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        const userContainer = document.createElement("div");
        allUsersPage.append(userContainer);
        userContainer.classList.add("user");
        renderProps(user, userContainer);
        const editLink = document.createElement("a");
        editLink.href = `#edit${user.id}`;
        const editButton = document.createElement("button");
        editLink.append(editButton);
        editButton.textContent = "edit";
        const delButton = document.createElement("button");
        delButton.textContent = "delete";
        delButton.addEventListener("click", deleteUser);
        userContainer.append(editLink, delButton);
        addCat(userContainer, userContainer.firstChild);
      });
      hideSpinner();
    });
}

function renderProps(object, target) {
  for (let property in object) {
    const usernode = document.createElement("div");
    target.append(usernode);
    usernode.classList.add("usernode");
    const userprop = document.createElement("div");
    usernode.append(userprop);
    userprop.textContent = `${property}:`;
    const userval = document.createElement("div");
    usernode.append(userval);
    userval.textContent = object[property];
    if (property === "name") {
      usernode.classList.add("name");
      usernode.addEventListener("click", redirect);
      usernode.style.cursor = "pointer";
    }
    if (typeof object[property] === "object" && object[property] !== null) {
      userval.textContent = "";
      renderProps(object[property], userval);
    }
  }
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function deleteUser(e) {
  const user = e.target.parentNode;
  const userId = user.children[1].lastChild.textContent;
  showSpinner();
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(json => {
      console.log(json, `User ${userId} has been deleted`);
      hideSpinner();
    });
}

async function addCat(imgParent, imgSibling) {
  showSpinner();
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await response.json();
  const img = document.createElement("img");
  img.setAttribute("src", data[0].url);
  img.classList.add("img");
  imgParent.insertBefore(img, imgSibling);
  hideSpinner();
}

// second page
function renderEditPage() {
  editUserPage.innerHTML = "";
  showSpinner();
  const userID = location.hash.match(/[\d]+$/)[0];
  fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
    .then(response => response.json())
    .then(user => {
      const userContainer = document.createElement("div");
      editUserPage.append(userContainer);
      userContainer.classList.add("user");
      renderEditProps(user, userContainer);

      const saveLink = document.createElement("a");
      const saveButton = document.createElement("button");
      saveLink.append(saveButton);
      saveButton.textContent = "save";
      saveButton.addEventListener("click", saveChanges);

      const backLink = document.createElement("a");
      backLink.href = "#";
      const backButton = document.createElement("button");
      backLink.append(backButton);
      backButton.textContent = "back";

      userContainer.append(saveLink, backLink);
      hideSpinner();
    });
}

function renderEditProps(object, target) {
  for (let property in object) {
    const usernode = document.createElement("div");
    target.append(usernode);
    usernode.classList.add("usernode");
    const userprop = document.createElement("div");
    usernode.append(userprop);
    userprop.textContent = `${property}:`;
    if (typeof object[property] !== "object") {
      const userval = document.createElement("input");
      usernode.append(userval);
      userval.value = object[property];
    } else if (typeof object[property] === "object" 
        && object[property] !== null) {
      const userval = document.createElement("div");
      usernode.append(userval);
      renderEditProps(object[property], userval);
    }
  }
}

function saveChanges(e) {
  const obj = {};
  const props = e.target.parentNode.parentNode
      .getElementsByClassName("usernode");
  for (let prop of props) {
    if (typeof prop.lastChild.value == "undefined") {
    } else {
      obj[prop.textContent.slice(0, prop.textContent.length - 1)] = 
          prop.getElementsByTagName("input")[0].value;
    }
  }
  showSpinner();
  fetch(`https://jsonplaceholder.typicode.com/users/${obj.id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      hideSpinner();
      location.hash = "#";
    });
}

// third page
function redirect(e) {
  const id = e.currentTarget.previousSibling.lastChild.textContent;
  location.hash = `#posts${id}`;
}

async function renderPostsPage() {
  allPostsPage.innerHTML = "";
  const userID = location.hash.match(/[\d]+$/)[0];
  const backLink = document.createElement("a");
  backLink.href = "#";
  allPostsPage.append(backLink);
  const backButton = document.createElement("button");
  backLink.append(backButton);
  backButton.textContent = "back";
  let urls = [
    `https://jsonplaceholder.typicode.com/users/${userID}/posts`,
    `https://jsonplaceholder.typicode.com/comments`
  ];
  showSpinner();
  let requests = urls.map(url => fetch(url));
  const responses = await Promise.all(requests)
  Promise.all(responses.map(arr => arr.json()))
  .then(arr => {
    arr[0].forEach(post => {
        const header = document.createElement("p");
        allPostsPage.append(header);
        header.textContent = 'POST';
        const postnode = document.createElement("div");
        allPostsPage.append(postnode);
        postnode.classList.add("postnode");
        const postitle = document.createElement("div");
        postitle.textContent = post.title;
        postitle.style.fontWeight = "bold";
        const postext = document.createElement("div");
        postext.textContent = post.body;
        const comheader = document.createElement("p");
        comheader.textContent = 'COMMENTS';
        postnode.append(postitle, postext, comheader);
        arr[1].forEach(comment => {
          if (comment.postId === post.id) {
            const commentnode = document.createElement("div");
            commentnode.classList.add("commentnode");
            postnode.append(commentnode);
            const commentitle = document.createElement("div");
            commentitle.textContent = comment.name;
            commentitle.style.fontWeight = "bold";
            const commentmail = document.createElement("div");
            commentmail.textContent = comment.email;
            commentmail.style.fontStyle = "italic";
            const commentext = document.createElement("div");
            commentext.textContent = comment.body;
            commentnode.append(commentitle, commentmail, commentext);
          }
        })
      });  
    });
    hideSpinner(); 
}



hideAllPages();
showHomePage();