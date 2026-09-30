let form = document.getElementById("signupForm");

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let username = document.getElementById("username");
let email = document.getElementById("email");
let website = document.getElementById("website");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");

let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");

let terms = document.getElementById("terms");
let message = document.getElementById("message");

for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    day.appendChild(option);
}

for (let i = 2026; i >= 1950; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
}

firstname.addEventListener("focus", function () {
    firstname.style.backgroundColor = "lightyellow";
});

month.addEventListener("change", function () {
    message.textContent = "Month selected: " + month.value;
});

email.addEventListener("change", function () {
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.value.match(emailPattern)) {
        message.textContent = "Please enter a valid email address.";
    } else {
        message.textContent = "Email is valid.";
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (firstname.value.trim() === "") {
        alert("Please enter Firstname");
        firstname.focus();
        return;
    }

    if (lastname.value.trim() === "") {
        alert("Please enter Lastname");
        lastname.focus();
        return;
    }

    if (day.value === "" || month.value === "" || year.value === "") {
        alert("Please select your Birthday");
        return;
    }

    if (username.value.trim() === "") {
        alert("Please enter Username");
        username.focus();
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.value.match(emailPattern)) {
        alert("Please enter a valid E-mail");
        email.focus();
        return;
    }

    if (password.value === "") {
        alert("Please enter Password");
        password.focus();
        return;
    }

    if (repassword.value === "") {
        alert("Please re-enter Password");
        repassword.focus();
        return;
    }

    if (password.value !== repassword.value) {
        alert("Passwords do not match");
        repassword.focus();
        return;
    }

    if (!terms.checked) {
        alert("Please agree to the terms & conditions");
        return;
    }

    message.textContent = "Registration successful!";
});