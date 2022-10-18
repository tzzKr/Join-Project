function renderGreetingMessage() {
    let sessionUser = getSessionUser();
    let message = getGreeting();
    if(sessionUser.name == 'guest') {
        document.getElementById('greeting-message').innerHTML = message;
        document.getElementById('greeting-user').innerHTML = '';
    } else {
        document.getElementById('greeting-message').innerHTML = message + ',';
        document.getElementById('greeting-user').innerHTML = sessionUser.name;
    }
}

function getGreeting() {
    let time = new Date();
    time = time.getHours();
    if(time >= 5 && time < 12) {
        return 'Good morning';
    }
    if(time >= 12 && time < 18) {
        return 'Good afternoon';
    }
    if(time >= 18 && time < 5) {
        return 'Good evening';
    }
}