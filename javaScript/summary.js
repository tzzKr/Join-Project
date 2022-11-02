/**
 * Renders an individual greeting message to the user or guest
 * 
 */
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

/**
 * Checks what time in the day it is to return a fitting message.
 * 
 * @returns A string depending on what time in the day it is (Good morning/afternoon/evening)
 */
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