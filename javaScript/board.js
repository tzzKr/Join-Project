

let boardTasks = [{
    'id': 0,
    'category': 'todo',
    'categoryTag': 'Designs',
    'title': 'Hallo',
    'taskDesc': 'test',
    'progress': 0,
    'user' : 0,
    'urgency' : 'high',
}];



function renderTodos(){
    let todo = boardTasks.filter(t => t['category'] == 'todo');
    let progress = boardTasks.filter(t => t['category'] == 'progress');
    let testing = boardTasks.filter(t => t['category'] == 'testing');
    let done = boardTasks.filter(t => t['category'] == 'done');


    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    
    for (let i = 0; i < todo.length; i++) {
        const taskTD = todo[i];
        document.getElementById('todo').innerHTML += generateTaskHTML(i);
        
    }
    for (let i = 0; i < progress.length; i++) {
        const taskPGS = progress[i];
        document.getElementById('inProgress').innerHTML += generateTaskHTML(i);
        
    }
    for (let i = 0; i < testing.length; i++) {
        const taskTST = testing[i];
        document.getElementById('testing').innerHTML += generateTaskHTML(i);
        
    }
    for (let i = 0; i < done.length; i++) {
        const taskDNE = done[i];
        document.getElementById('done').innerHTML += generateTaskHTML(i);
        
    }

}


function generateTaskHTML() {

    return `<div class="boardTask">
    <div class="categoryTag tagDesign"> Designs </div>
    <div>
        <h3>Hallo</h3>
        <span class="taskDesc">Farben müssen ferig gestellt werden und in eine funktion gepackt
            werden</span>
    </div>
    <div class="progressContainer">
        <div class="progressBar">
            <div class="progressLine">

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
            <img src="img/prio_high.svg" alt="">
        </div>
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