
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;
let categoriesBoard = [];
let contactsBoard;
let colors = [];
let boardSection;

/**
 * Get the contacts assigned to the board with the index i and render them.
 * @param i - the index of the board in the boards array
 */
async function getContactsBoard(i) {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let userName = sessionStorage.getItem('sessionUser');
    let user = users.find(u => u.name == JSON.parse(userName));
    contactsBoard = user.contacts;
    renderContactsAssigndToBoard(i);
}



/**
 * It takes the boardTasks array, converts it to a string, and saves it to the browser's local storage.
 */
async function saveTasks() {
    await backend.setItem('tasks', JSON.stringify(boardTasks))
}

/**
 * Load tasks from the server, and then render them.
 */
async function loadTasks() {
    await downloadFromServer();
    boardTasks = JSON.parse(backend.getItem('tasks')) || [];
    distributeIDs()
    filterdTasks = boardTasks;
    renderTodos(boardTasks);
}


/**
 * For each element in the boardTasks array, add a new property called 'id' and set it equal to the
 * index of the element in the array.
 */
function distributeIDs() {
    for (let i = 0; i < boardTasks.length; i++) {
        boardTasks[i]['id'] = i;
    };
}


// HALLO

/**
 * If the search input is empty, then the filtered tasks are the same as the board tasks. Otherwise,
 * the filtered tasks are the board tasks that start with the search input.
 */
function filterTasks() {
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase().trim();
    if (search.length > 0) {
        filterdTasks = boardTasks.filter(t => includesSearch(t, search));
        renderTodos(filterdTasks);
    } else {
        filterdTasks = boardTasks;
        renderTodos(boardTasks);
    }
}

function includesSearch(t, search) {
    return  t.title.toLowerCase().startsWith(search) || 
            t.description.toLowerCase().startsWith(search) ||
            t.category.toLowerCase().startsWith(search)
}


/**
 * Renders every task on board page"!
 * 
 * @param {Array} tasks all task informations
 */

function renderTodos(tasks) {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let task = boardTasks.find(t => t.id == filterdTasks[i].id);
        let boardIndex = boardTasks.indexOf(task);
        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(i, boardIndex);
        checkBoardPosition(i, tasks)
        renderAssignedUser(boardIndex, i);
        checkProgress(boardIndex);
        checkIfTaskFinished(boardIndex);
    }
}



/**
 * When the user starts dragging an element, set the currentDraggedElement variable to the id of the
 * element being dragged.
 * @param id - The id of the element that is being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

function changeBoard(board) {
    task.board = board;
}

/**
 * It prevents the default action of the event from happening.
 * @param ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * It moves the current dragged element to the board category that was passed in
 * @param boardCategory - The category of the board the task is being moved to.
 */
function moveTo(boardCategory) {
    boardTasks[currentDraggedElement]['board'] = boardCategory;
    boardSection = boardCategory;
    allowPush(currentDraggedElement);
    saveTasks();
    renderTodos(boardTasks);
}


/**
 * When the user clicks the button, toggle the class 'dragBackground' on the four divs.
 */
function toggleDragAreas() {
    document.getElementById('todo').classList.toggle('dragBackground');
    document.getElementById('inProgress').classList.toggle('dragBackground');
    document.getElementById('testing').classList.toggle('dragBackground');
    document.getElementById('done').classList.toggle('dragBackground');
}


/**
 * If the task is in the todo or done board, hide the progress bar. If the task has no subtasks, hide
 * the progress bar.
 * @param i - the index of the task in the array
 */
function checkProgress(i) {
    if (boardTasks[i].board == 'done') {
        document.getElementById('progressContainer' + i).classList.add('d-none');
    }
    if (boardTasks[i].subtasks.length == 0) {
        document.getElementById('progressContainer' + i).classList.add('d-none');
    }
    countCheckedSubtasks(i);
}

/**
 * It takes the index of a task in the boardTasks array, counts the number of subtasks, counts the
 * number of checked subtasks, and returns the percentage of checked subtasks.
 * @param i - the index of the task in the boardTasks array
 * @returns the percentage of subtasks that are checked.
 */
function countCheckedSubtasks(i) {
    let numberSubtask = boardTasks[i].subtasks.length;
    boardTasks[i].progressNumber = 0;
    for (let j = 0; j < numberSubtask; j++) {
        if (boardTasks[i].subtasks[j].status) {
            boardTasks[i].progressNumber++
        }
    }
    if (boardTasks[i].progressNumber == 0) {
        return '0'
    } else {
        return (boardTasks[i].progressNumber / numberSubtask) * 100
    }

}

/**
 * When the user clicks the search button, the search bar will be emptied.
 */
function emptySearch() {
    let search = document.getElementById('boardInput');
    search.value = ""
}



/**
 * It takes in a boardIndex and a locationIndex, and then it renders the assigned users for the board
 * at the boardIndex, and then it renders the assigned users for the location at the locationIndex.
 * @param boardIndex - The index of the board in the boardTasks array.
 * @param locationIndex - The index of the task in the boardTasks array.
 */
function renderAssignedUser(boardIndex, locationIndex) {
    const assignedUsers = boardTasks[boardIndex].assignedTo;
    const assignedUsersLength = assignedUsers.length;
    const maxUsersToDisplay = 2;
    const element = document.getElementById('assignedUser' + locationIndex);

    for (let y = 0; y < assignedUsersLength && y < maxUsersToDisplay; y++) {
        element.innerHTML += generateDisplayedCardUsers(y, assignedUsers);
    }

    if (assignedUsersLength > maxUsersToDisplay) {
        element.innerHTML += generateNotDisplayedCardUsers(assignedUsersLength, maxUsersToDisplay);
    }
}



/**
 * It takes the index of the task and the index of the subtask and toggles the status of the subtask.
 * @param i - the index of the task in the boardTasks array
 * @param y - the index of the subtask in the subtasks array
 */
function subtaskCheckedBoard(i, y) {
    boardTasks[i].subtasks[y].status = !boardTasks[i].subtasks[y].status;
    }


/**
 * If the number of checked subtasks is 100 or the number of subtasks is 0, then the task is finished.
 * @param i - the index of the task in the boardTasks array
 */
function checkIfTaskFinished(i) {
    if (countCheckedSubtasks(i) == 100 || boardTasks[i].subtasks.length == 0) {
        boardTasks[i].progress = true;
    } else {
        boardTasks[i].progress = false;
    }
}

/**
 * If the boardSection is 'done', then if the task's progress is true, then the task's board is 'done',
 * otherwise the task's board is 'testing' and a message box is displayed.
 * @param i - the index of the task in the array
 */
function allowPush(i) {
    
    if (boardSection == 'done') {
        if (boardTasks[i].progress == true) {
            boardTasks[i].board = "done";
        } else {
            boardTasks[i].board = "testing";
            initMsgBoxAlert('Subtasks not finished!');
        }
    }  
}