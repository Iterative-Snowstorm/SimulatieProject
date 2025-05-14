// ================= STUDY TOOLS (Pomodoro + Todo) WITH ACHIEVEMENTS =================

document.addEventListener("DOMContentLoaded", function () {
  // -------------------- State for Pomodoro --------------------
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;
  let pomodoroCount = parseInt(localStorage.getItem("pomodoroCount")) || 0;

  // -------------------- State for Achievements --------------------
  let achievements = JSON.parse(localStorage.getItem("achievements")) || {
    pomodorosCompleted: 0,
    todosCompleted: 0,
    relaxationsViewed: 0,
    studyTipsViewed: [],
    badges: [],
  };

  function saveAchievements() {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }

  function checkAchievements() {
    if (
      achievements.todosCompleted >= 5 &&
      !achievements.badges.includes("todo5")
    ) {
      achievements.badges.push("todo5");
      alert("🎉 Achievement unlocked: Completed 5 tasks!");
    }
    if (
      achievements.pomodorosCompleted >= 3 &&
      !achievements.badges.includes("pomodoro3")
    ) {
      achievements.badges.push("pomodoro3");
      alert("🎉 Achievement unlocked: Finished 3 Pomodoros!");
    }
    saveAchievements();
    renderBadges();
  }

  // -------------------- Pomodoro Timer Setup --------------------
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const startBtn = document.getElementById("start-timer");
  const pauseBtn = document.getElementById("pause-timer");
  const resetBtn = document.getElementById("reset-timer");
  const pomodoroBtn = document.getElementById("pomodoro-mode");
  const shortBreakBtn = document.getElementById("short-break");
  const longBreakBtn = document.getElementById("long-break");

  const POMODORO_TIME = 25;
  const SHORT_BREAK_TIME = 5;
  const LONG_BREAK_TIME = 15;

  function updateTimerDisplay() {
    minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;

      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            alert("Tijd is om!");

            if (pomodoroBtn.classList.contains("active")) {
              achievements.pomodorosCompleted++;
              checkAchievements();
            }
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
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;

    if (pomodoroBtn.classList.contains("active")) minutes = POMODORO_TIME;
    else if (shortBreakBtn.classList.contains("active"))
      minutes = SHORT_BREAK_TIME;
    else minutes = LONG_BREAK_TIME;

    seconds = 0;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function setTimerMode(mode) {
    clearInterval(timer);
    isRunning = false;

    pomodoroBtn.classList.remove("active");
    shortBreakBtn.classList.remove("active");
    longBreakBtn.classList.remove("active");

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

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  pomodoroBtn.addEventListener("click", () => setTimerMode("pomodoro"));
  shortBreakBtn.addEventListener("click", () => setTimerMode("short"));
  longBreakBtn.addEventListener("click", () => setTimerMode("long"));

  updateTimerDisplay();

  // -------------------- ToDo List Setup --------------------
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const todoCount = document.getElementById("todo-count");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const resetAllBtn = document.getElementById("reset-all");
  const categorySelect = document.getElementById("todo-category");

  let todosByCategory =
    JSON.parse(localStorage.getItem("todosByCategory")) || {};

  function saveTodos() {
    localStorage.setItem("todosByCategory", JSON.stringify(todosByCategory));
  }

  function addTodo(event) {
    event.preventDefault();
    const text = todoInput.value.trim();
    const category = categorySelect.value;

    if (!text) return;

    const todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    if (!todosByCategory[category]) todosByCategory[category] = [];

    todosByCategory[category].push(todo);
    saveTodos();
    todoInput.value = "";
    renderTodoList();
  }

  function toggleTodo(category, id) {
    todosByCategory[category] = todosByCategory[category].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        // Track completed todos only
        achievements.todosCompleted += todo.completed ? 1 : -1;
        checkAchievements();
      }
      return todo;
    });
    saveTodos();
    renderTodoList();
  }

  function deleteTodo(category, id) {
    todosByCategory[category] = todosByCategory[category].filter(
      (todo) => todo.id !== id
    );
    saveTodos();
    renderTodoList();
  }

  function clearCompleted() {
    for (let category in todosByCategory) {
      todosByCategory[category] = todosByCategory[category].filter(
        (todo) => !todo.completed
      );
    }
    saveTodos();
    renderTodoList();
  }

  function resetAll() {
    if (confirm("Weet je zeker dat je alle taken wilt verwijderen?")) {
      todosByCategory = {};
      achievements.todosCompleted = 0;
      saveTodos();
      renderTodoList();
      checkAchievements();
    }
  }

  function renderTodoList() {
    todoList.innerHTML = "";
    let totalCount = 0;

    for (const category in todosByCategory) {
      if (!todosByCategory[category].length) continue;

      const header = document.createElement("h3");
      header.innerHTML = `<span class="category-label category-${category}">
        ${category.charAt(0).toUpperCase() + category.slice(1)}
      </span>`;
      todoList.appendChild(header);

      todosByCategory[category].forEach((todo) => {
        totalCount++;
        const li = document.createElement("li");
        li.classList.add("todo-item");
        if (todo.completed) li.classList.add("completed");

        li.innerHTML = `
  <input type="checkbox" class="todo-checkbox" ${
    todo.completed ? "checked" : ""
  }>
  <span class="todo-text">${todo.text}</span>
  <button class="delete-todo">×</button>
`;

        li.querySelector(".todo-checkbox").addEventListener("change", () =>
          toggleTodo(category, todo.id)
        );
        li.querySelector(".delete-todo").addEventListener("click", () =>
          deleteTodo(category, todo.id)
        );

        todoList.appendChild(li);
      });
    }

    todoCount.textContent = `${totalCount} taken`;
  }

  todoForm.addEventListener("submit", addTodo);
  clearCompletedBtn.addEventListener("click", clearCompleted);
  resetAllBtn.addEventListener("click", resetAll);

  renderTodoList();
  checkAchievements();

  // -------------------- Render Badges --------------------
  function renderBadges() {
    const badgeContainer = document.getElementById("achievement-badges");
    if (!badgeContainer) return;
    badgeContainer.innerHTML = achievements.badges
      .map((badge) => `<div class="badge">🏆 ${badge}</div>`)
      .join("");
  }
  renderBadges();
});
