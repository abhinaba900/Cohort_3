/* ============================================================
   Productivity Dashboard — all logic in one organized file:
   navigation, todo, planner, goals, pomodoro, quotes, weather,
   clock, dynamic background, theme. Vanilla JS + Local Storage.
   ============================================================ */
"use strict";

/* ---------------- Storage helpers ---------------- */

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const KEYS = {
  todos: "dash.todos",
  planner: "dash.planner",
  goals: "dash.goals",
  theme: "dash.theme",
};

const $ = (sel) => document.querySelector(sel);

// unique id per item — Date.now() alone can collide when items
// are created within the same millisecond
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/* ============================================================
   1. NAVIGATION — dashboard ⇄ feature views (reusable)
   ============================================================ */

const dashboard = $("#dashboard");
let activeFeature = null; // which view is open; guards double-clicks

const onOpenHooks = {}; // feature name -> callback when its view opens

function openFeature(name) {
  if (activeFeature === name) return; // same card clicked twice — ignore
  const view = document.getElementById(`view-${name}`);
  if (!view) return;

  // hide whatever is showing so only one screen is ever visible
  document.querySelectorAll(".screen").forEach((s) => {
    s.hidden = true;
    s.classList.remove("is-active");
  });

  view.hidden = false;
  view.classList.add("is-active");
  activeFeature = name;
  if (onOpenHooks[name]) onOpenHooks[name]();
}

function closeFeature() {
  document.querySelectorAll(".screen").forEach((s) => {
    s.hidden = true;
    s.classList.remove("is-active");
  });
  dashboard.hidden = false;
  dashboard.classList.add("is-active");
  activeFeature = null;
  updateCardSubtitles();
}

document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("click", () => openFeature(card.dataset.feature));
});
document.querySelectorAll("[data-back]").forEach((btn) => {
  btn.addEventListener("click", closeFeature);
});

/* Little live summaries on the dashboard cards */
function updateCardSubtitles() {
  const pendingTodos = todos.filter((t) => !t.done).length;
  $("#card-sub-todo").textContent = todos.length
    ? `${pendingTodos} task${pendingTodos === 1 ? "" : "s"} pending`
    : "No tasks yet";

  const planned = Object.values(plannerData).filter((v) => v && v.trim()).length;
  $("#card-sub-planner").textContent = planned
    ? `${planned} slot${planned === 1 ? "" : "s"} planned`
    : "Plan your hours";

  const doneGoals = goals.filter((g) => g.done).length;
  $("#card-sub-goals").textContent = goals.length
    ? `${doneGoals} of ${goals.length} done`
    : "Set today's targets";
}

/* ============================================================
   2. TODO LIST — add, important, complete, delete (delegated)
   ============================================================ */

let todos = store.get(KEYS.todos, []);

const todoList = $("#todo-list");
const todoEmpty = $("#todo-empty");

function saveTodos() {
  store.set(KEYS.todos, todos);
  updateCardSubtitles();
}

function renderTodos() {
  todoList.innerHTML = "";
  todoEmpty.hidden = todos.length > 0;

  // important tasks float to the top, otherwise keep insert order
  const sorted = [...todos].sort((a, b) => Number(b.important) - Number(a.important));

  for (const t of sorted) {
    const li = document.createElement("li");
    li.className =
      "item" + (t.done ? " is-done" : "") + (t.important ? " is-important" : "");
    li.dataset.id = t.id;

    const check = document.createElement("button");
    check.className = "item-check";
    check.type = "button";
    check.dataset.action = "toggle";
    check.setAttribute("aria-label", t.done ? "Mark as not done" : "Mark as done");
    check.textContent = "✓";

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = t.text;

    const star = document.createElement("button");
    star.className = "item-star";
    star.type = "button";
    star.dataset.action = "important";
    star.setAttribute("aria-label", "Toggle important");
    star.textContent = t.important ? "★" : "☆";

    const del = document.createElement("button");
    del.className = "item-del";
    del.type = "button";
    del.dataset.action = "delete";
    del.setAttribute("aria-label", "Delete task");
    del.textContent = "✕";

    li.append(check, text, star, del);
    todoList.appendChild(li);
  }
}

$("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#todo-input");
  const text = input.value.trim();
  if (!text) return; // validate: no empty tasks

  todos.push({ id: uid(), text, done: false, important: false });
  saveTodos();
  renderTodos();
  input.value = "";
  input.focus();
});

// one listener for the whole list — event delegation
todoList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.closest(".item").dataset.id;
  const todo = todos.find((t) => String(t.id) === id);
  if (!todo) return;

  if (btn.dataset.action === "toggle") todo.done = !todo.done;
  if (btn.dataset.action === "important") todo.important = !todo.important;
  if (btn.dataset.action === "delete") todos = todos.filter((t) => String(t.id) !== id);

  saveTodos();
  renderTodos();
});

/* ============================================================
   3. DAILY PLANNER — 24 hourly slots, autosaved
   ============================================================ */

let plannerData = store.get(KEYS.planner, {}); // { "0": "text", ... "23": "text" }

const plannerEl = $("#planner");
let plannerSaveTimer;

function hourLabel(h) {
  const period = h < 12 ? "AM" : "PM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:00 ${period}`;
}

function buildPlanner() {
  plannerEl.innerHTML = "";
  for (let h = 0; h < 24; h++) {
    const row = document.createElement("div");
    row.className = "slot";
    row.dataset.hour = h;

    const time = document.createElement("span");
    time.className = "slot-time";
    time.textContent = hourLabel(h);

    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 100;
    input.placeholder = "—";
    input.value = plannerData[h] || ""; // empty slots stay gracefully blank
    input.setAttribute("aria-label", `Plan for ${hourLabel(h)}`);

    // save shortly after the user stops typing (not on every keystroke)
    input.addEventListener("input", () => {
      row.classList.toggle("has-text", input.value.trim() !== "");
      clearTimeout(plannerSaveTimer);
      plannerSaveTimer = setTimeout(() => {
        plannerData[h] = input.value;
        store.set(KEYS.planner, plannerData);
        updateCardSubtitles();
      }, 350);
    });

    const clear = document.createElement("button");
    clear.className = "slot-clear";
    clear.type = "button";
    clear.setAttribute("aria-label", `Clear plan for ${hourLabel(h)}`);
    clear.textContent = "✕";
    clear.addEventListener("click", () => {
      input.value = "";
      row.classList.remove("has-text");
      delete plannerData[h];
      store.set(KEYS.planner, plannerData);
      updateCardSubtitles();
    });

    if ((plannerData[h] || "").trim()) row.classList.add("has-text");
    row.append(time, input, clear);
    plannerEl.appendChild(row);
  }
  highlightCurrentHour();
}

function highlightCurrentHour() {
  const now = new Date().getHours();
  plannerEl.querySelectorAll(".slot").forEach((slot) => {
    slot.classList.toggle("is-now", Number(slot.dataset.hour) === now);
  });
}

onOpenHooks.planner = () => {
  highlightCurrentHour();
  const current = plannerEl.querySelector(".slot.is-now");
  if (current) current.scrollIntoView({ block: "center", behavior: "instant" });
};

/* ============================================================
   4. DAILY GOALS — add, toggle, delete + progress count
   ============================================================ */

let goals = store.get(KEYS.goals, []);

const goalsList = $("#goals-list");
const goalsEmpty = $("#goals-empty");

function saveGoals() {
  store.set(KEYS.goals, goals);
  updateCardSubtitles();
}

function renderGoals() {
  goalsList.innerHTML = "";
  goalsEmpty.hidden = goals.length > 0;

  for (const g of goals) {
    const li = document.createElement("li");
    li.className = "item" + (g.done ? " is-done" : "");
    li.dataset.id = g.id;

    const check = document.createElement("button");
    check.className = "item-check";
    check.type = "button";
    check.dataset.action = "toggle";
    check.setAttribute("aria-label", g.done ? "Mark goal as not done" : "Mark goal as done");
    check.textContent = "✓";

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = g.text;

    const del = document.createElement("button");
    del.className = "item-del";
    del.type = "button";
    del.dataset.action = "delete";
    del.setAttribute("aria-label", "Delete goal");
    del.textContent = "✕";

    li.append(check, text, del);
    goalsList.appendChild(li);
  }
  renderGoalsProgress();
}

function renderGoalsProgress() {
  const done = goals.filter((g) => g.done).length;
  const total = goals.length;
  $("#goals-progress").textContent = total
    ? `${done} of ${total} completed`
    : "0 of 0 completed";
  $("#goals-fill").style.width = total ? `${(done / total) * 100}%` : "0%";
}

$("#goals-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#goals-input");
  const text = input.value.trim();
  if (!text) return;

  goals.push({ id: uid(), text, done: false });
  saveGoals();
  renderGoals();
  input.value = "";
  input.focus();
});

goalsList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.closest(".item").dataset.id;
  const goal = goals.find((g) => String(g.id) === id);
  if (!goal) return;

  if (btn.dataset.action === "toggle") goal.done = !goal.done;
  if (btn.dataset.action === "delete") goals = goals.filter((g) => String(g.id) !== id);

  saveGoals();
  renderGoals();
});

/* ============================================================
   5. POMODORO TIMER — 25 min work / 5 min break
   ============================================================ */

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const RING_LENGTH = 2 * Math.PI * 98; // matches SVG circle r=98

const pomodoro = {
  mode: "work", // "work" | "break"
  remaining: WORK_SECONDS,
  intervalId: null,
};

const pomodoroTime = $("#pomodoro-time");
const pomodoroSession = $("#pomodoro-session");
const pomodoroNote = $("#pomodoro-note");
const pomodoroRing = $("#pomodoro-ring");

function formatMMSS(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function pomodoroTotal() {
  return pomodoro.mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
}

function renderPomodoro() {
  pomodoroTime.textContent = formatMMSS(pomodoro.remaining);
  pomodoroSession.textContent = pomodoro.mode === "work" ? "Work Session" : "Break Time";
  pomodoroSession.classList.toggle("is-break", pomodoro.mode === "break");
  pomodoroRing.style.strokeDashoffset =
    RING_LENGTH * (1 - pomodoro.remaining / pomodoroTotal());
  $("#card-sub-pomodoro").textContent = `${formatMMSS(pomodoro.remaining)} ${
    pomodoro.mode === "work" ? "focus" : "break"
  }`;
}

function pomodoroTick() {
  pomodoro.remaining -= 1;
  if (pomodoro.remaining <= 0) {
    pomodoro.remaining = 0;
    renderPomodoro();
    stopPomodoro();
    pomodoroBeep();
    // session over: switch mode, wait for the user to start the next one
    if (pomodoro.mode === "work") {
      pomodoro.mode = "break";
      pomodoro.remaining = BREAK_SECONDS;
      pomodoroNote.textContent = "Nice focus! 🎉 Time for a 5 minute break — press Start.";
    } else {
      pomodoro.mode = "work";
      pomodoro.remaining = WORK_SECONDS;
      pomodoroNote.textContent = "Break's over — press Start for the next work session.";
    }
    renderPomodoro();
    return;
  }
  renderPomodoro();
}

function startPomodoro() {
  if (pomodoro.intervalId !== null) return; // never run two intervals at once
  pomodoro.intervalId = setInterval(pomodoroTick, 1000);
  pomodoroNote.textContent =
    pomodoro.mode === "work" ? "Deep focus. You've got this." : "Relax — you earned it.";
}

function stopPomodoro() {
  clearInterval(pomodoro.intervalId);
  pomodoro.intervalId = null;
}

function resetPomodoro() {
  stopPomodoro();
  pomodoro.mode = "work";
  pomodoro.remaining = WORK_SECONDS;
  pomodoroNote.textContent = "25 minutes of focus, then a 5 minute break.";
  renderPomodoro();
}

// short double-beep via the Web Audio API — no audio file needed
function pomodoroBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.35].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.32);
    });
  } catch {
    /* audio unavailable — the session label change is the fallback signal */
  }
}

$("#pomodoro-start").addEventListener("click", startPomodoro);
$("#pomodoro-pause").addEventListener("click", stopPomodoro);
$("#pomodoro-reset").addEventListener("click", resetPomodoro);

/* ============================================================
   6. MOTIVATION QUOTE — Fetch API with loading + fallback
   ============================================================ */

const FALLBACK_QUOTES = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
];

const quoteText = $("#quote-text");
const quoteAuthor = $("#quote-author");
const quoteBtn = $("#quote-btn");
let quoteLoaded = false;

async function fetchQuote() {
  quoteText.classList.add("is-loading");
  quoteText.textContent = "Finding you something good…";
  quoteAuthor.textContent = "";
  quoteBtn.disabled = true;

  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data = await res.json();
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = data.author || "Unknown";
    quoteLoaded = true;
  } catch {
    // offline / API down — fall back to a bundled quote so the UI never breaks
    const q = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    quoteText.textContent = q.quote;
    quoteAuthor.textContent = `${q.author} · offline pick`;
  } finally {
    quoteText.classList.remove("is-loading");
    quoteBtn.disabled = false;
  }
}

quoteBtn.addEventListener("click", fetchQuote);
onOpenHooks.quote = () => {
  if (!quoteLoaded) fetchQuote(); // auto-load the first time the card opens
};

/* ============================================================
   7. WEATHER WIDGET — Open-Meteo (no API key) + Geolocation
   ============================================================ */

const WEATHER_CODES = {
  0: ["Clear sky", "☀️"], 1: ["Mostly clear", "🌤️"], 2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"], 45: ["Foggy", "🌫️"], 48: ["Icy fog", "🌫️"],
  51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Heavy drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"], 57: ["Freezing drizzle", "🌧️"],
  61: ["Light rain", "🌧️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"], 67: ["Freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"], 73: ["Snow", "❄️"], 75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "❄️"], 80: ["Light showers", "🌦️"], 81: ["Showers", "🌧️"],
  82: ["Heavy showers", "⛈️"], 85: ["Snow showers", "🌨️"], 86: ["Snow showers", "🌨️"],
  95: ["Thunderstorm", "⛈️"], 96: ["Storm with hail", "⛈️"], 99: ["Storm with hail", "⛈️"],
};

const DEFAULT_CITY = { name: "Kolkata (default)", lat: 22.5726, lon: 88.3639 };

function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("no geolocation"));
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 6000,
      maximumAge: 10 * 60 * 1000,
    });
  });
}

async function loadWeather() {
  let lat, lon, locationName;

  try {
    const pos = await getPosition();
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    locationName = null; // resolve via reverse geocoding below
  } catch {
    // user denied location / unavailable — fall back to a default city
    ({ lat, lon } = DEFAULT_CITY);
    locationName = DEFAULT_CITY.name;
  }

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`weather API ${res.status}`);
    const data = await res.json();
    const cur = data.current;
    const [cond, icon] = WEATHER_CODES[cur.weather_code] || ["Unknown", "🌡️"];

    $("#weather-temp").textContent = `${Math.round(cur.temperature_2m)}°C`;
    $("#weather-cond").textContent = cond;
    $("#weather-icon").textContent = icon;
    $("#weather-feels").textContent = `${Math.round(cur.apparent_temperature)}°`;
    $("#weather-humidity").textContent = `${cur.relative_humidity_2m}%`;
    $("#weather-wind").textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
    $("#weather-precip").textContent = `${cur.precipitation} mm`;
  } catch {
    $("#weather-cond").textContent = "Weather unavailable right now";
    $("#weather-icon").textContent = "🛰️";
    $("#weather-loc").textContent = "Check your connection";
    return;
  }

  if (locationName) {
    $("#weather-loc").textContent = locationName;
  } else {
    // free reverse geocoding, no key required
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const geo = await res.json();
      $("#weather-loc").textContent =
        geo.city || geo.locality || geo.principalSubdivision || "Your location";
    } catch {
      $("#weather-loc").textContent = "Your location";
    }
  }
}

/* ============================================================
   8. DATE & TIME — live clock (single interval, immediate call)
   ============================================================ */

let clockIntervalId = null;

function renderClock() {
  const now = new Date();
  let h = now.getHours();
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 === 0 ? 12 : h % 12;
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  $("#clock-time").textContent = `${String(h).padStart(2, "0")}:${mm}:${ss} ${period}`;
  $("#clock-date").textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function startClock() {
  if (clockIntervalId !== null) return; // avoid stacking intervals
  renderClock(); // show instantly, don't wait one second
  clockIntervalId = setInterval(renderClock, 1000);
}

/* ============================================================
   9. DYNAMIC BACKGROUND — time-of-day gradient, crossfaded
   ============================================================ */

function timeOfDay(hour) {
  if (hour >= 5 && hour < 11) return "morning";     // 5 AM – 10:59 AM
  if (hour >= 11 && hour < 16) return "afternoon";  // 11 AM – 3:59 PM
  if (hour >= 16 && hour < 20) return "evening";    // 4 PM – 7:59 PM
  return "night";                                    // 8 PM – 4:59 AM (covers the rest)
}

function applyBackground() {
  const current = timeOfDay(new Date().getHours());
  document.querySelectorAll(".bg-layer").forEach((layer) => {
    layer.classList.toggle("is-active", layer.dataset.bg === current);
  });

  const greetings = {
    morning: "Good morning — let's make today count. ☕",
    afternoon: "Good afternoon — keep the momentum going. ⚡",
    evening: "Good evening — finish strong. 🌇",
    night: "Working late? Pace yourself. 🌙",
  };
  $("#hello").textContent = greetings[current];
}

/* ============================================================
   10. THEME SWITCH — light/dark via CSS variables, persisted
   ============================================================ */

const themeToggle = $("#theme-toggle");

function syncThemeToggle() {
  themeToggle.setAttribute(
    "aria-checked",
    String(document.documentElement.dataset.theme === "dark")
  );
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next; // variables swap instantly
  store.set(KEYS.theme, next);
  syncThemeToggle();
});

/* ============================================================
   Init
   ============================================================ */

function init() {
  syncThemeToggle(); // theme itself was applied pre-render in <head>
  startClock();
  applyBackground();
  setInterval(applyBackground, 60 * 1000); // catch time-boundary crossings
  setInterval(highlightCurrentHour, 60 * 1000);

  renderTodos();
  buildPlanner();
  renderGoals();
  renderPomodoro();
  updateCardSubtitles();
  loadWeather();
}

init();
