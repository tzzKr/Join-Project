let x = window.matchMedia("(max-width: 760px)")


function openMobileInfo() {
    if (x.matches) {
        document.getElementById('boardParent').classList.add('d-none')
    } else {
        return
    }
}

function closeMobileInfo() {
    document.getElementById('boardParent').classList.remove('d-none')
    
}

function nextBoard(i) {
    
    switch (boardTasks[i].board) {
        case "todo":
            boardTasks[i].board = "inProgress"
            break;
        case "inProgress":
            boardTasks[i].board = "testing"
            break;
        case "testing":
            boardTasks[i].board = "done"
            break;
        case "done":
            break;
        default:
            break;
    }
    console.log('boardBoard :>> ', boardTasks[i].board);

    renderTodos(boardTasks);
}

function prevBoard(i) {
    switch (boardTasks[i].board) {
        case "todo":
            break;
        case "inProgress":
            boardTasks[i].board = "todo"
            break;
        case "testing":
            boardTasks[i].board = "inProgress"
            break;
        case "done":
            boardTasks[i].board = "testing"

            break;
        default:
            break;
    }
    console.log('boardBoard :>> ', boardTasks[i].board);
    saveTasks();
    renderTodos(boardTasks);
}


function checkBoardPosition(i, tasks) {
    if (tasks[i].board == 'todo') {
        document.getElementById('prevBoard'+i).classList.add('d-none')
    }
    if (tasks[i].board == 'done') {
        document.getElementById('nxtBoard'+i).classList.add('d-none')
    }
}