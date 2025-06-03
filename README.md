# 💰 Vue3-Amount-Calculator

An interactive Vue 3 application with mock backend logic, action logging, `localStorage`
persistence, dynamic recalculations, and data integrity checks. Built with TypeScript and Vue’s
modern reactivity system.

> A prototype interface for a form where:
>
> - Input fields are interdependent (price, quantity, amount)
> - A button click triggers a "submit" action
> - Event history is tracked
> - All logic is traceable via `localStorage` and logs

📍 **[Demo (GitHub Pages)](https://notacat1.github.io/Vue3-Amount-Calculator/)**

---

## 🧠 Smart Logic

- **Interconnected fields**: Changing one recalculates the others, with the **earliest-modified
  field recalculated last**.
- Input changes are debounced (**300ms delay**).
- When clicking "Submit":
  - An object `{ counter, price, qty, amount }` is generated.
  - A **1-second delay** simulates backend processing.
  - If `amount` is **even**, the submission "succeeds".
  - If `amount` is **odd**, it "fails".
- `localStorage` updates after each submission attempt.
- `counter` increments monotonically.
- All events are logged in reverse chronological order (newest on top).

---

## 🛠️ Tech Stack

- 🖼️ **Vue 3** (Composition API)
- 🧾 **TypeScript**
- ⚙️ Vite
- 📦 `localStorage`
- 🕓 Built-in debounce
- 🎭 Mock backend logic

---

## 🖥 Setup & Run

```bash
# Clone the repo
[git clone https://github.com/YOUR-USERNAME/vue3-amount-calculator.git](https://github.com/NotACat1/Vue3-Amount-Calculator.git)
cd vue3-amount-calculator

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 💡 Project Goals

This project demonstrates:

- Reactive form handling
- Proper dependent field logic
- `localStorage` synchronization
- Mock async backend interactions
- Custom event logging

---

## 📝 License

[MIT](LICENSE)
