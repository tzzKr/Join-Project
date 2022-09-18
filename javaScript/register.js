function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    usres.push({ name: name.value, email: email.value, password: password.value });
    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    window.location.href = 'login.html';
}