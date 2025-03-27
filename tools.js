// Pomodoro Timer Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Pomodoro Timer Variables
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;

  // DOM Elements - Pomodoro
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const startBtn = document.getElementById("start-timer");
  const pauseBtn = document.getElementById("pause-timer");
  const resetBtn = document.getElementById("reset-timer");
  const pomodoroBtn = document.getElementById("pomodoro-mode");
  const shortBreakBtn = document.getElementById("short-break");
  const longBreakBtn = document.getElementById("long-break");

  // Timer Settings
  const POMODORO_TIME = 25;
  const SHORT_BREAK_TIME = 5;
  const LONG_BREAK_TIME = 15;

  // Pomodoro Timer Functions
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;

      timer = setInterval(function () {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer complete
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;

            // Play notification sound or alert
            alert("Tijd is om!");
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }

        updateTimerDisplay();
      }, 1000);
    }
  }

  function pauseTimer() {
    if (isRunning) {
      clearInterval(timer);
      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;

    // Determine which mode is active
    if (pomodoroBtn.classList.contains("active")) {
      minutes = POMODORO_TIME;
    } else if (shortBreakBtn.classList.contains("active")) {
      minutes = SHORT_BREAK_TIME;
    } else {
      minutes = LONG_BREAK_TIME;
    }

    seconds = 0;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function updateTimerDisplay() {
    minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  function setTimerMode(mode) {
    clearInterval(timer);
    isRunning = false;

    // Remove active class from all mode buttons
    pomodoroBtn.classList.remove("active");
    shortBreakBtn.classList.remove("active");
    longBreakBtn.classList.remove("active");

    // Set active class and timer based on mode
    if (mode === "pomodoro") {
      pomodoroBtn.classList.add("active");
      minutes = POMODORO_TIME;
    } else if (mode === "short") {
      shortBreakBtn.classList.add("active");
      minutes = SHORT_BREAK_TIME;
    } else {
      longBreakBtn.classList.add("active");
      minutes = LONG_BREAK_TIME;
    }

    seconds = 0;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  // Event Listeners - Pomodoro
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  pomodoroBtn.addEventListener("click", () => setTimerMode("pomodoro"));
  shortBreakBtn.addEventListener("click", () => setTimerMode("short"));
  longBreakBtn.addEventListener("click", () => setTimerMode("long"));

  // Initialize Timer Display
  updateTimerDisplay();

  // Todo List Functionality
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const todoCount = document.getElementById("todo-count");
  const clearCompletedBtn = document.getElementById("clear-completed");

  // Array to store todos
  let todos = [];

  // Load todos from localStorage if available
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodoList();
  }

  // Add a new todo
  function addTodo(event) {
    event.preventDefault();

    // Get todo text and trim whitespace
    const todoText = todoInput.value.trim();

    // Don't add empty todos
    if (todoText === "") return;

    // Check if we already have 10 todos
    if (todos.length >= 10) {
      alert(
        "Je kunt maximaal 10 taken toevoegen. Verwijder eerst een bestaande taak."
      );
      return;
    }

    // Create new todo object
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    // Add to todos array
    todos.push(todo);

    // Save to localStorage
    saveToLocalStorage();

    // Clear input
    todoInput.value = "";

    // Render updated todo list
    renderTodoList();
  }

  // Toggle todo completion status
  function toggleTodo(id) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    saveToLocalStorage();
    renderTodoList();
  }

  // Delete a todo
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);

    saveToLocalStorage();
    renderTodoList();
  }

  // Clear all completed todos
  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);

    saveToLocalStorage();
    renderTodoList();
  }

  // Save todos to localStorage
  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Render the todo list
  function renderTodoList() {
    // Clear the current list
    todoList.innerHTML = "";

    // Update todo count
    todoCount.textContent = `${todos.length}/10 taken`;

    // Add each todo to the list
    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      if (todo.completed) {
        todoItem.classList.add("completed");
      }

      todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${
                  todo.completed ? "checked" : ""
                }>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-todo">×</button>
            `;

      // Add event listeners
      const checkbox = todoItem.querySelector(".todo-checkbox");
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const deleteBtn = todoItem.querySelector(".delete-todo");
      deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

      todoList.appendChild(todoItem);
    });
  }

  // Event Listeners - Todo List
  todoForm.addEventListener("submit", addTodo);
  clearCompletedBtn.addEventListener("click", clearCompleted);
});
