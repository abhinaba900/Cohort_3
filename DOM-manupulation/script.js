/* =========================================================================
   DOM Explorer — Task Manager  ·  script.js
   Pure Vanilla JavaScript. Demonstrates:
     • Dynamic DOM creation/removal (createElement, append, prepend, after,
       replaceWith, remove)
     • Attributes vs Properties (getAttribute/setAttribute/removeAttribute,
       dataset, .value, .checked, .id)
     • Event handling + Event Delegation (one listener on the parent list)
     • Event propagation (bubbling vs capturing)
     • Theme toggle (classList, dataset, toggleAttribute)
     • localStorage persistence (bonus)
   ========================================================================= */

"use strict";

/* ----------------------------------------------------------------------- */
/* State + storage                                                          */
/* ----------------------------------------------------------------------- */

const STORAGE_KEY = "domExplorerTasks";
const THEME_KEY = "domExplorerTheme";

// Single source of truth. Each task: { id, title, category, status }
let tasks = loadTasks();
let nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ----------------------------------------------------------------------- */
/* Cached DOM references                                                    */
/* ----------------------------------------------------------------------- */

const taskForm      = document.getElementById("taskForm");
const taskTitle     = document.getElementById("taskTitle");
const taskCategory  = document.getElementById("taskCategory");
const taskList      = document.getElementById("taskList");
const emptyState    = document.getElementById("emptyState");
const searchInput   = document.getElementById("searchInput");
const filterCategory= document.getElementById("filterCategory");
const clearAllBtn   = document.getElementById("clearAll");

const countTotal    = document.getElementById("countTotal");
const countPending  = document.getElementById("countPending");
const countDone     = document.getElementById("countDone");

/* ======================================================================= */
/* 1. TASK CREATION — createElement / append / prepend                      */
/* ======================================================================= */

/**
 * Build a task card element using createElement().
 * Custom data-* attributes are set with setAttribute()/dataset so the
 * card carries data-id, data-status and data-category (see assignment §2).
 */
function buildTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  // --- Attributes: set custom data-* attributes explicitly ---
  card.setAttribute("data-id", task.id);          // attribute API
  card.setAttribute("data-status", task.status);  // "active" | "completed"
  card.dataset.category = task.category;          // dataset → data-category

  // Checkbox (complete toggle). `.checked` is a PROPERTY (live state).
  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "task-check";
  check.checked = task.status === "completed";    // property, not attribute
  check.dataset.action = "toggle";

  // Body (title + meta)
  const body = document.createElement("div");
  body.className = "task-body";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;                 // textContent avoids HTML injection

  const meta = document.createElement("div");
  meta.className = "task-meta";
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = task.category;
  meta.append(tag, document.createTextNode(` · id #${task.id}`));

  body.append(title, meta);                       // append() — multiple nodes at once

  // Action buttons. data-action lets the delegated listener know what to do.
  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "icon-btn";
  editBtn.dataset.action = "edit";
  editBtn.title = "Edit task";
  editBtn.textContent = "✏️";

  const delBtn = document.createElement("button");
  delBtn.className = "icon-btn";
  delBtn.dataset.action = "delete";
  delBtn.title = "Delete task";
  delBtn.textContent = "🗑️";

  actions.append(editBtn, delBtn);

  card.append(check, body, actions);
  return card;
}

/**
 * Render the list from state. Newest tasks are shown first using prepend().
 * Honors the current search + category filter.
 */
function renderTasks() {
  // Clear current cards (keep the emptyState node out of the way)
  taskList.querySelectorAll(".task-card").forEach((c) => c.remove()); // remove()

  const term = searchInput.value.trim().toLowerCase();
  const cat = filterCategory.value;

  const visible = tasks.filter((t) => {
    const matchesText = t.title.toLowerCase().includes(term);
    const matchesCat = cat === "all" || t.category === cat;
    return matchesText && matchesCat;
  });

  if (visible.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    // prepend() each card so the most recently created appears at the top
    visible.forEach((task) => taskList.prepend(buildTaskCard(task)));
  }

  updateCounters();
  saveTasks();
}

function updateCounters() {
  const done = tasks.filter((t) => t.status === "completed").length;
  countTotal.textContent = tasks.length;
  countDone.textContent = done;
  countPending.textContent = tasks.length - done;
}

// Add Task — form submit (addEventListener)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page refresh so the task appears instantly

  const title = taskTitle.value.trim(); // .value is the PROPERTY (live input)
  if (!title) return;

  tasks.push({
    id: nextId++,
    title,
    category: taskCategory.value,
    status: "active",
  });

  taskForm.reset(); // resets the .value property back toward the default
  renderTasks();
  taskTitle.focus();
});

/* ======================================================================= */
/* 2. ATTRIBUTES vs PROPERTIES — live demonstration                        */
/* ======================================================================= */
/*
   KEY IDEA:
   • An ATTRIBUTE is what's written in the HTML source (the initial/default).
     Read it with getAttribute("value"). It does NOT change as the user types.
   • A PROPERTY is the live, in-memory value on the DOM object.
     Read it with input.value. It updates on every keystroke.
   The demo below prints both so the difference is obvious.
*/
const inspectBtn = document.getElementById("inspectInput");
const demoOutput = document.getElementById("demoOutput");

inspectBtn.addEventListener("click", () => {
  const liveValue = taskTitle.value;                       // PROPERTY (current)
  const attrValue = taskTitle.getAttribute("value");        // ATTRIBUTE (original)

  // setAttribute changes the *attribute*, not necessarily the live property
  // (here they're the id, just to show setAttribute/getAttribute usage).
  const idProp = taskTitle.id;                              // property shortcut
  const idAttr = taskTitle.getAttribute("id");              // attribute lookup

  const report =
`input.value                 → "${liveValue}"   ← PROPERTY (changes as you type)
input.getAttribute("value") → "${attrValue}"   ← ATTRIBUTE (the HTML default)

element.id                  → "${idProp}"
getAttribute("id")          → "${idAttr}"

Notice: typing changes .value but NOT getAttribute("value").`;

  demoOutput.textContent = report;
  console.log("[Attributes vs Properties]\n" + report);
});

/* ======================================================================= */
/* 3 + 5 + 6. EVENT DELEGATION — ONE listener handles all task actions     */
/* ======================================================================= */
/*
   Instead of attaching listeners to every checkbox/edit/delete button, we
   attach a SINGLE click listener to the parent (#taskList). When a click
   bubbles up, we read event.target and its data-action to decide what to do.
   This is Event Delegation — efficient and works for dynamically added cards.
*/
taskList.addEventListener("click", (e) => {
  const actionEl = e.target.closest("[data-action]");
  if (!actionEl) return;

  const card = e.target.closest(".task-card");
  if (!card) return;

  const id = Number(card.dataset.id); // dataset → reads data-id attribute
  const action = actionEl.dataset.action;

  if (action === "toggle")  toggleComplete(id, card);
  if (action === "edit")    editTask(id, card);
  if (action === "delete")  deleteTask(id, card);
});

/* ----- Complete Task: flips data-status attribute ----- */
function toggleComplete(id, card) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.status = task.status === "completed" ? "active" : "completed";
  card.setAttribute("data-status", task.status); // attribute drives CSS styling
  updateCounters();
  saveTasks();
}

/* ----- Delete Task: remove() the node from the DOM ----- */
function deleteTask(id, card) {
  tasks = tasks.filter((t) => t.id !== id);
  card.remove();                 // DOM removal
  if (tasks.length === 0) emptyState.hidden = false;
  updateCounters();
  saveTasks();
}

/* ----- Edit Task: replaceWith() an inline input, then after()/replaceWith() back -----
   Demonstrates replaceWith() and after().
*/
function editTask(id, card) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const titleEl = card.querySelector(".task-title");

  // Create an inline input pre-filled with the current title (property .value)
  const input = document.createElement("input");
  input.className = "edit-input";
  input.value = task.title;

  // replaceWith(): swap the static title node for the editable input
  titleEl.replaceWith(input);
  input.focus();

  const commit = () => {
    const newTitle = input.value.trim() || task.title;
    task.title = newTitle;

    const newTitleEl = document.createElement("div");
    newTitleEl.className = "task-title";
    newTitleEl.textContent = newTitle;

    input.replaceWith(newTitleEl); // swap the input back for a title node
    saveTasks();
  };

  input.addEventListener("blur", commit);
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") commit();
    if (ev.key === "Escape") {
      // after(): demonstrate inserting a node right after another, then clean up
      const restored = document.createElement("div");
      restored.className = "task-title";
      restored.textContent = task.title;
      input.after(restored);
      input.remove();
    }
  });
}

/* ----- Search + Filter (bonus) ----- */
searchInput.addEventListener("input", renderTasks);
filterCategory.addEventListener("change", renderTasks);

/* ----- Clear All (bonus) ----- */
clearAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) return;
  if (!confirm("Delete ALL tasks? This cannot be undone.")) return;
  tasks = [];
  renderTasks();
});

/* ======================================================================= */
/* 4. THEME TOGGLE — classList, dataset, toggleAttribute()                  */
/* ======================================================================= */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");

function applyTheme(theme) {
  // dataset: store the current theme inside <body data-theme="...">
  document.body.dataset.theme = theme;
  const isDark = theme === "dark";

  // classList: add/remove a helper class (demonstration of classList API)
  document.body.classList.toggle("is-dark", isDark);

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  // toggleAttribute(): flip a boolean attribute on/off on the toggle button
  themeToggle.toggleAttribute("data-active");

  const next = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

/* ======================================================================= */
/* 7. EVENT PROPAGATION — bubbling vs capturing                            */
/* ======================================================================= */
/*
   BUBBLING (default): the event fires on the innermost target first, then
   travels OUTWARD → child, parent, grandparent.
   CAPTURING: pass { capture: true } so listeners fire from the OUTSIDE in →
   grandparent, parent, child.
   We register both sets and switch which phase is "active" via a checkbox.
*/
const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");
const captureToggle = document.getElementById("captureToggle");
const propLog = document.getElementById("propLog");
const clearPropLog = document.getElementById("clearPropLog");

let propLines = [];

function logProp(name, phase) {
  propLines.push(`${phase}: ${name}`);
  propLog.textContent = propLines.join("\n");
  console.log(`[${phase}] ${name}`);
}

function flash(el) {
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 350);
}

// --- Bubbling listeners (capture: false, the default) ---
grandparent.addEventListener("click", () => {
  if (!captureToggle.checked) { logProp("grandparent", "BUBBLE"); flash(grandparent); }
}, false);
parent.addEventListener("click", () => {
  if (!captureToggle.checked) { logProp("parent", "BUBBLE"); flash(parent); }
}, false);
child.addEventListener("click", () => {
  if (!captureToggle.checked) { logProp("child", "BUBBLE"); flash(child); }
}, false);

// --- Capturing listeners (capture: true) ---
grandparent.addEventListener("click", () => {
  if (captureToggle.checked) { logProp("grandparent", "CAPTURE"); flash(grandparent); }
}, true);
parent.addEventListener("click", () => {
  if (captureToggle.checked) { logProp("parent", "CAPTURE"); flash(parent); }
}, true);
child.addEventListener("click", () => {
  if (captureToggle.checked) { logProp("child", "CAPTURE"); flash(child); }
}, true);

captureToggle.addEventListener("change", () => {
  propLines = [];
  const mode = captureToggle.checked ? "CAPTURING (grandparent → parent → child)"
                                     : "BUBBLING (child → parent → grandparent)";
  propLog.textContent = `// mode: ${mode}\n// click the child button…`;
});

clearPropLog.addEventListener("click", () => {
  propLines = [];
  propLog.textContent = "// propagation order appears here";
});

/* ======================================================================= */
/* Boot                                                                     */
/* ======================================================================= */
(function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  renderTasks();
})();
