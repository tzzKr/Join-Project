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
        checkProgress(tasks[i]);
        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(tasks[i]);
    

    }
    
}

/**
 * Generates HTML script
 * @param {object} element all task informations
 * @returns board task HTML elements
 */
function generateTaskHTML(element) {

    return /*html*/ `<div onclick="openTaskInfo(${element})" draggable="true" ondragstart="startDragging(${element['id']})" class="boardTask">
    <div class="categoryTag tag${element['category']}"> ${element['category']} </div>
    <div>
        <h3>${element['title']}</h3>
        <span class="taskDesc">${element['description']}</span>
    </div>
    <div class="progressContainer">
        <div class="progressBar">
            <div class="progressLine" style="width: ${element['progress']}%">

            </div>
        </div>
        <p>${element['progressNumber']}/3 Done</p>
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
            <img src="img/prio_${element['prio']}.svg" alt="${element['prio']}"> 
        </div>
    </div>`
}

function openTaskInfo(element) {
    let infoContainer =  document.getElementById('taskInfoContainer');
    infoContainer.innerHTML = generateTaskInfoHTML(element);
    infoContainer.classList.remove('d-none')
}

function generateTaskInfoHTML(element) {
    return /*html*/ `<div class="taskInfoBg">
    <div class="categoryTag tag${element['category']}"> ${element['category']} </div>
    
    <div> <b class="infoTitle">Lorem ipsum dolor sit amet </b> </div>
    <div> <span class="infoDesc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, ab? Et
            labore excepturi eius iusto nesciunt optio voluptatibus ad consequuntur illo cumque ipsa </span>
    </div>
    <div class="priorityInfo"> <b class="infoDesc">Due date:</b> <span class="infoDesc">05-08-2022</span> </div>
    <div class="priorityInfo"> <b class="infoDesc">Priority:</b> <div class="urgencyTagInfo"><p>high</p> <img style="height: 20px;" src="img/prio_high.svg" alt=""></div></div>
    <div class="priorityInfo"> <b class="infoDesc">Assigned To:</b>  </div>
    <div class="assingedUserInfoContainer">
        <div class="assingedUserInfo">
            <div class="assignedUserImg">GB</div> <span>Max Mustermann</span>
        </div>
    </div>
</div>`
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