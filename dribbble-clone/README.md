# 🎨 Premium Dribbble Homepage Clone

A state-of-the-art, high-end, responsive front-end clone of the **Dribbble Homepage**. This project has been crafted to wow users at first glance with rich design aesthetics, vibrant color harmonious palettes, fluid micro-interactions, dark mode, and seamless infinite marquee scrolling.

---

## 🌟 Key Features & Highlights

### 1. 🌓 Seamless Dual-Theme (Dark / Light Mode)
* **Smooth Transitions**: Fully styled using custom Tailwind variables for background, text, and card borders.
* **Persistent Settings**: Remembers user theme preferences instantly using local storage memory.
* **Modern Accents**: Beautiful glassmorphic components in dark mode using high-end slate tones.

### 2. 🎡 Zero-Glitch Seamless Infinite Marquee
* **Smooth Scrolling**: Brand logos glide seamlessly from right to left across the screen.
* **Hover Pause State**: Marquee pauses smoothly upon mouse hover, allowing details to stand out.
* **Dynamic Sizing**: Logos maintain their native aspect ratio (removing rigid scaling) so nothing looks squished or cut off.
* **Mathematical Alignment**: Configured using exact keyframe translation matching the DOM structure (3 lists translating at exactly `-33.3333%`) to prevent any looping jumps or visual snaps.

### 3. 🍱 Elegant Bento-Style Design Grid
* **Visual Excellence**: Premium designs showcasing gorgeous high-resolution mockups, graphic layouts, and typography.
* **Dynamic Hover Overlays**: Moving your mouse over any card displays creator profiles, live tags, views, and quick action icons.
* **Heart / Save Micro-Animations**: Interactive heart icons that bounce and change color on click.

### 4. 🔗 Seamless Call-To-Actions & Signup Modal
* **Action Handlers**: Header CTA buttons, card interactions, and footer nodes prompt a beautiful interactive Sign Up Modal.
* **Bounce Transitions**: Interactive bouncing brand logo entry and smooth backdrop filter fades.

### 5. 📱 100% Mobile & Tablet Responsive
* Designed strictly using responsive units ensuring a pixel-perfect, cross-device experience from small screen mobiles up to massive 4K desktop displays.

---

## 🛠️ Built With

* **HTML5**: Structured semantically for optimal SEO and visual layout hierarchy.
* **Tailwind CSS**: High-performance, responsive styling utilizing custom hover, focus, and state elements.
* **Vanilla JavaScript (ES6+)**: Handles active category filtering, dark mode persistent states, interactive like counts, and smooth modal overlays.

---

## ⚙️ How to Run Locally

You can launch and preview the clone instantly using any local server setup:

### Option A: Python Local Server (Recommended)
1. Open terminal inside the workspace directory:
   ```bash
   cd dribbble-clone
   ```
2. Launch a temporary server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   **[http://localhost:8000](http://localhost:8000)**

### Option B: Direct Preview
* Double-click on [index.html](file:///d:/Cohort%203/dribbble-clone/index.html) to run it directly inside your browser.

---

## 🏗️ Technical Upgrades Made

Here is a breakdown of the key development steps and issue resolutions completed for this project:

1. **Fixed Logo Cut-Offs**: Restructured vector SVGs to use correct `viewBox="0 0 100 55"` coordinates, preventing the bottom halves of letters from being cropped.
2. **Infinite Marquee Math Alignment**: Resolved the visual looping glitch. The track now uses 3 identical lists scrolling with exactly `-33.3333%` translation, providing a flawless, infinite transition without snaps.
3. **PNG Logo Integration**: Seamlessly integrated the premium Dribbble wordmark PNG across the header, modal, and footer with active hover scaling.
