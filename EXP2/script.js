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