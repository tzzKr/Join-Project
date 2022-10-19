/**
 * 
 * 
 */
async function login() {
    let actualUser = {};
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    console.log(actualUser)
    if (user) {
        actualUser.name = user.name;
        actualUser.email = user.email;
        actualUser.contacts = user.contacts;
        actualUser = JSON.stringify(actualUser);
        sessionStorage.setItem('sessionUser', actualUser);
        window.location.href = 'summary.html';
    } else {
        alert('User not found. Please try again or sign up!');
    }
 }