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