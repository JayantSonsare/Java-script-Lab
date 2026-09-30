# Experiment No. 6

**Student Name:** Jayant Sonsare  
**PRN:** 24070521058  
**File Path:** `EXP6/index.html`, `EXP6/register.html`, `EXP6/script.js`, `EXP6/style.css`, `EXP6/EXP 6 CaseStudy/`

---

## Experiment Title

**Authentication Portal with Email Verification (Login & Multi-Step Registration)**

---

## Software / Tools Required

1. Visual Studio Code / Antigravity IDE
2. Google Chrome (or modern web browser)
3. HTML5
4. CSS3
5. JavaScript (ES6)
6. Web Storage API (`localStorage`)

---

## Experiment Program Code

### Task 6.a — Sign-In Portal & Authenticated Profile Dashboard

**File:** `EXP6/index.html`

The login page provides a clean, responsive card where registered users sign in using email and password credentials. Successful validation loads a user profile dashboard dynamically.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login – Authentication Portal (EXP 6)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <main class="auth-container">
    <div class="auth-card" id="loginCard">
      <div class="card-header">
        <h2 class="card-title">Sign In</h2>
        <p class="card-desc">Enter your email and password to proceed</p>
      </div>

      <form id="loginForm" novalidate>
        <div class="form-group">
          <label for="loginEmail" class="form-label">Email Address</label>
          <div class="input-wrap">
            <span class="input-icon">&#9993;</span>
            <input type="email" id="loginEmail" class="input-control" placeholder="name@example.com" required autocomplete="email">
          </div>
        </div>

        <div class="form-group">
          <label for="loginPassword" class="form-label">Password</label>
          <div class="input-wrap">
            <span class="input-icon">&#128273;</span>
            <input type="password" id="loginPassword" class="input-control" placeholder="Enter your password" required autocomplete="current-password">
          </div>
          <span id="loginError" class="error-text"></span>
        </div>

        <button type="submit" class="btn-submit">Log In &rarr;</button>

        <div class="divider"></div>

        <a href="register.html" class="btn-submit btn-green">
          Create New Account (Register) &rarr;
        </a>

        <div class="footer-link">
          Demo: <strong>user@example.com</strong> / <strong>Password@123</strong>
        </div>
      </form>
    </div>

    <!-- Logged In Success Dashboard Screen -->
    <div class="auth-card" id="dashboardCard" style="display: none;">
      <div class="success-box">
        <div class="success-icon">&#10004;</div>
        <h2 class="card-title">Login Successful!</h2>
        <p class="card-desc">Welcome back to your verified profile.</p>

        <div class="profile-card">
          <div class="profile-row">
            <span class="profile-lbl">Name:</span>
            <span id="dashName" class="profile-val">Demo User</span>
          </div>
          <div class="profile-row">
            <span class="profile-lbl">Verified Email:</span>
            <span id="dashEmail" class="profile-val" style="color: var(--primary);">user@example.com</span>
          </div>
          <div class="profile-row">
            <span class="profile-lbl">Status:</span>
            <span class="profile-val" style="color: var(--success);">&#10004; Active & Verified</span>
          </div>
        </div>

        <button type="button" id="btnLogout" class="btn-submit btn-secondary">Log Out</button>
      </div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

---

### Task 6.b — Multi-Step Registration Stepper & Email Validation

**File:** `EXP6/register.html`

The registration interface guides the user through 3 stages with a progress stepper:
1. **Step 1:** Details (Name, Live RegExp Email Format Verification checklist).
2. **Step 2:** Simulated 6-Digit Email OTP generation and verification.
3. **Step 3:** Strong password policy configuration, storage in `localStorage`, and redirection.

```html
<!-- Excerpt from EXP6/register.html -->
<nav class="stepper" aria-label="Registration Steps">
  <div class="stepper-line"></div>
  <div class="step active" id="step1Dot">
    <div class="step-circle">1</div>
    <span class="step-label">Details</span>
  </div>
  <div class="step" id="step2Dot">
    <div class="step-circle">2</div>
    <span class="step-label">Email OTP</span>
  </div>
  <div class="step" id="step3Dot">
    <div class="step-circle">3</div>
    <span class="step-label">Password</span>
  </div>
</nav>

<!-- Live Email Rules Checklist -->
<div class="rules-card">
  <div id="ruleAt" class="rule-item"><span class="icon">&bull;</span> Contains username and '@' symbol</div>
  <div id="ruleDomain" class="rule-item"><span class="icon">&bull;</span> Contains domain (e.g. gmail, yahoo)</div>
  <div id="ruleTld" class="rule-item"><span class="icon">&bull;</span> Contains extension (e.g. .com, .edu, .in)</div>
</div>
```

---

### Task 6.c — Authentication Controller, OTP Generation, and Persistence

**File:** `EXP6/script.js`

Manages email format regex checking (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`), generates random 6-digit OTPs (`Math.floor(100000 + Math.random() * 900000)`), validates submissions, and persists accounts into `localStorage`.

```javascript
// Excerpt from EXP6/script.js: Email Validation & Account Registration
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmailField(val) {
  const hasAt = /^[^@\s]+@[^@\s]+/.test(val);
  const hasDomain = /@[a-zA-Z0-9-]+\./.test(val);
  const hasTld = /\.[a-zA-Z]{2,}$/.test(val);

  toggleRule('ruleAt', hasAt);
  toggleRule('ruleDomain', hasDomain);
  toggleRule('ruleTld', hasTld);

  return emailRegex.test(val);
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function addUserToDB(user) {
  const raw = localStorage.getItem('secure_accounts');
  const db = raw ? JSON.parse(raw) : [];
  db.push(user);
  localStorage.setItem('secure_accounts', JSON.stringify(db));
}
```

---

## Output

1. **Sign-In Flow:** Users authenticate against stored accounts in `localStorage`. Default credentials (`user@example.com` / `Password@123`) or newly registered accounts allow instant login to the user dashboard.
2. **Interactive Stepper:** Registration transitions through Details $\to$ Email OTP $\to$ Password Creation seamlessly without page reload.
3. **Simulated OTP Delivery:** A simulated email notification pill reveals the generated 6-digit code for testing the complete authentication cycle.

---

## Screenshot

![User Registration and Authentication Portal](Screenshot%202026-09-07%20223623.png)

---

## Case Study

### Case Study — Student Information Extraction System

**File:** `EXP6/EXP 6 CaseStudy/index.html`, `EXP6/EXP 6 CaseStudy/script.js`, `EXP6/EXP 6 CaseStudy/style.css`

Demonstrates advanced text extraction and parsing from raw multiline text input using Regular Expressions and string methods.

#### Highlights of Case Study:
- Captures Student Name, Roll Number, Email Address, Phone Number, and Department via capture groups in RegExp (`text.match(regex)`).
- Validates extracted email and 10-digit phone number formats (`/^\d{10}$/`).
- Computes word counts (`text.trim().split(/\s+/).length`) and character counts without whitespace (`text.replace(/\s/g, "").length`).
- Performs string transforms (`toLowerCase()`) and case-insensitive replacements (`text.replace(/Computer Science/gi, "Information Technology")`).

```javascript
// Excerpt from EXP6/EXP 6 CaseStudy/script.js
function processData() {
    const text = document.getElementById("studentText").value;

    const nameRegex = /Student Name\s*:\s*(.+)/i;
    const rollRegex = /Roll Number\s*:\s*(\d+)/i;
    const emailRegex = /Email\s*:\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/i;
    const phoneRegex = /Phone\s*:\s*(\d+)/i;
    const departmentRegex = /Department\s*:\s*(.+)/i;

    const nameMatch = text.match(nameRegex);
    const rollMatch = text.match(rollRegex);
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    const departmentMatch = text.match(departmentRegex);

    const emailValidationRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneValidationRegex = /^\d{10}$/;

    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characterCount = text.replace(/\s/g, "").length;
    const lowercaseText = text.toLowerCase();
    const replacedText = text.replace(/Computer Science/gi, "Information Technology");
}
```

---

## Result / Conclusion

Experiment 6 demonstrated comprehensive user authentication architectures on the client side, combining RegExp email syntax verification, multi-step stepper state management, OTP generation, and persistent data storage using `localStorage`. The case study validated text harvesting, tokenization, and pattern replacement using Regular Expressions.
