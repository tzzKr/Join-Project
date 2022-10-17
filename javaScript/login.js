/**
 * 
 * 
 */

let actualUser = {};

async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    actualUser.name = user.name;
    actualUser.email = user.email;
    actualUser.contacts = user.contacts;
    console.log(actualUser)
    if (user) {
        window.location.href = 'summary.html';
    } else {
        alert('User not found. Please try again or sign up!');
    }
 }