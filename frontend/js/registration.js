
document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        // Get registration information
        const studentData = {

            fullName:
                document.getElementById("fullName").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            mobile:
                document.getElementById("mobile").value.trim(),

            studentId:
                document.getElementById("studentId").value.trim(),

            department:
                document.getElementById("department").value,

            year:
                document.getElementById("year").value,

            division:
                document.getElementById("division").value,

            rollNumber:
                document.getElementById("rollNumber").value,

            password:
                password,

            verificationStatus:
                "PENDING"

        };


        /*
         * TEMPORARY FRONTEND DEMO
         *
         * Later this information will be sent
         * to the Python + MySQL backend.
         *
         * Password must NOT be stored in localStorage
         * in the final version.
         */

        localStorage.setItem(
            "campusPlusRegistration",
            JSON.stringify(studentData)
        );


        // Move to student verification
        window.location.href =
            "verify-student.html";

    });

