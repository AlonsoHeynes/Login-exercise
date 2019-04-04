function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    verificar();
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

function ingreso(){
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Existe usuario activo");
    aparece(user);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    console.log(emailVerified);
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log("No existe usuario activo");
    contenido.innerHTML = `
    <div class="container mt-5">
    <div class="alert alert-warning" role="alert">
      <p>Sesión no iniciada.</p>
    </div>
    </div>
    `;
    // ...
  }
});
}
observador();

function aparece(user){
  var user2 = user;
  if(user2.emailVerified){
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = `
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">¡Bienvenido! ${user.email}</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <hr>
      <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
    <button class="btn btn-danger my-2 my-sm-0 btn-sm ml-2" type="button" name="button" onclick="cerrar()">Cerrar sesión</button>
    </div>
    `;
  }
}

function cerrar(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Cerrando sesión...");
  }).catch(function(error) {
    // An error happened.
    console.log("error");
  });
}

function verificar(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
  console.log("correo enviado...");
}
