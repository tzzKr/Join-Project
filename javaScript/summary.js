let tasks;

/**
 * Renders an individual greeting message to the user or guest
 * 
 */
function renderGreetingMessage() {
    let sessionUser = getSessionUser();
    let message = getGreeting();
    if(sessionUser == 'Guest') {
        document.getElementById('greeting-message').innerHTML = message;
        document.getElementById('greeting-user').innerHTML = '';
    } else {
        document.getElementById('greeting-message').innerHTML = message + ',';
        document.getElementById('greeting-user').innerHTML = sessionUser;
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
    tasks = JSON.parse(await backend.getItem('tasks')) || [];
    renderSummaryInformations();
}


/**
 * Rendering task informations in the summary boards
 * 
 */
function renderSummaryInformations() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
    document.getElementById('tasksInProgress').innerHTML = getOccurrence('board', 'inProgress');
    document.getElementById('awaitingFeedback').innerHTML = getOccurrence('board', 'testing');
    document.getElementById('tasksUrgent').innerHTML = getOccurrence('prio', 'urgent');
    document.getElementById('upcomingDate').innerHTML = getNextUrgentDueDate();
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

/**
 * After filtering the tasks that are not done yet thru the priority urgent, 
 * it comperse the due dates and return the upcoming date 
 * 
 * @returns The next due date a task has thats in the board and not done yet
 */
function getNextUrgentDueDate() {
    let dates = [];
    tasks.forEach((v) => (v['prio'] === 'urgent' && v['board'] !== 'done' && dates.push(Date.parse(v['dueDate']))));
    dates.sort((date1, date2) => date1 - date2);
    if(dates.length > 0) {
        let upcomingDate = new Date(dates[0]);
        let month = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"]
                    [upcomingDate.getMonth()];
        upcomingDate = `${month} ${upcomingDate.getDate()}, ${upcomingDate.getFullYear()}`;
        return upcomingDate;
    } else {
        return 'No';
    }
}

/**
 * Checks if the window size is equal or less than 760px and than execute code in it.
 * 
 */
function mobileOperator() {
    if(window.innerWidth <= 760) {
        setTimeout(mobileGreetingDisapparator, 2000);
    } else {
        document.getElementById('welcome-message').style.width = 'auto';
        document.getElementById('welcome-message').style.height = 'auto';
    }  
}

/**
 * Disabled the welcome message element
 * 
 */
function mobileGreetingDisapparator() {
    document.getElementById('welcome-message').style.width = '0px';
    document.getElementById('welcome-message').style.height = '0px';
    document.getElementById('welcome-message').classList.add('d-none');
}