let x = window.matchMedia("(max-width: 760px)")

/**
 * If the screen is less than 768px wide, hide the boardParent div.
 * @returns Nothing.
 */
function openMobileInfo() {
    if (x.matches) {
        document.getElementById('boardParent').classList.add('d-none')
    } else {
        return
    }
}

/**
 * It removes the class 'd-none' from the element with the id 'boardParent'
 */
function closeMobileInfo() {
    document.getElementById('boardParent').classList.remove('d-none')
    
}

/**
 * It takes the index of the task that was clicked on, and then changes the board property of that task
 * to the next board in the sequence.
 * @param i - the index of the task in the array
 */
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
            boardSection = 'done';
            allowPush(i);
            break;
        case "done":
            break;
        default:
            break;
    }
    saveTasks();
    renderTodos(boardTasks);
}

/**
 * It takes the index of the task you want to move, and then it changes the board property of that task
 * to the previous board.
 * @param i - the index of the task in the array
 */
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
    saveTasks();
    renderTodos(boardTasks);
}

/**
 * If the board is todo, hide the previous board button. If the board is done, hide the next board
 * button.
 * @param i - the index of the task in the array
 * @param tasks - the array of objects
 */
function checkBoardPosition(i, tasks) {
    if (tasks[i].board == 'todo') 
        document.getElementById('prevBoard'+i).classList.add('d-none')
    if (tasks[i].board == 'done') 
        document.getElementById('nxtBoard'+i).classList.add('d-none')
}