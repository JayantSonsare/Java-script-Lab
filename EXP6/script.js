/**
 * =========================================================
 * AUTHENTICATION CONTROLLER (EXP 6)
 * Login & Registration Flow with Email Verification & Password Set
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. In-Memory / LocalStorage Database
  const defaultAccounts = [
    {
      email: 'user@example.com',
      password: 'Password@123',
      firstname: 'Demo',
      lastname: 'User',
      verified: true
    }
  ];

  function getDB() {
    const raw = localStorage.getItem('secure_accounts');
    if (!raw) {
      localStorage.setItem('secure_accounts', JSON.stringify(defaultAccounts));
      return defaultAccounts;
    }
    return JSON.parse(raw);
  }

  function addUserToDB(user) {
    const db = getDB();
    db.push(user);
    localStorage.setItem('secure_accounts', JSON.stringify(db));
  }

  // Check which page we are currently on
  const isLoginPage = document.getElementById('loginForm') !== null;
  const isRegisterPage = document.getElementById('formDetails') !== null;

  // Global State
  const State = {
    generatedOTP: null,
    pendingEmail: null,
    pendingFirstname: null,
    pendingLastname: null,
    resendSeconds: 30,
    resendTimerId: null
  };

  // =========================================================
  // PAGE 1: LOGIN PAGE LOGIC (index.html)
  // =========================================================
  if (isLoginPage) {
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const loginCard = document.getElementById('loginCard');
    const dashboardCard = document.getElementById('dashboardCard');
    const dashName = document.getElementById('dashName');
    const dashEmail = document.getElementById('dashEmail');
    const btnLogout = document.getElementById('btnLogout');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      const pass = loginPassword.value;

      loginError.classList.remove('show');

      if (!email || !pass) {
        loginError.textContent = 'Please enter both email and password.';
        loginError.classList.add('show');
        return;
      }

      const db = getDB();
      const matchedUser = db.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!matchedUser) {
        loginError.textContent = 'Account not found! Click "Create New Account" below to register.';
        loginError.classList.add('show');
        return;
      }

      if (matchedUser.password !== pass) {
        loginError.textContent = 'Incorrect password! Please try again.';
        loginError.classList.add('show');
        return;
      }

      // Successful Login -> Show Dashboard
      dashName.textContent = `${matchedUser.firstname} ${matchedUser.lastname}`;
      dashEmail.textContent = matchedUser.email;
      loginCard.style.display = 'none';
      dashboardCard.style.display = 'block';
    });

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        dashboardCard.style.display = 'none';
        loginCard.style.display = 'block';
        loginForm.reset();
      });
    }
  }

  // =========================================================
  // PAGE 2: REGISTRATION PAGE LOGIC (register.html)
  // =========================================================
  if (isRegisterPage) {
    // Steps & Sections
    const step1Details = document.getElementById('step1Details');
    const step2OTP = document.getElementById('step2OTP');
    const step3Password = document.getElementById('step3Password');
    const stepSuccess = document.getElementById('stepSuccess');

    const step1Dot = document.getElementById('step1Dot');
    const step2Dot = document.getElementById('step2Dot');
    const step3Dot = document.getElementById('step3Dot');

    // Step 1 Details Form
    const formDetails = document.getElementById('formDetails');
    const regFirstname = document.getElementById('regFirstname');
    const regLastname = document.getElementById('regLastname');
    const regEmail = document.getElementById('regEmail');
    const regEmailError = document.getElementById('regEmailError');

    const ruleAt = document.getElementById('ruleAt');
    const ruleDomain = document.getElementById('ruleDomain');
    const ruleTld = document.getElementById('ruleTld');

    // Step 2 OTP Form
    const formOtpVerify = document.getElementById('formOtpVerify');
    const targetEmailText = document.getElementById('targetEmailText');
    const simEmailTo = document.getElementById('simEmailTo');
    const simEmailCode = document.getElementById('simEmailCode');
    const otpBoxes = Array.from(document.querySelectorAll('.otp-box'));
    const otpErrorText = document.getElementById('otpErrorText');
    const btnResend = document.getElementById('btnResend');
    const resendTimerSpan = document.getElementById('resendTimerSpan');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');

    // Step 3 Password Form
    const formPasswordSet = document.getElementById('formPasswordSet');
    const newPass = document.getElementById('newPass');
    const confirmPass = document.getElementById('confirmPass');
    const passMatchError = document.getElementById('passMatchError');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    const ruleLen = document.getElementById('ruleLen');
    const ruleUpper = document.getElementById('ruleUpper');
    const ruleNum = document.getElementById('ruleNum');
    const ruleSpecial = document.getElementById('ruleSpecial');

    const savedName = document.getElementById('savedName');
    const savedEmail = document.getElementById('savedEmail');

    // Email live syntax checklist validation
    function validateEmail(email) {
      const trimmed = email.trim();
      const hasAt = /^[a-zA-Z0-9._%+-]+@/.test(trimmed);
      const hasDomain = /@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\./.test(trimmed);
      const hasTld = /\.[a-zA-Z]{2,}$/.test(trimmed);

      setRuleMet(ruleAt, hasAt);
      setRuleMet(ruleDomain, hasDomain);
      setRuleMet(ruleTld, hasTld);

      return hasAt && hasDomain && hasTld;
    }

    function setRuleMet(el, isMet) {
      if (!el) return;
      if (isMet) {
        el.classList.add('valid');
        el.querySelector('.icon').innerHTML = '&#10004;';
      } else {
        el.classList.remove('valid');
        el.querySelector('.icon').innerHTML = '&bull;';
      }
    }

    regEmail.addEventListener('input', (e) => {
      const val = e.target.value;
      const isValid = validateEmail(val);

      if (val.length > 0) {
        if (isValid) {
          regEmail.classList.remove('invalid');
          regEmail.classList.add('valid');
          regEmailError.classList.remove('show');
        } else {
          regEmail.classList.remove('valid');
        }
      } else {
        regEmail.classList.remove('valid', 'invalid');
        regEmailError.classList.remove('show');
      }
    });

    // Step 1: Submit Details & Email
    formDetails.addEventListener('submit', (e) => {
      e.preventDefault();
      const fname = regFirstname.value.trim();
      const lname = regLastname.value.trim();
      const email = regEmail.value.trim();

      let isFormValid = true;

      if (!fname) { regFirstname.classList.add('invalid'); isFormValid = false; }
      else regFirstname.classList.remove('invalid');

      if (!lname) { regLastname.classList.add('invalid'); isFormValid = false; }
      else regLastname.classList.remove('invalid');

      if (!validateEmail(email)) {
        regEmail.classList.add('invalid');
        regEmailError.textContent = 'Please enter a valid email format (e.g. name@domain.com)';
        regEmailError.classList.add('show');
        isFormValid = false;
      } else {
        regEmail.classList.remove('invalid');
        regEmailError.classList.remove('show');
      }

      if (isFormValid) {
        // Check uniqueness
        const db = getDB();
        const existing = db.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          regEmail.classList.add('invalid');
          regEmailError.textContent = 'This email is already registered! Please log in.';
          regEmailError.classList.add('show');
          return;
        }

        State.pendingFirstname = fname;
        State.pendingLastname = lname;
        State.pendingEmail = email;

        dispatchOTP(email);
      }
    });

    // Step 2: Send OTP Code
    function dispatchOTP(email) {
      State.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`[Verification Engine] OTP for ${email}: ${State.generatedOTP}`);

      targetEmailText.textContent = email;
      simEmailTo.textContent = email;
      simEmailCode.textContent = State.generatedOTP;

      // Switch to Step 2 View
      step1Details.classList.remove('active');
      step2OTP.classList.add('active');
      step1Dot.className = 'step completed';
      step2Dot.className = 'step active';

      otpBoxes.forEach(b => {
        b.value = '';
        b.classList.remove('error');
      });
      otpErrorText.classList.remove('show');
      setTimeout(() => otpBoxes[0].focus(), 150);

      startCountdown();
    }

    function startCountdown() {
      clearInterval(State.resendTimerId);
      State.resendSeconds = 30;
      btnResend.disabled = true;
      resendTimerSpan.textContent = `(in ${State.resendSeconds}s)`;

      State.resendTimerId = setInterval(() => {
        State.resendSeconds--;
        if (State.resendSeconds <= 0) {
          clearInterval(State.resendTimerId);
          btnResend.disabled = false;
          resendTimerSpan.textContent = '';
        } else {
          resendTimerSpan.textContent = `(in ${State.resendSeconds}s)`;
        }
      }, 1000);
    }

    btnResend.addEventListener('click', () => {
      if (State.resendSeconds <= 0 && State.pendingEmail) {
        dispatchOTP(State.pendingEmail);
      }
    });

    btnBackToStep1.addEventListener('click', () => {
      step2OTP.classList.remove('active');
      step1Details.classList.add('active');
      step1Dot.className = 'step active';
      step2Dot.className = 'step';
    });

    // OTP Input auto-advance, backspace, and paste
    otpBoxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) {
          box.value = '';
          return;
        }
        if (val.length === 1 && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && index > 0) {
          otpBoxes[index - 1].focus();
        }
      });

      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasted)) {
          otpBoxes.forEach((b, i) => b.value = pasted[i] || '');
          otpBoxes[otpBoxes.length - 1].focus();
        }
      });
    });

    // Step 2: Confirm OTP
    formOtpVerify.addEventListener('submit', (e) => {
      e.preventDefault();
      let entered = '';
      otpBoxes.forEach(b => entered += b.value.trim());

      if (entered === State.generatedOTP) {
        clearInterval(State.resendTimerId);
        otpErrorText.classList.remove('show');

        // Move to Step 3
        step2OTP.classList.remove('active');
        step3Password.classList.add('active');
        step2Dot.className = 'step completed';
        step3Dot.className = 'step active';

        formPasswordSet.reset();
        evaluateStrength('');
      } else {
        otpErrorText.textContent = 'Incorrect verification code. Please check simulated box.';
        otpErrorText.classList.add('show');
        otpBoxes.forEach(b => {
          b.classList.add('error');
          setTimeout(() => b.classList.remove('error'), 450);
        });
      }
    });

    // Step 3: Password Strength Analysis
    function evaluateStrength(pass) {
      const hasLen = pass.length >= 8;
      const hasUpper = /[A-Z]/.test(pass);
      const hasNum = /[0-9]/.test(pass);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

      setRuleMet(ruleLen, hasLen);
      setRuleMet(ruleUpper, hasUpper);
      setRuleMet(ruleNum, hasNum);
      setRuleMet(ruleSpecial, hasSpecial);

      const score = [hasLen, hasUpper, hasNum, hasSpecial].filter(Boolean).length;

      bar1.className = 'strength-bar';
      bar2.className = 'strength-bar';
      bar3.className = 'strength-bar';

      if (score <= 2 && pass.length > 0) {
        bar1.classList.add('weak');
        return false;
      } else if (score === 3) {
        bar1.classList.add('medium');
        bar2.classList.add('medium');
        return false;
      } else if (score === 4) {
        bar1.classList.add('strong');
        bar2.classList.add('strong');
        bar3.classList.add('strong');
        return true;
      }
      return false;
    }

    newPass.addEventListener('input', (e) => {
      evaluateStrength(e.target.value);
      checkPassMatch();
    });

    confirmPass.addEventListener('input', checkPassMatch);

    function checkPassMatch() {
      const p1 = newPass.value;
      const p2 = confirmPass.value;
      if (p2.length > 0) {
        if (p1 === p2) {
          confirmPass.classList.remove('invalid');
          confirmPass.classList.add('valid');
          passMatchError.classList.remove('show');
          return true;
        } else {
          confirmPass.classList.remove('valid');
          confirmPass.classList.add('invalid');
          passMatchError.textContent = 'Passwords do not match!';
          passMatchError.classList.add('show');
          return false;
        }
      }
      return false;
    }

    // Step 3: Complete Password & Registration
    formPasswordSet.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = newPass.value;
      const isStrong = evaluateStrength(pass);
      const isMatch = checkPassMatch();

      if (!isStrong) {
        passMatchError.textContent = 'Please meet all 4 password criteria above.';
        passMatchError.classList.add('show');
        return;
      }

      if (!isMatch) {
        passMatchError.textContent = 'Passwords do not match!';
        passMatchError.classList.add('show');
        return;
      }

      // Save to localStorage DB
      const user = {
        email: State.pendingEmail,
        password: pass,
        firstname: State.pendingFirstname,
        lastname: State.pendingLastname,
        verified: true
      };
      addUserToDB(user);

      // Display Final Success Screen
      step3Password.classList.remove('active');
      stepSuccess.classList.add('active');
      step3Dot.className = 'step completed';

      savedName.textContent = `${State.pendingFirstname} ${State.pendingLastname}`;
      savedEmail.textContent = State.pendingEmail;
    });
  }
});
