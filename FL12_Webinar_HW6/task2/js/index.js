const list = $('.list');
const input = $('#add-input');
const add = $('#add-submit');

const todos = [
  {
    text: 'Buy milk',
    done: false
  },
  {
    text: 'Play with dog',
    done: true
  }
];

add.click(function() {
  todos.push({
    text: input.val(),
    done: true
  })
  input.val('');
})

function loadList(todos) {
  $('li').remove();
  for(let i=0; i<todos.length; i++) {
    $('ul').append(`<li class='item'><span class='item-text'>${todos[i].text}</span><button class='item-remove'>Remove</button></li>`)
  }
}

loadList(todos);