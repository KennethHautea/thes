//auth status
auth.onAuthStateChanged( user => {
  if(user){
    console.log('login', user);
    setupUI(user);
    if(user.emailVerified){
      document.getElementById('emailnotif').style.display = 'none'
    } else {
      document.getElementById('emailnotif').style.display = 'block'
    }
    
  } else {
    
    console.log('logout');
     setupUI();
  }
});

//resendverification
btnresendverification.addEventListener('click', e =>{
  e.preventDefault();
  const user = auth.currentUser
  user.sendEmailVerification();
  alert("Verification Email Resent");
})

resetpassword.addEventListener('click', e =>{
  const resetEmail = document.getElementById('reset-email').value
  if(resetEmail != ""){
    auth.sendPasswordResetEmail(resetEmail).then( e => {
      alert('Email sent, Please check and verify');
    }).catch((error) => {
    const  errorMessage = error.message;
    alert(errorMessage);
    })

  } else {
    alert('Please enter your email first.');
  }
})
  
//view login password
function loginpassvisible() {
  var x = document.getElementById("login-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//view signup password
function signuppassvisible() {
  var x = document.getElementById("signup-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//login
btnlogin.addEventListener('click', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    $('#login').modal('hide');
    document.getElementById('login-form').reset();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(errorCode);
  })
 });

 function passvisible() {
  var x = document.getElementById("signup-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function passvisible() {
  var x = document.getElementById("login-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}




//signup
btnsignup.addEventListener('click', e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const name = document.getElementById('signup-name').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email, password)
  .then((cred) => {
    return db.collection('users').doc(cred.user.uid).set({
      name: name,
      email: email
    });
  }).then(() => {
    const userr = auth.currentUser;
    userr.sendEmailVerification();
    $('#signup').modal('hide');
    document.getElementById('signup-form').reset();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(errorCode);
  });
 });

//logout
function btnlogout(){
  auth.signOut();
  window.location.replace("index.html");
}