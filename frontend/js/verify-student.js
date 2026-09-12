
document.addEventListener("DOMContentLoaded", function () {


    // Get registration information

    const storedData =
        localStorage.getItem("campusPlusRegistration");


    const statusElement =
        document.getElementById("verificationStatus");

    const continueButton =
        document.getElementById("continueVerification");


    const nameElement =
        document.getElementById("studentName");

    const prnElement =
        document.getElementById("studentPRN");

    const departmentElement =
        document.getElementById("studentDepartment");



    // If registration data is missing

    if (!storedData) {

        statusElement.textContent =
            "⚠️ Registration information was not found.";

        statusElement.style.background = "#fff0f0";

        statusElement.style.color = "#c0392b";

        continueButton.disabled = true;

        return;

    }



    const studentData =
        JSON.parse(storedData);



    // Display student information

    nameElement.textContent =
        studentData.fullName;

    prnElement.textContent =
        studentData.studentId;

    departmentElement.textContent =
        studentData.department;



    /*
     * TEMPORARY DEMONSTRATION
     *
     * In the final CampusPlus system,
     * Python backend will check these details
     * against the official college student database.
     */


    setTimeout(function () {


        statusElement.textContent =
            "✓ Student record found. Your information is eligible for verification.";


        statusElement.style.background =
            "#eefaf0";


        statusElement.style.color =
            "#176b2c";


        continueButton.disabled =
            false;


    }, 1500);



    // Continue to OTP

    continueButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "otp-verification.html";

        }
    );

});

