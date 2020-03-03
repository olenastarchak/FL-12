$.fn.todolist = () => {
  const list = $(".list");
  const input = $("#add-input");
  const add = $("#add-submit");

  const todos = [
    {
      text: "Buy milk",
      done: false
    },
    {
      text: "Play with dog",
      done: true
    }
  ];

  let items;
  if (getFromLocal("myStorage").length === 0) {
    items = todos;
  } else {
    items = getFromLocal("myStorage");
  }
  loadList(items);

  add.click(function(e) {
    e.preventDefault();
    if (input.val().trim()) {
      items.push({
        text: input.val(),
        done: false
      });
    }
    input.val("");
    loadList(items);
    storeData("myStorage", items);
  });

  function loadList(items) {
    $("li").remove();
    for (let i = 0; i < items.length; i++) {
      if (!items[i].done) {
        $("ul").append(`<li class='item'><span class='item-text'>${items[i].text}</span><button class='item-remove'>Remove</button></li>`);
      } else {
        $("ul").append(`<li class='item'><span class='item-text done'>${items[i].text}</span><button class='item-remove'>Remove</button></li>`);
      }
    }
  }

  function storeData(key, obj) {
    localStorage[key] = JSON.stringify(obj);
  }

  function getFromLocal(key) {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    } else {
      return [];
    }
  }

  list
    .on("click", ".item-remove", function() {
      const index = $(this).parent().index();
      $(this).parent().remove();
      items.splice(index, 1);
      storeData("myStorage", items);
    })
    .on("click", ".item-text", function() {
      $(this).toggleClass("done");
      const thisText = $(this).text();
      const index = items.findIndex(todo => todo.text === thisText);
      if (items[index].done) {
        items[index].done = false;
      } else {
        items[index].done = true;
      }
      storeData("myStorage", items);
    });

  $("#search-submit").click(function(e) {
    e.preventDefault();
    let delay = 100;
    let delayEnd = 200;
    for (let i = 0; i < items.length; i++) {
      if ($("#search-input").val() === items[i].text) {
        setTimeout(() => {
          $($(".item-text")[i]).css("backgroundColor", "lightgreen");
        }, delay);
        delayEnd += 2000;
        setTimeout(function() {
          $($(".item-text")[i]).css("backgroundColor", "white");
        }, delayEnd);
        break;
      } else {
        setTimeout(() => {
          $($(".item-text")[i]).css("background-color", "pink");
        }, delay);
        delayEnd += 65;
        setTimeout(function() {
          $($(".item-text")[i]).css("background-color", "white");
        }, delayEnd);
        delay += 40;
      }
    }
    $("#search-input").val("");
  });
}
$().todolist();