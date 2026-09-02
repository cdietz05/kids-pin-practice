# PIN Practice

A big, friendly, touch-first keypad for helping a young child memorize a
6-digit PIN. One HTML file, no build step, no dependencies, works offline.

**Live:** https://cdietz05.github.io/kids-pin-practice/

## What it does

- **Chunky colored keypad.** Every digit has its own color, bounces when
  pressed, flashes huge on screen, is spoken aloud ("three!"), plays a short
  pitched blip, and buzzes on devices with a vibration motor.
- **Six dots** fill as digits go in.
- **Correct PIN** → confetti, a happy chord, a spoken cheer, and a "YOU DID
  IT!" card with **Practice Again**.
- **Wrong PIN** → a gentle shake and a spoken encouragement ("So close! Give
  it another try."), then it clears itself. No scary red X.
- **👀 Peek** reveals the PIN under the dots while the button is held —
  **once per try**. It re-arms on the next attempt, and disappears from level 4
  up. Its eyes glance around and blink on their own, get busy while it's held,
  and shut once it's been used.
- **Idle nudge.** Sit still mid-entry for ~7s and the key holding the *next*
  digit gives a little wave, repeating every ~5s until they press something.
  It only ever points at the digit they're up to, so it never gives the whole
  PIN away. Switch it off under **Settings → Wiggle the next key**.
- **🔊 Mute** button next to the gear on the main screen silences the digits,
  cheers and blips without opening Settings.

- Fits portrait phones, landscape phones (two-column layout), and tablets.
  Light and dark themes. Honors `prefers-reduced-motion`.
- Installable to a home screen (web app manifest) for a full-screen,
  kiosk-like experience on a kid's tablet.

## Practice levels

Five rungs, each removing a little more help. It auto-advances after **3
correct in a row** and **never demotes** — a wrong entry just resets the
streak toward the next level.

| | Level | What changes |
| --- | --- | --- |
| 1 | **Follow the lights** | The next key lights up straight away — just follow it |
| 2 | **Try first** | The next key lights up after ~1.6s, so there's a chance to remember it first |
| 3 | **On your own** | No lights. Peek is there if it's needed |
| 4 | **No peeking** | No lights and no Peek button — all from memory |
| 5 | **Mix it up** | The keys move around every try |

It only ever lights the digit they're *up to*, never the whole PIN.

**Level 5 matters most.** Kids memorize the *finger path*, not the numbers —
a child who only learned the shape freezes on a keypad laid out differently,
which is exactly what a real door has. There's also an **Always shuffle**
switch in Settings if you want that at any level.

### Going back down

Tap the **level chip** in the header — one tap, no hold-gate, since dropping
back when a child is struggling has to be quick and there's nothing here worth
protecting. Pick any level; it takes effect on the next try.

After 3 wrong entries in a row it quietly points at that chip, but it never
moves them down on its own.

Levels can be switched off entirely under **Settings → Practice levels**. That
**hides, never deletes** — the level they'd reached is waiting if it's switched
back on.

## Setting the PIN

**Press and hold** the ⚙️ button for about a second — a quick tap won't open
it, so a curious kid poking the screen can't reach the PIN editor. Enter the
6-digit PIN twice and tap **Save PIN**.

Until a PIN is set, the practice PIN is `123456`.

## About the stored PIN

The PIN lives in this browser's `localStorage`, on that one device. It is
never sent anywhere — the page makes no network requests at all after load
(a Content-Security-Policy header on the page enforces `connect-src 'none'`).

It is **not encrypted**, because the Peek feature has to be able to show it.
Anyone with the unlocked device and devtools could read it. Treat it the way
you'd treat a sticky note: fine on a family tablet, not on a shared or
borrowed one. **Forget PIN** in Settings wipes it immediately.

## Language

English and Spanish. Everything switches — the on-screen copy, the spoken
digits (`three` / `tres`), the cheers and the encouragements — under
**Language** in Settings.

On first run it follows the browser/OS language, so a Spanish household lands
on Spanish without digging through Settings. The choice is remembered after
that.

## Voice

The page uses the browser's built-in `speechSynthesis`. Quality varies a lot
by device, so rather than take whatever voice is listed first it:

1. keeps only voices for the chosen language,
2. takes a **named favourite** if the device has one — **Samantha (en-US)** on
   iOS and macOS, Paulina/Mónica for Spanish,
3. otherwise ranks the preferred locale first — **en-US** for English, es-US →
   es-MX → es-419 → any Spanish — so the numbers come out in the accent the
   child hears at home,
4. then prefers the neural / "Natural" / Premium / cloud-backed ones over the
   robotic fallbacks.

No platform sniffing is involved: on Android and Windows those names simply
aren't in the list, so the scoring takes over.

A grown-up can override the pick under **Voice** in Settings (with a **Test**
button); the choice is remembered per language.

That's as natural as it gets without a paid cloud TTS service — those need an
API key, and a public static page is not a safe place to keep one.

## Keyboard (handy for testing on a desktop)

| Key | Action |
| --- | --- |
| `0`–`9` | Enter a digit |
| `Backspace` | Delete last digit |
| `Esc` | Clear the entry (or close Settings) |
| `Enter` / `Space` | Practice again, after a win |
