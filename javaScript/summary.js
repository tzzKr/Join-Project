let tasks;

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
    loadTasksFromServer();
}

/**
 * Checks what time in the day it is to return a fitting message.
 * 
 * @returns A string depending on what time in the day it is (Good morning/afternoon/evening)
 */
function getGreeting() {
    let time = new Date();
    console.log(time)
    time = time.getHours();
    
    if(time >= 5 && time < 12) {
        return 'Good morning';
    }
    if(time >= 12 && time < 18) {
        return 'Good afternoon';
    }
    if((time >= 18 && time < 24) || (time >= 0 && time < 5)) {
        return 'Good evening';
    }
}

/**
 * Loading task array from server
 *  
 */
async function loadTasksFromServer() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    renderSummaryInformations();
}


/**
 * Rendering task informations in the summary boards
 * 
 */
function renderSummaryInformations() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
    document.getElementById('tasksInProgress').innerHTML = getOccurrence('board', 'inProgress');
    document.getElementById('awaitingFeedback').innerHTML = getOccurrence('boad', 'testing');
    document.getElementById('tasksUrgent').innerHTML = getOccurrence('prio', 'urgent');
    //document.getElementById('upcomingDate').innerHTML =
    document.getElementById('tasksInToDo').innerHTML = getOccurrence('board', 'todo');
    document.getElementById('tasksInDone').innerHTML = getOccurrence('board', 'done');
}

/**
 * Gets you the number how often a value is counted in tasks[i].subelement
 * 
 * @param {string} subelement - subelement thats stored inside the task object in the tasks array 
 * @param {string} value - value that you wanne search for
 * @returns the count number 
 */
function getOccurrence(subelement, value) {
    let count = 0;
    tasks.forEach((v) => (v[subelement] === value && count++));
    return count;
}