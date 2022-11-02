// Board arrays

let boardTasks;
let filterdTasks = [];

async function loadTasks() {
    await downloadFromServer();
    boardTasks = JSON.parse(backend.getItem('tasks')) || [];
    renderTodos(boardTasks);
}

function filterTasks() {
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase();

    if(search.length == 0)
        filterdTasks = boardTasks;
    else
        filterdTasks = boardTasks.filter( t => t.title.toLowerCase().startsWith(search) );

        renderTodos(filterdTasks);   
}
/**
 * Renders every task on board page
 * 
 * @param {Array} tasks all task informations
 */
function renderTodos(tasks) {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(tasks[i]);
    }
}

/**
 * Generates HTML script
 * @param {object} element all task informations
 * @returns board task HTML elements
 */
function generateTaskHTML(element) {

    return `<div draggable="true" ondragstart="" class="boardTask">
    <div class="categoryTag tag${element['category']}"> ${element['category']} </div>
    <div>
        <h3>${element['title']}</h3>
        <span class="taskDesc">${element['description']}</span>
    </div>
    <div class="progressContainer">
        <div class="progressBar">
            <div class="progressLine" style="width: ${element['progress']}">

            </div>
        </div>
        <p>1/3 Done</p>
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
            <img src="img/Prio-${element['prio']}.svg" alt="${element['prio']}"> 
        </div>
    </div>`
}




