/**
 * Checks if the submited values are in the database. If thats the case saves the user information
 * in the sessionStorage. Else gets an alert massege that the user ist not found. 
 * 
 */
async function login() {
    let actualUser;
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    if (user) {
        actualUser = user.name;
        actualUser = JSON.stringify(actualUser);
        sessionStorage.setItem('sessionUser', actualUser);
        window.location.href = 'summary.html';
    } else {
        alert('User not found. Please try again or sign up!');
    }
 }