const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})

// For Sign Up Forms
const form = document.getElementById("align");
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const emailAddress = document.getElementById('email-address');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm-pass');
const errorMsg = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let somethingIDK = new Array();
    if (firstName.value === '' || firstName.value == null) {
        firstName.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter your First Name')
    }    

    if (lastName.value === "" || lastName.value == null) {
        lastName.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter your Last Name');
    }

    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    if (!emailValid.test(emailAddress.value)) {
        emailAddress.style.setProperty('border', '2px solid red');
        somethingIDK.push('Please enter a valid Email')
    } 
    
    if (password.value.length <= 6) {
        password.style.setProperty("border", "2px solid red");
        somethingIDK.push('Password must be longer than 6 characters')
    }
    
    if (confirm.value !== password.value) {
        confirm.style.setProperty("border", "2px solid red");
        password.style.setProperty("border", "2px solid red");
        somethingIDK.push("Password and confirmation password don't match");
    }

    if (somethingIDK.length > 0) {
        e.preventDefault();
        errorMsg.innerText = somethingIDK.join(', ');
    }
})

// Show Password Function
function showPass() {
    let pass = document.getElementById("password");
    let passConfirm = document.getElementById("confirm-pass");
    if (pass.type === "password" || passConfirm === "confirm-pass") {
        pass.type = "text";
        passConfirm.type = "text";
    } else {
        pass.type = "password";
        passConfirm.type = "password";
    }
}

$('.check').change(function() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email = $('#email-address').val();
    var password = $('#password').val();
    var confirm = $('#confirm-pass').val();

    if (firstName == '' || lastName == '' || email == '' || password == '' || confirm == "" || password != confirm) {
        $('#signIn').attr('disabled', 'disabled');
    } else {
        $('#signIn').removeAttr('disabled');
    }
});

// Code Resource Links:
// https://www.codespot.org/javascript-email-validation/
// https://www.w3schools.com/howto/howto_css_searchbar.asp
// https://firebase.google.com/docs/auth/android/manage-users#get_a_users_profile
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#fetchSignInMethodsForEmail
// https://www.geeksforgeeks.org/how-to-disable-a-button-in-jquery-dialog-from-a-function/