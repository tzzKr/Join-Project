let boardTasks = [
    {
    'id': 0,
    'category': 'done',
    'categoryTag': 'Design',
    'title': 'Hallo',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
    },
{
    'id': 1,
    'category': 'progress',
    'categoryTag': 'Design',
    'title': 'hallo',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
{
    'id': 3,
    'category': 'done',
    'categoryTag': 'Design',
    'title': 'Bye',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
{
    'id': 4,
    'category': 'progress',
    'categoryTag': 'Design',
    'title': 'Haus',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
}
];

let searchTasks = [];

function searchTitle() {
    searchTasks = new Array;
    let search = document.getElementById('board-input').value;
    search = search.toLowerCase();

    for (let i = 0; i < boardTasks.length; i++) {
        if (boardTasks[i]['title'].toLowerCase().includes(search)) {
            searchTasks.push(boardTasks[i]);
        }
    }
    console.log(`OnKeyDown: ${searchTasks}`)
    renderTodos(searchTasks);
}

function renderTodos(tasks){
    let todo = tasks.filter(t => t['category'] == 'todo');
    let progress = tasks.filter(t => t['category'] == 'progress');
    let testing = tasks.filter(t => t['category'] == 'testing');
    let done = tasks.filter(t => t['category'] == 'done');


    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateTaskHTML(element);
        
    }
    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('inProgress').innerHTML += generateTaskHTML(element);
        
    }
    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTaskHTML(element);
        
    }
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTaskHTML(element);
        
    }

}


function generateTaskHTML(element) {

    return `<div class="boardTask">
    <div class="categoryTag tag${element['categoryTag']}"> ${element['categoryTag']} </div>
    <div>
        <h3>${element['title']}</h3>
        <span class="taskDesc">${element['taskDesc']}</span>
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
            <img src="img/prio_${element['urgency']}.svg" alt=""> 
        </div>
    </div>`
}


// Close popups

function closeBoardTaskInfo() {
    let closeTaskInfo = document.getElementById('boardTaskInfo');
    let boardAddTask = document.getElementById('boardAddTask');
    closeTaskInfo.classList.add('d-none');
    boardAddTask.classList.add('d-none');
}
function showBoardAddTask () {
    let boardAddTask = document.getElementById('boardAddTask');
boardAddTask.classList.remove('d-none')
}