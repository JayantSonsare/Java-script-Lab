// Array to store cart products
let cart = [];

function addProduct() {
    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let qty = parseInt(document.getElementById("qty").value);

    // Input validation
    if (name === "" || isNaN(price) || isNaN(qty)) {
        alert("Please enter all fields");
        return;
    }

    // Create product object
    let product = {
        id: cart.length + 1,
        name: name,
        price: price,
        quantity: qty
    };

    // Add product to cart
    cart.push(product);

    // Display cart
    displayCart();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
}

function displayCart() {
    let table = document.getElementById("cartTable");

    // Display table headings
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
    `;

    // Display products using forEach()
    cart.forEach(function(item) {
        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
            </tr>
        `;
    });

    // reduce() - Calculate total amount
    let total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    // Discount Logic
    let discount = 0;

    if (total >= 50000) {
        discount = total * 0.20;
    }
    else if (total >= 20000) {
        discount = total * 0.10;
    }
    else if (total >= 5000) {
        discount = total * 0.05;
    }

    // Calculate final amount
    let finalAmount = total - discount;

    // Display result
    document.getElementById("result").innerHTML = `
        <b>Total Amount:</b> ₹${total.toFixed(2)}<br>
        <b>Discount:</b> ₹${discount.toFixed(2)}<br>
        <b>Final Amount:</b> ₹${finalAmount.toFixed(2)}
    `;

    // map() - Create item summary
    let summary = document.getElementById("summary");
    summary.innerHTML = "";

    cart.map(function(item) {
        summary.innerHTML += `
            <li>${item.name} : ₹${item.price * item.quantity}</li>
        `;
    });

    // filter() - Find expensive products
    let expensive = document.getElementById("expensive");
    expensive.innerHTML = "";

    let exp = cart.filter(function(item) {
        return item.price > 1000;
    });

    // Display expensive products
    exp.forEach(function(item) {
        expensive.innerHTML += `
            <li>${item.name}</li>
        `;
    });
}