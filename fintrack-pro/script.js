/* ============================================================
   FinTrack Pro — vanilla JS, all data lives in Local Storage
   ============================================================ */
"use strict";

const STORAGE_KEYS = {
  transactions: "fintrack.transactions",
  settings: "fintrack.settings",
};

const CURRENCY_LOCALES = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  INR: "en-IN",
  JPY: "ja-JP",
};

/* ---------- State ---------- */

let transactions = loadJSON(STORAGE_KEYS.transactions, []);
let settings = Object.assign(
  { name: "", currency: "USD", theme: "light" },
  loadJSON(STORAGE_KEYS.settings, {})
);
let activeFilter = "all";

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

/* ---------- Elements ---------- */

const $ = (sel) => document.querySelector(sel);

const el = {
  greeting: $("#greeting"),
  themeToggle: $("#theme-toggle"),
  statBalance: $("#stat-balance"),
  statIncome: $("#stat-income"),
  statExpense: $("#stat-expense"),
  statCount: $("#stat-count"),
  form: $("#tx-form"),
  desc: $("#tx-desc"),
  amount: $("#tx-amount"),
  date: $("#tx-date"),
  category: $("#tx-category"),
  formError: $("#form-error"),
  chart: $("#chart"),
  list: $("#tx-list"),
  emptyState: $("#empty-state"),
  filterBtns: document.querySelectorAll(".filter-btn"),
  settingsModal: $("#settings-modal"),
  settingsOpen: $("#settings-open"),
  settingsClose: $("#settings-close"),
  settingsForm: $("#settings-form"),
  profileName: $("#profile-name"),
  profileCurrency: $("#profile-currency"),
  resetAll: $("#reset-all"),
  toast: $("#toast"),
};

/* ---------- Formatting ---------- */

function formatMoney(value) {
  const currency = settings.currency;
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] || "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------- Rendering ---------- */

function totals() {
  let income = 0;
  let expense = 0;
  for (const tx of transactions) {
    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  }
  return { income, expense, balance: income - expense };
}

function renderSummary() {
  const { income, expense, balance } = totals();
  el.statBalance.textContent = formatMoney(balance);
  el.statBalance.classList.toggle("is-negative", balance < 0);
  el.statIncome.textContent = formatMoney(income);
  el.statExpense.textContent = formatMoney(expense);
  el.statCount.textContent =
    transactions.length === 1
      ? "1 transaction recorded"
      : `${transactions.length} transactions recorded`;
}

function renderList() {
  const visible = transactions
    .filter((tx) => activeFilter === "all" || tx.type === activeFilter)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id));

  el.list.innerHTML = "";
  el.emptyState.hidden = visible.length > 0;

  for (const tx of visible) {
    const li = document.createElement("li");
    li.className = `tx-item ${tx.type}`;
    li.dataset.id = tx.id;

    const badge = document.createElement("span");
    badge.className = "tx-badge";
    badge.textContent = tx.type === "income" ? "+" : "−";

    const main = document.createElement("div");
    main.className = "tx-main";
    const desc = document.createElement("p");
    desc.className = "tx-desc";
    desc.textContent = tx.desc;
    const meta = document.createElement("p");
    meta.className = "tx-meta";
    meta.textContent = `${tx.category} · ${formatDate(tx.date)}`;
    main.append(desc, meta);

    const amount = document.createElement("span");
    amount.className = "tx-amount";
    amount.textContent = `${tx.type === "income" ? "+" : "−"}${formatMoney(tx.amount)}`;

    const del = document.createElement("button");
    del.className = "tx-delete";
    del.type = "button";
    del.setAttribute("aria-label", `Delete ${tx.desc}`);
    del.title = "Delete";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTransaction(tx.id, li));

    li.append(badge, main, amount, del);
    el.list.appendChild(li);
  }
}

/* ---------- Chart (last 7 days, SVG) ---------- */

function renderChart() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      iso,
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
      income: 0,
      expense: 0,
    });
  }

  for (const tx of transactions) {
    const day = days.find((d) => d.iso === tx.date);
    if (day) day[tx.type] += tx.amount;
  }

  const max = Math.max(...days.map((d) => Math.max(d.income, d.expense)));

  if (max === 0) {
    el.chart.innerHTML =
      '<p class="chart-empty">No activity in the last 7 days — the chart fills in as you add entries.</p>';
    return;
  }

  const W = 340;
  const H = 170;
  const padBottom = 22;
  const plotH = H - padBottom;
  const groupW = W / days.length;
  const barW = 13;
  const gap = 4;

  let bars = "";
  let labels = "";

  days.forEach((d, i) => {
    const cx = i * groupW + groupW / 2;
    const hIn = d.income ? Math.max(3, (d.income / max) * (plotH - 12)) : 0;
    const hEx = d.expense ? Math.max(3, (d.expense / max) * (plotH - 12)) : 0;

    if (hIn) {
      bars += `<rect class="bar" x="${cx - barW - gap / 2}" y="${plotH - hIn}" width="${barW}" height="${hIn}" rx="3.5" fill="var(--income)"><title>${d.label} in: ${formatMoney(d.income)}</title></rect>`;
    }
    if (hEx) {
      bars += `<rect class="bar" x="${cx + gap / 2}" y="${plotH - hEx}" width="${barW}" height="${hEx}" rx="3.5" fill="var(--expense)"><title>${d.label} out: ${formatMoney(d.expense)}</title></rect>`;
    }
    labels += `<text x="${cx}" y="${H - 6}" text-anchor="middle" font-size="9.5" font-family="var(--font-body)" fill="var(--ink-faint)">${d.label}</text>`;
  });

  el.chart.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="${plotH + 0.5}" x2="${W}" y2="${plotH + 0.5}" stroke="var(--line)" stroke-width="1" />
      ${bars}
      ${labels}
    </svg>`;
}

function renderGreeting() {
  el.greeting.textContent = settings.name ? `Hello, ${settings.name}` : "";
}

function renderAll() {
  renderSummary();
  renderList();
  renderChart();
  renderGreeting();
}

/* ---------- Actions ---------- */

function addTransaction(event) {
  event.preventDefault();

  const desc = el.desc.value.trim();
  const amount = parseFloat(el.amount.value);
  const date = el.date.value;
  const type = el.form.elements.type.value;

  let error = "";
  if (!desc) error = "Please enter a description.";
  else if (!Number.isFinite(amount) || amount <= 0) error = "Amount must be a positive number.";
  else if (!date) error = "Please pick a date.";

  el.formError.hidden = !error;
  el.formError.textContent = error;
  if (error) return;

  transactions.push({
    id: Date.now(),
    desc,
    amount: Math.round(amount * 100) / 100,
    type,
    category: el.category.value,
    date,
  });
  persist();
  renderAll();

  el.form.reset();
  setDefaultDate();
  el.desc.focus();
  showToast(`${type === "income" ? "Income" : "Expense"} added ✓`);
}

function deleteTransaction(id, li) {
  li.classList.add("removing");
  setTimeout(() => {
    transactions = transactions.filter((tx) => tx.id !== id);
    persist();
    renderAll();
    showToast("Transaction deleted");
  }, 220);
}

function setFilter(filter, btn) {
  activeFilter = filter;
  el.filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
  renderList();
}

/* ---------- Theme ---------- */

function applyTheme() {
  document.documentElement.dataset.theme = settings.theme;
}

function toggleTheme() {
  settings.theme = settings.theme === "dark" ? "light" : "dark";
  persist();
  applyTheme();
}

/* ---------- Settings modal ---------- */

function openSettings() {
  el.profileName.value = settings.name;
  el.profileCurrency.value = settings.currency;
  el.settingsModal.hidden = false;
  el.profileName.focus();
}

function closeSettings() {
  el.settingsModal.hidden = true;
}

function saveSettings(event) {
  event.preventDefault();
  settings.name = el.profileName.value.trim();
  settings.currency = el.profileCurrency.value;
  persist();
  renderAll();
  closeSettings();
  showToast("Settings saved ✓");
}

function resetAllData() {
  const ok = confirm("Reset FinTrack Pro? This permanently deletes every transaction and setting saved in this browser.");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEYS.transactions);
  localStorage.removeItem(STORAGE_KEYS.settings);
  transactions = [];
  settings = { name: "", currency: "USD", theme: settings.theme };
  persist();
  renderAll();
  closeSettings();
  showToast("All data has been reset");
}

/* ---------- Toast ---------- */

let toastTimer;
function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2200);
}

/* ---------- Init ---------- */

function setDefaultDate() {
  const now = new Date();
  el.date.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function init() {
  applyTheme();
  setDefaultDate();
  renderAll();

  el.form.addEventListener("submit", addTransaction);
  el.themeToggle.addEventListener("click", toggleTheme);
  el.filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => setFilter(btn.dataset.filter, btn))
  );

  el.settingsOpen.addEventListener("click", openSettings);
  el.settingsClose.addEventListener("click", closeSettings);
  el.settingsModal.addEventListener("click", (e) => {
    if (e.target === el.settingsModal) closeSettings();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !el.settingsModal.hidden) closeSettings();
  });
  el.settingsForm.addEventListener("submit", saveSettings);
  el.resetAll.addEventListener("click", resetAllData);
}

init();
