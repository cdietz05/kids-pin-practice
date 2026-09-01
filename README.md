# PIN Practice

A touch-friendly single-page tool for helping a kid memorize a 6-digit PIN.

- Big, touch-enabled number pad that works on phones and tablets.
- A parent sets the target PIN behind the **⚙️** settings icon. The PIN is
  stored only in that browser (`localStorage`) and is never shown on screen.
- When the child types a 6-digit PIN that matches, the screen throws confetti,
  plays a cheer, and shows a **Practice Again** button so they can keep going.
- A wrong entry just gives a gentle shake and clears itself — no scary red X.
- **👁 Hold to peek** shows the set PIN, one digit under each circle, only
  while the button is held down.

## Use it

Open `index.html` in any modern browser, or visit the GitHub Pages site for
this repo. No build step, no dependencies, works offline.

## Set the PIN

1. Tap the **⚙️** icon (top right).
2. Enter the 6-digit PIN twice and tap **Save PIN**.

Until a PIN is set, the practice PIN is `123456`.

## Keyboard

For testing on a desktop: number keys type, `Backspace` deletes, `Esc` clears,
`Enter` restarts after a win.
