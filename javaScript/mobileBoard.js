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
    let boardBoard = boardTasks[i].board
    
    switch (boardBoard) {
        case "todo":
            boardBoard = "inProgress"
            break;
        case "inProgress":
            boardBoard = "testing"
            break;
        case "testing":
            boardBoard = "done"
            break;
        case "done":
            return
        
        default:
            break;
    }
    console.log('boardBoard :>> ', boardBoard);
    renderTodos(boardTasks);
}