
document.addEventListener("DOMContentLoaded", function () {


    const storedData =
        localStorage.getItem("campusPlusRegistration");


    const emailDisplay =
        document.getElementById("emailDisplay");

    const otpForm =
        document.getElementById("otpForm");

    const otpInput =
        document.getElementById("otp");

    const message =
        document.getElementById("message");

    const resendOtp =
        document.getElementById("resendOtp");



    // If registration information is missing

    if (!storedData) {

        window.location.href =
            "registration.html";

        return;

    }



    const studentData =
        JSON.parse(storedData);



    // Display email

    emailDisplay.textContent =
        studentData.email;



    /*
     * TEMPORARY DEMO OTP
     *
     * Use 123456 for the first verification.
     *
     * Later the Python backend will:
     * 1. Generate a secure OTP.
     * 2. Send it to the college email.
     * 3. Verify the OTP securely.
     */

    let demoOTP = "123456";



    // OTP input: numbers only

    otpInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

        }
    );



    // Verify OTP

    otpForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const enteredOTP =
                otpInput.value.trim();



            if (enteredOTP.length !== 6) {

                message.textContent =
                    "Please enter a valid 6-digit OTP.";

                message.style.color =
                    "#c0392b";

                return;

            }



            if (enteredOTP === demoOTP) {


                studentData.verificationStatus =
                    "VERIFIED";


                localStorage.setItem(
                    "campusPlusRegistration",
                    JSON.stringify(studentData)
                );


                message.textContent =
                    "✓ Account verified successfully!";


                message.style.color =
                    "#198754";


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1500);


            } else {


                message.textContent =
                    "Incorrect OTP. Please try again.";


                message.style.color =
                    "#c0392b";


                otpInput.value = "";

            }

        }
    );



    // Resend OTP

    resendOtp.addEventListener(
        "click",
        function () {


            demoOTP =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ).toString();


            message.textContent =
                "A new verification code has been generated for this demo.";


            message.style.color =
                "#198754";


            /*
             * For demonstration only.
             * Open browser console (F12)
             * to see the new OTP.
             */

            console.log(
                "Demo OTP:",
                demoOTP
            );

        }
    );

});

