
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

async function saveTasks() {
    await backend.setItem('tasks',JSON.stringify(boardTasks))
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
        let task = boardTasks.find(t => t.id == filterdTasks[i].id);
        let boardIndex = boardTasks.indexOf(task);
        
        checkProgress(tasks[i]);

        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(i);
        renderAssingedUser(boardIndex, i);
    }

}


function openTaskInfo(i) {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(i);
    document.getElementById('backgroundCloser').classList.remove('d-none');
    renderAssingedUserInfo(i);
    renderSubTasksInfo(i);
    emptySearch();
}



function closeMoreInfo() {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.add('d-none');
    document.getElementById('backgroundCloser').classList.add('d-none');
    filterTasks()

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
    console.log(boardTasks[index]['dueDate'])

    document.getElementById('editContainer').innerHTML = generateEditBoardTask(index);
    renderNewCategoryBoard();
    selectCategory(boardTasks[i].category, boardTasks[i].categoryColor);


    document.getElementById('moreInfoBg').classList.remove('d-none')
    document.getElementById('taskInfoContainer').classList.add('d-none')
    document.getElementById('backgroundCloser').classList.add('d-none')


}

function closeEditTool(i) {
    document.getElementById('moreInfoBg').classList.add('d-none')
    document.getElementById('editInfo').classList.add('d-none')
renderTodos(boardTasks)
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

function renderAssingedUserInfo(i) {
    document.getElementById('assignedUserInfo').innerHTML = '';

    for (let y = 0; y < boardTasks[i].assignedTo.length; y++) {

        document.getElementById('assignedUserInfo').innerHTML += /*html*/`
        <div class="assignedUserInfoParent">
            <div class="assignedUserImg" style="background-color: ${boardTasks[i].assignedTo[y].color}">
            ${getInitials(boardTasks[i].assignedTo[y].name)}
             </div>
            <p>${boardTasks[i].assignedTo[y].name}</p>
    </div>
        
        `
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

function renderSubTasksInfo(i) {
    
    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {


        document.getElementById('subTaskContainer').innerHTML += /*html*/`
        
        <div class="subtaskInfo">
            <input type="checkbox">
            <p>${boardTasks[i].subtasks[y].title}</p>
        </div>
        `
    }
}

function deleteTask(i) {

    boardTasks.splice(i,1);
    closeEditTool()
    filterdTasks = boardTasks
    emptySearch()
    renderTodos(boardTasks)
    saveTasks();
}