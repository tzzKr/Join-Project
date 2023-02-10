function openTaskInfo(i) {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(i);
    document.getElementById('backgroundCloser').classList.remove('d-none');
    renderAssingedUserInfo(i);
    renderSubTasksInfo(i);
    showSelectedBtn(i)
    emptySearch();
}

function closeMoreInfo() {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.add('d-none');
    document.getElementById('backgroundCloser').classList.add('d-none');
    filterTasks();
    
}

function closeAndSaveInfo() {
    
    saveTasks();
    closeMoreInfo();
    renderTodos(boardTasks);
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

function renderSubTasksInfo(i) {



    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {

        if (!boardTasks[i].subtasks[y].status) {
            document.getElementById('subTaskContainer').innerHTML += /*html*/`
            <div class="subtaskInfo">
                <input onclick="subtaskCheckedInfo(${i})" id="subtaskCheckboxInfo${y}" type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
            </div>
            `
        }else {
            document.getElementById('subTaskContainer').innerHTML += /*html*/`
        
            <div class="subtaskInfo">
                <input onclick="subtaskCheckedInfo(${i})" id="subtaskCheckboxInfo${y}" checked type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
            </div>
            `
        }
    }
}

function subtaskCheckedInfo(i) {
  
    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        
        let checked = document.getElementById('subtaskCheckboxInfo' + y).checked
        
        if (checked) {
            boardTasks[i].subtasks[y].status = true;
        } else {
            boardTasks[i].subtasks[y].status = false;
        }
        console.log(boardTasks[i].subtasks[y])
    }
}

function showSelectedBtn(i) {
    


    if (boardTasks[i].prio == 'urgent') {
        document.getElementById("urgentBoardInfo").style.backgroundColor = "#FF3D00";
        document.getElementById('urgentBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
       
    } else if (boardTasks[i].prio == 'medium') {
        document.getElementById("mediumBoardInfo").style.backgroundColor = "#FFA800";
        document.getElementById('mediumBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
       
    } else if (boardTasks[i].prio == 'low') {
        document.getElementById("lowBoardInfo").style.backgroundColor = "#8BE644";
        document.getElementById('lowBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
       
    }
   
}