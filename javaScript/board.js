
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;
let categoriesBoard = [];
let contactsBoard;
let colors = [];

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
 * Download the data from the server, then parse it and store it in the categoriesBoard variable.
 */
async function getTaskCatrgories() {
    await downloadFromServer();
    categoriesBoard = JSON.parse(backend.getItem('taskCategories')) || [];
}

/**
 * It saves the boardTasks array to the browser's local storage, then it loads the tasks from the local
 * storage.
 */


/**
 * This function saves the taskCategories array to local storage, and then calls the initMsgBox
 * function to display a message to the user.
 */
async function saveTaskCategories() {
    await backend.setItem('taskCategories', JSON.stringify(categoriesBoard));
    initMsgBox('New Category created!');
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
    boardTasks = JSON.parse(await backend.getItem('tasks')) || [];
    for (let i = 0; i < boardTasks.length; i++) {
        boardTasks[i]['id'] = i;
    }
    filterdTasks = boardTasks;
    renderTodos(boardTasks);
}

// HALLO

/**
 * If the search input is empty, then the filtered tasks are the same as the board tasks. Otherwise,
 * the filtered tasks are the board tasks that start with the search input.
 */
function filterTasks() {
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase().trim();
    if (search.length > 0){
        filterdTasks = boardTasks.filter(t => t.title.toLowerCase().startsWith(search));
    renderTodos(filterdTasks);
    }else {
        filterdTasks = boardTasks;
    renderTodos(boardTasks); 
    }
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
        renderAssingedUser(boardIndex, i);
        checkProgress(boardIndex);
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
    saveTasks();
    renderTodos(boardTasks);
}

/**
 * It adds the class 'dragBackground' to the four divs with the id's 'todo', 'inProgress', 'testing',
 * and 'done'.
 */
function showDragAreas() {
    document.getElementById('todo').classList.add('dragBackground');
    document.getElementById('inProgress').classList.add('dragBackground');
    document.getElementById('testing').classList.add('dragBackground');
    document.getElementById('done').classList.add('dragBackground');
}

/**
 * It removes the class 'dragBackground' from all of the divs with the id's 'todo', 'inProgress',
 * 'testing', and 'done'.
 */
function removeDragAreas() {
    document.getElementById('todo').classList.remove('dragBackground');
    document.getElementById('inProgress').classList.remove('dragBackground');
    document.getElementById('testing').classList.remove('dragBackground');
    document.getElementById('done').classList.remove('dragBackground');
}

/**
 * If the task is in the todo or done board, hide the progress bar. If the task has no subtasks, hide
 * the progress bar.
 * @param i - the index of the task in the array
 */
function checkProgress(i) {
    if (boardTasks[i].board == 'todo' || boardTasks[i].board == 'done') {
        document.getElementById('progressContainer' + i).classList.add('d-none');
    }
    if (boardTasks[i].subtasks.length == 0) {
        document.getElementById('progressContainer' + i).classList.add('d-none');
    }
    countCheckedSubtasks(i);
}

function countCheckedSubtasks(i) {
    let numberSubtask = boardTasks[i].subtasks.length;
    boardTasks[i].progressNumber = 0
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

function renderAssingedUser(boardIndex, locationIndex) {
    for (let y = 0; y < boardTasks[boardIndex].assignedTo.length; y++) {

        if (y == 2 && boardTasks[boardIndex].assignedTo.length > 3) {
            document.getElementById('assignedUser' + locationIndex).innerHTML += /*html*/`
            <div class="assignedUser">
                +${boardTasks[boardIndex].assignedTo.length - 2}
                    </div>`
            break
        }
        document.getElementById('assignedUser' + locationIndex).innerHTML += /*html*/`
            <div class="assignedUser" style="background-color: ${boardTasks[boardIndex].assignedTo[y].color}">
                ${getInitials(boardTasks[boardIndex].assignedTo[y].name)}
            </div>`
    }
}

/**
 * If the checkbox is checked, set the status of all subtasks to true, otherwise set the status of all
 * subtasks to false.
 * @param i - the index of the task in the array
 */
function subtaskCheckedBoard(i) {
    boardTasks[i].subtasks.forEach(subtask => {
        let checkBox = document.getElementById('subtaskCheckboxBoard' + subtask.id).checked;
        subtask.status = checkBox;
    });
}

