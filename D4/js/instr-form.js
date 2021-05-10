var firebaseConfig = {
    apiKey: "AIzaSyBqDv2ClaYawwiiy4DBid_KU-L4uR1r99I",
    authDomain: "qcfirst-instructor.firebaseapp.com",
    projectId: "qcfirst-instructor",
    storageBucket: "qcfirst-instructor.appspot.com",
    messagingSenderId: "1017506719240",
    appId: "1:1017506719240:web:d1dae44709c9bb037d53bd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp() {
    var email = document.getElementById("email-address");
    var firstname = document.getElementById("first-name");
    var lastname = document.getElementById("last-name");
    var password = document.getElementById("password");
    var confirm = document.getElementById("confirm-pass");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            alert('Email is already registered. Redirecting you to Instructor Sign In page...');
            window.location.href = "instr-signIn.html";
            return;
        }
    })
}

function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    .then((response) => {
        alert("Success");
        window.location.href = "instr-home.html";
    })
    .catch((error) => {
        if (error.code === 'auth/wrong-password') {
            alert("Incorrect password");
        }
        if (error.code === 'auth/user-not-found') {
            alert("User not found");
        }
    })
}

function signOut() {
    FirebaseAuth.getInstance().signOut();
    alert("Signed Out");
}
