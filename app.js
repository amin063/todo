const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-todo-btn");
const todosTable = document.querySelector(".todos table tbody");
const complatedTable = document.querySelector(".complated-todos table tbody");
const removeTodosBtn = document.querySelector(".remove-todos-btn");
const removeCompTodosBtn = document.querySelector(".remove-comp-todos")

// LocalStorage

function addTodo() {
  const localKeys = Object.keys(localStorage).sort((a, b) => a - b);
  let lastId = localKeys.length ? localKeys[localKeys.length - 1] : 0;
  const todo = {
    id: ++lastId,
    todo: todoInput.value,
    isCompleted: false,
  };

  localStorage.setItem(todo.id, JSON.stringify(todo));
  todoInput.value = "";
  showTodos();
  console.log(localKeys);
}

function showTodos() {
  const localKeys = Object.keys(localStorage).sort((a, b) => a - b);
  todosTable.innerHTML = ``;
  complatedTable.innerHTML = ``;
  localKeys.forEach((key) => {
    const localValue = JSON.parse(localStorage.getItem(key));
    if (!localValue.isCompleted) {
      todosTable.innerHTML += `  <tr scope="row">
        <td style="width: 80%;">${localValue.todo}</td>
        <td style="width: 10%;"><i class='complate-icon bx bxs-check-square text-success fs-5' data-index="${key}"></i></td>
        <td style="width: 10%;"><i class='remove-todo-icon bx bxs-trash text-primary fs-5' data-index="${key}"></i></td>
    </tr>`;
    } else {
      complatedTable.innerHTML += `  <tr scope="row">
                        <td style="width: 80%;">${localValue.todo}</td>
                        <td style="width: 10%;"><i class='retry-todo-icon bx bx-refresh text-danger fs-5' data-index="${key}"></i></td>
                        <td style="width: 10%;"><i class='remove-todo-icon bx bxs-trash text-primary fs-5' data-index="${key}"></i></td>
                    </tr>`;
    }
  });
  //   <RETRY LISTENER
  const retryTodosIcon = document.querySelectorAll(".retry-todo-icon");
  retryTodosIcon.forEach(icon =>{
    icon.addEventListener("click", (e)=>{
        let index = e.target.getAttribute("data-index");
        retryTodo(index)
    })
  })

  //   RETRY LISTENER>

  // <REMOVE LISTENER
// REMOVE LISTENER
removeTodosBtn.addEventListener("click", () => deleteTodos(false));
removeCompTodosBtn.addEventListener("click", () => deleteTodos(true));

  const removeTodoIcons = document.querySelectorAll(".remove-todo-icon");
  removeTodoIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      deleteTodo(index);
    });
  });
  // REMOVE LISTENER >

  //   <COMPLATE LISTENER
  const complateIcons = document.querySelectorAll(".complate-icon");

  complateIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      addComplateTodo(index);
    });
  });

  //   COMPLATE LISTENER>
}

function retryTodo(key) {
    const todo = JSON.parse(localStorage.getItem(key))
    todo.isCompleted = false;
    localStorage.setItem(key, JSON.stringify(todo))
    showTodos();
}

function deleteTodos(val) {
  const localKeys = Object.keys(localStorage).sort((a, b) => a - b);
  localKeys.forEach((key) => {
    const localValue = JSON.parse(localStorage.getItem(key)); // JSON.parse əlavə et
    if (localValue.isCompleted == Boolean(val)) {
      localStorage.removeItem(key);
    }
  });
  showTodos();
}

function deleteTodo(key) {
  localStorage.removeItem(key);
  showTodos();
}

function addComplateTodo(key) {
  let complateTodo = JSON.parse(localStorage.getItem(key));
  complateTodo.isCompleted = true;
  localStorage.setItem(key, JSON.stringify(complateTodo));
  showTodos();
}
// ADD TODO
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addBtn.addEventListener("click", addTodo);

// SHOW TODOS
showTodos();
