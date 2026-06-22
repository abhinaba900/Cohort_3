# 🧩 DOM Explorer — Interactive Task Manager

A fully interactive **Task Manager** built with **only HTML, CSS, and Vanilla JavaScript** — no frameworks, no libraries. It is a hands-on exploration of the DOM, event handling, event propagation, the attributes-vs-properties distinction, and the browser rendering pipeline.

## ✨ Features

- **Task Creation** — add tasks dynamically with `createElement()` + `append()`/`prepend()`; cards appear instantly with no page refresh.
- **Custom data attributes** — every card carries `data-id`, `data-status`, and `data-category`.
- **Attributes vs Properties** — a live inspector that prints `input.value` next to `input.getAttribute("value")` so you can watch them diverge.
- **Full task lifecycle** — Edit (inline via `replaceWith()`/`after()`), Complete (toggles `data-status`), Delete (`remove()`).
- **Theme toggle** — Dark/Light mode using `classList`, `dataset`, and `toggleAttribute()`; the theme is stored in `<body data-theme="...">`.
- **Event Delegation** — a single listener on the parent list handles every card's actions.
- **Event Propagation Playground** — switch between bubbling and capturing and watch the execution order live and in the console.
- **Rendering Pipeline Section** — a visual flow diagram of HTML → DOM, CSS → CSSOM, and their merge into the Render Tree.
- **Bonus** — search, category filter, completed/pending counters, clear-all, and `localStorage` persistence.

## 🗂️ Project Structure

```
DOM-manupulation/
├── index.html   # markup + page sections
├── styles.css   # theming (CSSOM) + layout
├── script.js    # all DOM logic, events, propagation, persistence
└── README.md
```

## 🚀 Running Locally

Just open `index.html` in a browser — there is no build step.

```bash
# optional: serve it locally
npx serve .
# then visit the printed URL
```

---

## 📚 Concepts Explained

### Parsing
When the browser receives the HTML response, it reads the raw **bytes**, decodes them into **characters** using the declared encoding, and then begins **parsing** — converting that character stream into something structured it can work with. Parsing is the umbrella process that drives tokenization and DOM-tree construction.

### Tokenization
During parsing, the **tokenizer** scans the characters and groups them into **tokens** — the meaningful units of HTML such as start tags (`<div>`), end tags (`</div>`), attributes, and text. For example, `<button id="child">` becomes a "start tag" token named `button` with an attribute token `id="child"`. Tokens are the bridge between raw text and actual nodes.

### DOM Tree
Each token is turned into a **node**, and nodes are linked together according to their nesting to form the **DOM (Document Object Model) Tree** — a live, in-memory tree of objects representing the page. JavaScript manipulates this tree (e.g. `createElement`, `append`, `remove`). A parent element becomes a parent node; nested elements become its children.

### CSSOM Tree
CSS is processed in parallel. Stylesheets and inline styles are parsed into the **CSSOM (CSS Object Model) Tree** — a tree of style rules. Like the DOM, it is hierarchical because CSS **cascades**: styles on a parent can be inherited by children. The CSSOM tells the browser the final computed style for every node.

### Render Tree
The browser combines the **DOM Tree + CSSOM Tree** into the **Render Tree**. The Render Tree contains only the nodes that will actually be **painted** — elements with `display: none` (and non-visual nodes like `<head>`) are excluded — each paired with its computed styles. The Render Tree then feeds **Layout** (computing geometry/position, a.k.a. reflow), **Paint** (filling in pixels), and **Composite** (assembling layers onto the screen).

```
HTML ─▶ Parsing ─▶ Tokenization ─▶ DOM Tree ┐
                                             ├─▶ Render Tree ─▶ Layout ─▶ Paint ─▶ Composite
CSS  ─▶ Parsing ─────────────────▶ CSSOM Tree┘
```

### Event Bubbling
By default, when an event fires on an element, it first runs on that **innermost target**, then **propagates outward** to each ancestor in turn. Clicking the child button logs:

```
child → parent → grandparent
```

### Event Capturing
The opposite phase. If a listener is registered with `{ capture: true }` (or `addEventListener(type, fn, true)`), it fires as the event travels **from the outermost ancestor inward** to the target:

```
grandparent → parent → child
```

Every click actually goes through **both** phases (capture down, then bubble up); the third argument of `addEventListener` decides which phase your listener reacts to. This project lets you toggle between them and watch the order in the on-page log and the console.

### Event Delegation
Rather than attaching a listener to every task card (which breaks for dynamically added elements and wastes memory), we attach **one** listener to the parent container (`#taskList`). Because events **bubble**, a click on any child reaches the parent, where we inspect `event.target` and its `data-action` attribute to decide what to do. This is **Event Delegation** — fewer listeners, and it automatically covers cards created later.

### Attributes vs Properties
- An **attribute** is what is written in the HTML source — the initial/default value. Read it with `getAttribute("value")`. It does **not** change as the user types.
- A **property** is the live value on the in-memory DOM object. Read it with `input.value`. It updates on **every keystroke**.

```js
input.value                  // "Buy milk"  ← live PROPERTY (current state)
input.getAttribute("value")  // ""          ← original ATTRIBUTE (HTML default)
```

The **Attributes vs Properties (live)** box in the app prints both side by side so you can see the property change while the attribute stays fixed.

---

## 🧪 DOM APIs Used

| Category | APIs |
| --- | --- |
| Creation / insertion | `createElement()`, `append()`, `prepend()`, `after()`, `appendChild` semantics |
| Removal / replacement | `remove()`, `replaceWith()` |
| Attributes | `getAttribute()`, `setAttribute()`, `removeAttribute()`, `dataset` |
| Properties | `element.value`, `element.checked`, `element.id`, `textContent` |
| Classes / theming | `classList.toggle()`, `toggleAttribute()`, `dataset.theme` |
| Events | `addEventListener()`, capture/bubble phases, delegation, `event.target`, `closest()` |

## 🌐 Deployment

This is a static site, so it deploys anywhere:

- **GitHub Pages** — push to a repo, then *Settings → Pages → Deploy from branch* (`main`, `/root`).
- **Netlify / Vercel** — drag-and-drop the folder, or connect the repo; no build command, publish directory is the project root.

## 📄 License

Educational project — free to use and learn from.
