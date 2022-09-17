

let tasks = [{
    'id': 0,
    'category': 'todo',
    'categoryTag': 'Designs',
    'title': 'Hallo',
    'taskDesc': 'test',
    'progress': 0,
    'user' : 0,
    'urgency' : 'high',
}]

function renderTodos(){

    
}


function generateToDoHTML() {

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