# Experiment No. 2

**Student Name:** Jayant Sonsare  
**PRN:** 24070521058  
**File Path:** `EXP2/index.html`, `EXP2/script.js`

---

## Experiment Title

**Online Shopping Bill Calculator**

---

## Software / Tools Required

1. Visual Studio Code / Antigravity IDE
2. Google Chrome (or modern web browser)
3. HTML5
4. CSS3
5. JavaScript (ES6)

---

## Experiment Program Code

### Task 2.a — Product Entry Interface and Output Bill Table

**File:** `EXP2/index.html`

The HTML document renders an online shopping bill calculator with input controls for Product Name, Unit Price (₹), and Quantity, an action button to compute total amounts, and a summary breakdown table.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Online Shopping Bill Calculator</title>
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
            padding: 30px;
        }
        .container {
            width: 700px;
            background: #fff;
            border-radius: 20px;
            padding: 35px;
            box-shadow: 0 15px 35px rgba(0,0,0,.3);
        }
        h1 {
            text-align: center;
            color: #0f172a;
        }
        p {
            text-align: center;
            color: gray;
            margin-bottom: 25px;
        }
        label {
            display: block;
            margin-top: 15px;
            margin-bottom: 8px;
            font-weight: bold;
            color: #1e293b;
        }
        input {
            width: 100%;
            padding: 14px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            font-size: 16px;
        }
        input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 8px rgba(37,99,235,.4);
        }
        button {
            width: 100%;
            padding: 15px;
            margin-top: 25px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
        }
        button:hover {
            background: #1d4ed8;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
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
            text-align: center;
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
        }
        .footer b {
            color: #1d4ed8;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Online Shopping Bill Calculator</h1>
    <p>Enter Product Details</p>

    <label>Product Name</label>
    <input type="text" id="product" placeholder="Enter Product Name">

    <label>Price (₹)</label>
    <input type="number" id="price" placeholder="Enter Price">

    <label>Quantity</label>
    <input type="number" id="quantity" placeholder="Enter Quantity">

    <button onclick="calculateBill()">Calculate Bill</button>

    <table id="billTable">
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Bill</th>
        </tr>
        <tr>
            <td id="pName">-</td>
            <td id="pPrice">-</td>
            <td id="pQty">-</td>
            <td id="totalBill">-</td>
        </tr>
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

### Task 2.b — Numerical Parsing and Bill Calculation Logic

**File:** `EXP2/script.js`

The JavaScript script retrieves user inputs, uses `parseFloat()` and `parseInt()` to parse currency and unit quantities, validates the numbers using `isNaN()`, computes the total bill (`price * quantity`), formats the currency to two decimal places with `toFixed(2)`, and updates the table cells.

```javascript
function calculateBill(){

    var product=document.getElementById("product").value;
    var price=parseFloat(document.getElementById("price").value);
    var quantity=parseInt(document.getElementById("quantity").value);

    if(product=="" || isNaN(price) || isNaN(quantity)){
        alert("Please enter all details.");
        return;
    }

    var total=price*quantity;

    document.getElementById("pName").innerHTML=product;
    document.getElementById("pPrice").innerHTML="₹"+price.toFixed(2);
    document.getElementById("pQty").innerHTML=quantity;
    document.getElementById("totalBill").innerHTML="₹"+total.toFixed(2);
}
```

---

## Output

1. **Initial State:** The card displays empty input fields and default hyphens (`-`) across Product, Price, Quantity, and Total Bill table columns.
2. **Validation Check:** If the product name is blank or either price or quantity is not a valid number (`isNaN`), the function generates an alert box: `"Please enter all details."`.
3. **Calculation & Formatted Display:** Upon valid input (e.g. Product: Laptop, Price: 55000, Quantity: 2), the total is computed as `₹110000.00` and immediately rendered into the bill table with formatted Rupee symbols.

---

## Screenshot

### Initial Input & Validation State
![Shopping Bill Calculator Interface](Screenshot%202026-07-15%20211403.png)

### Computed Bill Output
![Shopping Bill Calculation Result](Screenshot%202026-08-04%20001604.png)

---

## Result / Conclusion

Experiment 2 successfully demonstrated arithmetic operations, data type conversion, and DOM updates in JavaScript. Concepts reinforced include parsing floating-point and integer numbers (`parseFloat`, `parseInt`), validation with `isNaN()`, numerical formatting with `.toFixed(2)`, and dynamically binding calculated financial values to HTML table elements.
