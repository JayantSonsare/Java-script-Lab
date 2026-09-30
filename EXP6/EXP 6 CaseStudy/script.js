function processData() {

    const text = document.getElementById("studentText").value;



    const nameRegex = /Student Name\s*:\s*(.+)/i;

    const rollRegex = /Roll Number\s*:\s*(\d+)/i;

    const emailRegex =
        /Email\s*:\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/i;

    const phoneRegex =
        /Phone\s*:\s*(\d+)/i;

    const departmentRegex =
        /Department\s*:\s*(.+)/i;




    const nameMatch = text.match(nameRegex);
    const rollMatch = text.match(rollRegex);
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    const departmentMatch = text.match(departmentRegex);


    const studentName =
        nameMatch ? nameMatch[1].trim() : "Not Found";

    const rollNumber =
        rollMatch ? rollMatch[1].trim() : "Not Found";

    const email =
        emailMatch ? emailMatch[1].trim() : "Not Found";

    const phone =
        phoneMatch ? phoneMatch[1].trim() : "Not Found";

    const department =
        departmentMatch
            ? departmentMatch[1].trim()
            : "Not Found";


    const emailValidationRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const validEmail =
        emailValidationRegex.test(email);




    const phoneValidationRegex =
        /^\d{10}$/;

    const validPhone =
        phoneValidationRegex.test(phone);



    const wordCount =
        text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;



    const characterCount =
        text.replace(/\s/g, "").length;

    const lowercaseText =
        text.toLowerCase();



    const replacedText =
        text.replace(
            /Computer Science/gi,
            "Information Technology"
        );


    document.getElementById("studentName").textContent =
        studentName;

    document.getElementById("rollNumber").textContent =
        rollNumber;

    document.getElementById("email").textContent =
        email;

    document.getElementById("phone").textContent =
        phone;

    document.getElementById("department").textContent =
        department;


    const emailResult =
        document.getElementById("emailValidation");

    if (validEmail) {

        emailResult.textContent = "Valid";

        emailResult.className = "valid";

    } else {

        emailResult.textContent = "Invalid";

        emailResult.className = "invalid";
    }



    const phoneResult =
        document.getElementById("phoneValidation");

    if (validPhone) {

        phoneResult.textContent =
            "Valid - Exactly 10 digits";

        phoneResult.className = "valid";

    } else {

        phoneResult.textContent =
            "Invalid - Must contain exactly 10 digits";

        phoneResult.className = "invalid";
    }



    document.getElementById("wordCount").textContent =
        wordCount;

    document.getElementById("characterCount").textContent =
        characterCount;


    document.getElementById("lowercaseText").textContent =
        lowercaseText;


    document.getElementById("replacedText").textContent =
        replacedText;
}