const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remaining = document.getElementById("remaining");
const progressPercent = document.getElementById("progressPercent");
const progressRing = document.querySelector(".progress-ring");

const filters = document.querySelectorAll(".filter");
const clearCompleted = document.getElementById("clearCompleted");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("focusflowTasks")) || [];
let currentFilter = "all";

document.getElementById("date").textContent =
    new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

function saveTasks() {
    localStorage.setItem("focusflowTasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    emptyState.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {

        const item = document.createElement("div");
        item.className = `task ${task.completed ? "done" : ""}`;

        item.innerHTML = `
            <button class="check">
                ${task.completed ? "✓" : ""}
            </button>

            <span class="task-text"></span>

            <button class="delete">×</button>
        `;

        item.querySelector(".task-text").textContent = task.text;

        item.querySelector(".check").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        item.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(item);
    });

    updateStats();
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) return;

    tasks.unshift({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const left = total - completed;

    const percent =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    totalCount.textContent = total;
    completedCount.textContent = completed;
    remaining.textContent =
        `${left} ${left === 1 ? "task" : "tasks"} remaining`;

    progressPercent.textContent = `${percent}%`;
    progressRing.style.setProperty("--progress", `${percent}%`);
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});

filters.forEach(button => {
    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        document.documentElement.style.setProperty("--bg", "#f4f4f7");
        document.documentElement.style.setProperty("--card", "#ffffff");
        document.documentElement.style.setProperty("--card2", "#eeeeF4");
        document.documentElement.style.setProperty("--text", "#171821");
        themeBtn.textContent = "☾";
    } else {
        document.documentElement.style.setProperty("--bg", "#090a0f");
        document.documentElement.style.setProperty("--card", "#11131b");
        document.documentElement.style.setProperty("--card2", "#171a24");
        document.documentElement.style.setProperty("--text", "#f5f5f7");
        themeBtn.textContent = "☀";
    }
});

renderTasks();