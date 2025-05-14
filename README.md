# BackPopup.js

[![npm version](https://badge.fury.io/js/backpopup.js.svg)](https://www.npmjs.com/package/backpopup.js)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**BackPopup.js** is a lightweight JavaScript library that shows a customizable popup when users press the browser's back button — great for last-chance offers, surveys, or exit-intent lead capture.

---

## 🚀 Features

- 🔁 Triggers on browser **back button**
- 🧠 “Don’t Show Again” using **localStorage or cookies**
- ⚡ Smooth fade-in and pop-in animation
- 🎯 Fully customizable: title, message, image, CTA, decline button
- 📦 Zero dependencies, pure JavaScript

---

## 📦 Installation

### Option 1: Direct `<script>` Include

```html
<script src="backpopup.js"></script>
```

Or use the minified version:

```html
<script src="backpopup.min.js"></script>
```

### Option 2: Install via npm

```bash
npm install backpopup
```

#### Then use it in your JavaScript:

```js
import BackPopup from 'backpopup';

BackPopup.init({
  title: "WAIT!",
  message: "Don't leave yet — there’s an exclusive offer waiting!",
  ctaText: "Claim Offer",
  ctaUrl: "https://example.com",
  declineText: "No thanks"
});
```

---

## 🛠️ Usage

```html
<script>
BackPopup.init({
  title: "WAIT!",
  message: "Don't leave yet — there’s an exclusive offer waiting!",
  image: "offer.jpg", // optional
  subtext: "Complete a quick survey and claim your reward.",
  ctaText: "Yes, I want it!",
  ctaUrl: "offer.php",
  declineText: "No thanks",
  animationDuration: 300, // optional
  useCookies: true,       // enable cookie mode instead of localStorage
  cookieExpiryDays: 7     // valid only if useCookies is true
});
</script>
```

---

## ⚙️ Options

| Option              | Type    | Description                                                     |
| ------------------- | ------- | --------------------------------------------------------------- |
| `title`             | string  | Main heading of the popup                                       |
| `message`           | string  | Message below the title                                         |
| `image`             | string  | *(Optional)* Image URL                                          |
| `subtext`           | string  | Message under the image                                         |
| `ctaText`           | string  | Text on the call-to-action button                               |
| `ctaUrl`            | string  | URL for the CTA button                                          |
| `declineText`       | string  | Text for the dismiss link                                       |
| `animationDuration` | number  | Animation speed in milliseconds (default: `300`)                |
| `useCookies`        | boolean | If `true`, uses cookies instead of localStorage                 |
| `cookieExpiryDays`  | number  | Cookie expiry in days *(only used when `useCookies` is `true`)* |

---

## 🧠 “Don't Show Again” Behavior

Once the user clicks **"No thanks"**, the popup won't appear again due to:

* `localStorage` flag (`backPopupDismissed`) if `useCookies: false` (default)
* A **cookie** (`backPopupDismissed`) if `useCookies: true`

### 🔄 Reset manually (for development):

#### For localStorage mode:

```js
localStorage.removeItem("backPopupDismissed");
```

#### For cookie mode:

```js
document.cookie = "backPopupDismissed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

---

## 💡 Tips

* Combine with UTM parameters or cookies for **targeted campaigns**
* Customize appearance using your own **CSS overrides**
* Works well for **landing pages**, **checkout exits**, and **surveys**

---

## 📝 License

MIT License

---

## 🙋 Support

Found a bug or want a new feature? Open an issue or contact the maintainer.