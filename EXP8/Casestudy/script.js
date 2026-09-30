let products = [
    {
        name: "Laptop",
        category: "Electronics",
        price: 55000
    },
    {
        name: "Smartphone",
        category: "Electronics",
        price: 25000
    },
    {
        name: "T-Shirt",
        category: "Clothing",
        price: 799
    },
    {
        name: "Jeans",
        category: "Clothing",
        price: 1499
    },
    {
        name: "JavaScript Book",
        category: "Books",
        price: 599
    },
    {
        name: "Data Science Book",
        category: "Books",
        price: 899
    },
    {
        name: "Watch",
        category: "Accessories",
        price: 1999
    },
    {
        name: "Backpack",
        category: "Accessories",
        price: 1299
    }
];

let searchBox = document.getElementById("searchBox");
let category = document.getElementById("category");
let searchForm = document.getElementById("searchForm");
let clearBtn = document.getElementById("clearBtn");
let productList = document.getElementById("productList");
let errorMessage = document.getElementById("errorMessage");
let noProducts = document.getElementById("noProducts");

function displayProducts(productArray) {

    productList.innerHTML = "";

    if (productArray.length === 0) {
        noProducts.innerHTML = "No products found";
        return;
    }

    noProducts.innerHTML = "";

    productArray.forEach(function (product) {

        let div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="price">Price: ₹${product.price}</p>
        `;

        productList.appendChild(div);
    });
}

function filterProducts() {

    let searchText = searchBox.value.toLowerCase();
    let selectedCategory = category.value;

    if (!/^[A-Za-z ]*$/.test(searchBox.value)) {

        errorMessage.innerHTML =
            "Only letters and spaces are allowed.";

        productList.innerHTML = "";
        noProducts.innerHTML = "";

        return;
    }

    errorMessage.innerHTML = "";

    let filteredProducts = products.filter(function (product) {

        let matchesSearch =
            product.name.toLowerCase().includes(searchText);

        let matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

searchBox.addEventListener("input", function () {
    filterProducts();
});

category.addEventListener("change", function () {
    filterProducts();
});

clearBtn.addEventListener("click", function () {

    searchBox.value = "";
    category.value = "All";
    errorMessage.innerHTML = "";

    displayProducts(products);
});



displayProducts(products);