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