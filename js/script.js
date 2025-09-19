const todos = [];
const todoList = document.getElementById("todo-table-body");
const todoInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const addButton = document.getElementById("add-task");
const deleteAllButton = document.getElementById("delete-all");
const filterAllButton = document.getElementById("filter-all");
const filterCompletebutton = document.getElementById("filter-completed");
const filterPendingbutton = document.getElementById("filter-pending");

// Fungsi untuk menambahkan todo
function addTodo() {
  if (validateInput(todoInput.value, dateInput.value)) {
    const todo = {
      id: Date.now(),
      text: todoInput.value,
      date: dateInput.value,
      completed: false,
    };
    todos.push(todo);
    renderTodos();
    todoInput.value = "";
    dateInput.value = "";
    console.log(todos);
  }
}

// Fungsi untuk validasi input
function validateInput(task, date) {
  if (task === "" || date === "") {
    alert("Please fill in both fields.");
    return false;
  }
  return true;
}

// Fungsi untuk menampilkan todo
function renderTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = `<tr>
      <td colspan="4" class="text-center py-4 text-gray-500">No task available.</td>
      </tr>`;
    return;
  }
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    todoList.innerHTML += `
      <tr>
        <td class="border px-4 py-2 ${
          todo.completed ? "line-through text-gray-500" : ""
        }">${todo.text}</td>
        <td class="border px-4 py-2 ${
          todo.completed ? "line-through text-gray-500" : ""
        }">${todo.date}</td>
        <td class="border px-4 py-2">
          <span class="${
            todo.completed ? "text-green-500" : "text-yellow-500"
          }">
            <i class="fa-solid ${
              todo.completed ? "fa-check" : "fa-hourglass-half"
            }"></i> 
            ${todo.completed ? "Completed" : "Pending"}
          </span>
        </td>
        <td class="border px-4 py-2">
        ${
          todo.completed
            ? `<button type="button" onclick="toggleTodoStatus(${todo.id})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
            <i class="fa-solid fa-hourglass-half"></i> Pending
          </button>`
            : `<button type="button" onclick="toggleTodoStatus(${todo.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
            <i class="fa-solid fa-check"></i> Complete
          </button>`
        }
          <button type="button" onclick="deleteTodoById(${
            todo.id
          })" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Fungsi untuk mengubah status todo
function toggleTodoStatus(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// Fungsi untuk menghapus semua todo
function deleteAllTodos() {
  if (todos.length === 0) {
    alert("No tasks to delete.");
    return;
  }

  if (confirm("Are you sure you want to delete all tasks?")) {
    todos.length = 0;
    renderTodos();
  }
}

// Fungsi untuk menghapus todo berdasarkan ID
function deleteTodoById(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (confirm("Are you sure you want to delete this task?")) {
    if (index !== -1) {
      todos.splice(index, 1);
      renderTodos();
    }
  }
}

// Inisialisasi tampilan awal
function filterAll() {
  filterAllButton.innerHTML = '<i class="fa-solid fa-check"></i> All';
  filterCompletebutton.innerHTML = " Completed";
  filterPendingbutton.innerHTML = " Pending";
  renderTodos();
}

// Fungsi untuk memfilter todo yang sudah selesai
function filterComplete() {
  filterCompletebutton.innerHTML =
    '<i class="fa-solid fa-check"></i> Completed';
  filterPendingbutton.innerHTML = " Pending";
  filterAllButton.innerHTML = " All";
  const completedTodos = todos.filter((todo) => todo.completed);
  if (completedTodos.length === 0) {
    todoList.innerHTML =
      "<tr><td colspan='4' class='text-center py-4 text-gray-500'>No completed task.</td></tr>";
    return;
  }
  todoList.innerHTML = "";
  completedTodos.forEach((todo) => {
    todoList.innerHTML += `
        <tr>
          <td class="border px-4 py-2
            line-through text-gray-500">${todo.text}</td>
          <td class="border px-4 py-2 line-through text-gray-500">${todo.date}</td>
          <td class="border px-4 py-2">
            <span class="text-green-500">
              <i class="fa-solid fa-check"></i> 
              Completed
            </span>
          </td>
          <td class="border px-4 py-2">
            <button type="button" onclick="toggleTodoStatus(${todo.id})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
              <i class="fa-solid fa-hourglass-half"></i> Pending
            </button>
            <button type="button" onclick="deleteTodoById(${todo.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </td>
        </tr>
      `;
  });
}

// Fungsi untuk memfilter todo yang belum selesai
function filterPending() {
  filterPendingbutton.innerHTML = '<i class="fa-solid fa-check"></i> Pending';
  filterCompletebutton.innerHTML = " Completed";
  filterAllButton.innerHTML = " All";
  const pendingTodos = todos.filter((todo) => !todo.completed);
  if (pendingTodos.length === 0) {
    todoList.innerHTML =
      "<tr><td colspan='4' class='text-center py-4 text-gray-500'>No pending task.</td></tr>";
    return;
  }
  todoList.innerHTML = "";
  pendingTodos.forEach((todo) => {
    todoList.innerHTML += `
        <tr>
          <td class="border px-4 py-2">${todo.text}</td>
          <td class="border px-4 py-2">${todo.date}</td>
          <td class="border px-4 py-2">
            <span class="text-yellow-500">
              <i class="fa-solid fa-hourglass-half"></i> 
              Pending
            </span>
          </td>
          <td class="border px-4 py-2">
            <button type="button" onclick="toggleTodoStatus(${todo.id})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
              <i class="fa-solid fa-check"></i> Complete
            </button>
            <button type="button" onclick="deleteTodoById(${todo.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </td>
        </tr>
      `;
  });
}
