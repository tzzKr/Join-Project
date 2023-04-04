/**
 * It takes the email and password from the login form, checks if the user exists in the users array,
 * if it does, it sets the actualUser variable to the user's name, stringifies it and sets it to the
 * sessionStorage, then redirects to the summary page.
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
        initMsgBoxAlert('Password or E-Mail is wrong!');
    }
 }

/**
 * When the user clicks the button, the function will set the sessionStorage item 'sessionUser' to the
 * string 'Guest' and then redirect the user to the summary.html page.
 */
function guestLogin() {
    let actualUser = 'Guest';
    actualUser = JSON.stringify(actualUser);
    sessionStorage.setItem('sessionUser', actualUser);
    window.location.href = 'summary.html';
}