
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;
let categoriesBoard = [];
let contactsBoard;
let colors = [];


async function getTaskCatrgories() {
    await downloadFromServer();
    categoriesBoard = JSON.parse(backend.getItem('taskCategories')) || [];
}

async function saveTaskCategories() {
    await backend.setItem('taskCategories', JSON.stringify(categoriesBoard));
    initMsgBox('New Category created!');
}

async function saveTasks() {
    await backend.setItem('tasks', JSON.stringify(boardTasks))
}

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

function filterTasks() {
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase();

    if (search.length == 0)
        filterdTasks = boardTasks;
    else
        filterdTasks = boardTasks.filter(t => t.title.toLowerCase().startsWith(search));

    renderTodos(filterdTasks);
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











function startDragging(id) {
    currentDraggedElement = id;

}

function allowDrop(ev) {
    ev.preventDefault();

}

function moveTo(boardCategory) {
    boardTasks[currentDraggedElement]['board'] = boardCategory;
    saveTasks();
}

async function saveTasks() {
    await backend.setItem('tasks', JSON.stringify(boardTasks));
    loadTasks();
}

function showDragAreas() {
    document.getElementById('todo').classList.add('dragBackground');
    document.getElementById('inProgress').classList.add('dragBackground');
    document.getElementById('testing').classList.add('dragBackground');
    document.getElementById('done').classList.add('dragBackground');

}
function removeDragAreas() {
    document.getElementById('todo').classList.remove('dragBackground');
    document.getElementById('inProgress').classList.remove('dragBackground');
    document.getElementById('testing').classList.remove('dragBackground');
    document.getElementById('done').classList.remove('dragBackground');
}

function checkProgress(i) {

    if (boardTasks[i].board == 'todo' || boardTasks[i].board == 'done') {
        document.getElementById('progressContainer'+i).classList.add('d-none');  
    }
    if (boardTasks[i].subtasks.length == 0) {   
        document.getElementById('progressContainer'+i).classList.add('d-none');
    }
    countCheckedSubtasks(i)
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
}else {
return (boardTasks[i].progressNumber / numberSubtask) * 100

}

}


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


function subtaskCheckedBoard(i) {
    let checkBox = document.getElementById('subtaskCheckboxBoard' + i).checked;
    
    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        console.log(checkBox)
        if (checkBox) {
            boardTasks[i].subtasks[y].status = true;
        } else {
            boardTasks[i].subtasks[y].status = false;

        }
    }
}

async function getContactsBoard(i) {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let userName = sessionStorage.getItem('sessionUser');
    let user = users.find(u => u.name == JSON.parse(userName));
    contactsBoard = user.contacts;
    renderContactsAssigndToBoard(i);
}