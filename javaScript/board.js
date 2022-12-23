/**
    * @description      : 
    * @author           : hosny
    * @group            : 
    * @created          : 24/11/2022 - 21:38:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/11/2022
    * - Author          : hosny
    * - Modification    : 
**/
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;

async function loadTasks() {
    await downloadFromServer();
    boardTasks = JSON.parse(await backend.getItem('tasks')) || [];
    filterdTasks = boardTasks;
    renderTodos(filterdTasks);
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
        checkProgress(tasks[i]);
        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(i);
    

    }
    
}

/**
 * Generates HTML script
 * @param {object} element all task informations
 * @returns board task HTML elements
 */
function generateTaskHTML(i) {

    
    return /*html*/ `<div onclick="openTaskInfo(${i})" draggable="true" ondragstart="startDragging(${filterdTasks[i]['id']})" class="boardTask">
    <div class="categoryTag tag${filterdTasks[i]['category']}"> ${filterdTasks[i]['category']} </div>
    <div>
        <h3>${filterdTasks[i]['title']}</h3>
        <span class="taskDesc">${filterdTasks[i]['description']}</span>
    </div>
    <div class="progressContainer">
        <div class="progressBar">
            <div class="progressLine" style="width: ${filterdTasks[i]['progress']}%">

            </div>
        </div>
        <p>${filterdTasks[i]['progressNumber']}/3 Done</p>
    </div>
    <div class="user_urgency">
        <div class="assignedTo">
            <div class="assignedUser">
                HF
            </div>
            <div class="assignedUser">
                YM
            </div>
            <div class="assignedUser">
                GB
            </div>
        </div>
        <div class="urgency">
            <img src="img/prio_${filterdTasks[i]['prio']}.svg" alt="${filterdTasks[i]['prio']}"> 
        </div>
    </div>`
}

function openTaskInfo(i) {
    let infoContainer =  document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(filterdTasks[i]);
    document.getElementById('backgroundCloser').classList.remove('d-none');
    console.log(filterdTasks[i])
}

function generateTaskInfoHTML(element) {
    return /*html*/ `<div class="taskInfoBg">
    <div class="categoryTag tag${element['category']}"> ${element['category']} </div>
    
    <div> <b class="infoTitle">${element['title']}</b> </div>
    <div> <span class="infoDesc">${element['description']}</span>
    </div>
    <div class="priorityInfo"> <b class="infoDesc">Due date:</b> <span class="infoDesc">${element['dueDate']}</span> </div>
    <div class="priorityInfo"> <b class="infoDesc">Priority:</b> <div class="urgencyTagInfo"><p>${element['prio']}</p> <img style="height: 20px;" src="img/prio_high.svg" alt=""></div></div>
    <div class="priorityInfo"> <b class="infoDesc">Assigned To:</b>  </div>
    <div class="assingedUserInfoContainer">
        <div class="assingedUserInfo">
            <div class="assignedUserImg">GB</div> <span>Max Mustermann</span>
        </div>
    </div>
</div>`
}

function closeMoreInfo() {
    let infoContainer =  document.getElementById('taskInfoContainer');
    infoContainer.classList.add('d-none');
    document.getElementById('backgroundCloser').classList.add('d-none');
    
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

function checkProgress(element) {
    
    console.log(element['board'])
    if (element['board'] == 'todo') {
        element['progress'] = 0;
        element['progressNumber'] = 0;
    }
    if (element['board'] == 'inProgress') {
        element['progress'] = 33;
        element['progressNumber'] = 1;

    }
    if (element['board'] == 'testing') {
        element['progress'] = 66;
        element['progressNumber'] = 2;

    }
    if (element['board'] == 'done') {
        element['progress'] = 100;
        element['progressNumber'] = 3;

    }

}