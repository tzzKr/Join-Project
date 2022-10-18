function generateGreetingMessage() {
    let sessionUser = getSessionUser();
    document.getElementById('greeting-user').innerHTML = sessionUser.name;
}