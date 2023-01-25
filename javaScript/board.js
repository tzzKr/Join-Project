
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;
let categoriesBoard = [];


async function getTaskCatrgories() {
    await downloadFromServer();
    categoriesBoard = JSON.parse(backend.getItem('taskCategories')) || [];
}

async function saveTaskCategories() {
    await backend.setItem('taskCategories', JSON.stringify(categoriesBoard));
    initMsgBox('New Category created!');
}

async function loadTasks() {
    await downloadFromServer();
    boardTasks = JSON.parse(await backend.getItem('tasks')) || [];
    for (let i = 0; i < boardTasks.length; i++) {
        boardTasks[i]['id'] = i;
    }
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


function openTaskInfo(i) {
    let infoContainer =  document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(i);
    document.getElementById('backgroundCloser').classList.remove('d-none');
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

function openEditTool(i) {
    

let task = boardTasks.find(t => t.id == filterdTasks[i].id);
let index = boardTasks.indexOf(task);
document.getElementById('editContainer').innerHTML = generateEditBoardTask(index);
renderNewCategoryBoard();


document.getElementById('moreInfoBg').classList.remove('d-none')
document.getElementById('taskInfoContainer').classList.add('d-none')
document.getElementById('backgroundCloser').classList.add('d-none')


}

function closeEditTool(i) {
document.getElementById('moreInfoBg').classList.add('d-none')
document.getElementById('editInfo').classList.add('d-none')
    
}

function renderNewCategoryBoard() {
    document.getElementById('mainCategoriesBoard').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategoriesBoard').innerHTML += `
        <div onclick="selectCategory('${categories[i].name}', '${categories[i].color}')" class="options">
            <p>${categories[i].name}</p>
            <div id="categoryColorDivBoard${i}" class="listContactInitials contactScale left"></div>
        </div>`;
        document.getElementById(`categoryColorDivBoard${i}`).style.backgroundColor = categories[i].color;
    }
}