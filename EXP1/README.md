# Experiment No. 1

**Student Name:** Jayant Sonsare  
**PRN:** 24070521058  
**File Path:** `EXP1/index.html`, `EXP1/script.js`

---

## Experiment Title

**SIT NAGPUR | Student Registration (Student Information Portal)**

---

## Software / Tools Required

1. Visual Studio Code / Antigravity IDE
2. Google Chrome (or modern web browser)
3. HTML5
4. CSS3
5. JavaScript (ES6)

---

## Experiment Program Code

### Task 1.a — Student Information Form and Dynamic Result Table

**File:** `EXP1/index.html`

The HTML document creates a centered, card-based interface containing inputs for student credentials (Name, Age, PRN, Contact Number, Email, and Address), a submission button, an initially hidden results table, and author credits.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SIT NAGPUR | Student Registration</title>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Segoe UI, Arial, sans-serif;
}
body {
    background: linear-gradient(135deg, #0f172a, #1d4ed8, #38bdf8);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}
.container {
    width: 700px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(0,0,0,.3);
}
h1 {
    text-align: center;
    color: #0f172a;
    margin-bottom: 8px;
}
.subtitle {
    text-align: center;
    color: gray;
    margin-bottom: 30px;
    font-size: 18px;
}
label {
    display: block;
    margin-top: 15px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #1e293b;
}
input, textarea {
    width: 100%;
    padding: 14px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 16px;
    transition: .3s;
}
textarea {
    resize: none;
    height: 90px;
}
button {
    width: 100%;
    padding: 15px;
    margin-top: 25px;
    background: #2563eb;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
}
button:hover {
    background: #1e40af;
    transform: scale(1.02);
}
table {
    width: 100%;
    margin-top: 30px;
    border-collapse: collapse;
}
table, th, td {
    border: 1px solid #d1d5db;
}
th {
    background: #2563eb;
    color: white;
    padding: 12px;
}
td {
    padding: 12px;
}
tr:nth-child(even) {
    background: #f8fafc;
}
.footer {
    margin-top: 35px;
    text-align: center;
    border-top: 2px solid #ddd;
    padding-top: 20px;
    color: #555;
    font-size: 15px;
}
.footer b {
    color: #1d4ed8;
}
</style>
</head>
<body>
<div class="container">
    <h1>Welcome to SIT NAGPUR</h1>
    <p class="subtitle">Student Information Portal</p>
    
    <label>Enter Name</label>
    <input type="text" id="name" placeholder="Enter Name">
    
    <label>Enter Age</label>
    <input type="number" id="age" placeholder="Enter Age">
    
    <label>Enter PRN</label>
    <input type="text" id="prn" placeholder="Enter PRN">
    
    <label>Enter Contact Number</label>
    <input type="text" id="contact" placeholder="Enter Contact Number">
    
    <label>Enter Email</label>
    <input type="email" id="email" placeholder="Enter Email">
    
    <label>Enter Address</label>
    <textarea id="address" placeholder="Enter Address"></textarea>
    
    <button onclick="submitForm()">Submit</button>
    
    <table id="result" style="display:none;">
        <tr>
            <th>Field</th>
            <th>Information</th>
        </tr>
        <tr><td>Name</td><td id="rname"></td></tr>
        <tr><td>Age</td><td id="rage"></td></tr>
        <tr><td>PRN</td><td id="rprn"></td></tr>
        <tr><td>Contact Number</td><td id="rcontact"></td></tr>
        <tr><td>Email</td><td id="remail"></td></tr>
        <tr><td>Address</td><td id="raddress"></td></tr>
    </table>
    
    <div class="footer">
        <p><b>Developed By</b></p>
        <p><b>Jayant Sonsare</b></p>
        <p>PRN : <b>24070521058</b></p>
    </div>
</div>
<script src="script.js"></script>
</body>
</html>
```

---

### Task 1.b — Form Validation and Dynamic DOM Binding

**File:** `EXP1/script.js`

The JavaScript logic extracts values entered into each input element via `document.getElementById()`, verifies that none of the required fields are empty, and dynamically updates the table text content before making the table visible.

```javascript
function submitForm()
{
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var prn=document.getElementById("prn").value;
    var contact=document.getElementById("contact").value;
    var email=document.getElementById("email").value;
    var address=document.getElementById("address").value;

    if(name=="" || age=="" || prn=="" || contact=="" || email=="" || address=="")
    {
        alert("Please fill all the fields.");
        return;
    }

    document.getElementById("rname").innerHTML=name;
    document.getElementById("rage").innerHTML=age;
    document.getElementById("rprn").innerHTML=prn;
    document.getElementById("rcontact").innerHTML=contact;
    document.getElementById("remail").innerHTML=email;
    document.getElementById("raddress").innerHTML=address;

    document.getElementById("result").style.display="table";

    alert("Form Submitted Successfully");
}
```

---

## Output

1. **Initial State:** The user is presented with a centered gradient portal containing form inputs for Name, Age, PRN, Contact Number, Email, and Address. The result table remains hidden (`display: none`).
2. **Validation Feedback:** If any field is left empty when clicking the **Submit** button, a browser alert displays `"Please fill all the fields."` and execution halts.
3. **Successful Submission:** When all inputs are provided, an alert displays `"Form Submitted Successfully"`, the results table is revealed with `display: table`, and every submitted field is rendered into its corresponding table row.

---

## Screenshot

![Student Registration Portal Output](Screenshot%202026-07-15%20210559.png)

---

## Result / Conclusion

Experiment 1 was successfully implemented and verified. The experiment demonstrates foundational web development principles in JavaScript, including retrieving values from form controls using `document.getElementById().value`, validating input completeness, manipulating element visibility via the style object (`style.display = "table"`), and updating DOM text content using `.innerHTML`.
