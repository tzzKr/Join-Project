function openEditTool(i) {


    let task = boardTasks.find(t => t.id == filterdTasks[i].id);
    let index = boardTasks.indexOf(task);
    console.log(boardTasks[index]['dueDate'])

    document.getElementById('editContainer').innerHTML = generateEditBoardTask(index);
    
    document.getElementById('moreInfoBg').classList.remove('d-none')
    document.getElementById('taskInfoContainer').classList.add('d-none')
    document.getElementById('backgroundCloser').classList.add('d-none')
    
    selectCategory(boardTasks[i].category, boardTasks[i].categoryColor);
    getContactsBoard(i);
    showSelectedBtnEdit(i);
    renderSubTasksEdit(i)
}

function closeEditTool() {
    document.getElementById('moreInfoBg').classList.add('d-none')
    document.getElementById('editInfo').classList.add('d-none')
    renderTodos(boardTasks)
}

function renderSubTasksEdit(i) {

    document.getElementById('subTaskContainerEdit').innerHTML = '';

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {

        if (!boardTasks[i].subtasks[y].status) {
            document.getElementById('subTaskContainerEdit').innerHTML += /*html*/`
            <div class="subTaskParent">
                
                <div class="subtaskInfo">
                    <input id="subtaskCheckboxBoard" onclick="subtaskCheckedBoard(${i})" type="checkbox">
                    <p>${boardTasks[i].subtasks[y].title}</p>
                </div>
                
                <div class="delete-img">
                     <img src="img/trash.png" class="delete-subtask-trash" onclick="deleteSubtaskBoard(${i})">
                </div>
            </div>
            `
        }else {
            document.getElementById('subTaskContainerEdit').innerHTML += /*html*/`       
             <div class="subTaskParent">
                
                <div class="subtaskInfo">
                    <input checked id="subtaskCheckboxBoard" onclick="subtaskCheckedBoard(${i})" type="checkbox">
                    <p>${boardTasks[i].subtasks[y].title}</p>
                </div>
                
                <div class="delete-img">
                     <img src="img/trash.png" class="delete-subtask-trash" onclick="deleteSubtaskBoard(${i})">
                </div>
            </div>
            `
            
        }
    }
}


function deleteTask(i) {

    boardTasks.splice(i, 1);
    closeEditTool()
    filterdTasks = boardTasks
    emptySearch()
    renderTodos(boardTasks)
    saveTasks();
}

function showSelectedBtnEdit(i) {

    if (boardTasks[i].prio == 'urgent') {
        document.getElementById("urgentBoard").style.backgroundColor = "#FF3D00";
        document.getElementById('urgentBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    } else if (boardTasks[i].prio == 'medium') {
         document.getElementById("mediumBoard").style.backgroundColor = "#FFA800";
        document.getElementById('mediumBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    } else if (boardTasks[i].prio == 'low') {
        document.getElementById("lowBoard").style.backgroundColor = "#8BE644";
        document.getElementById('lowBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    }
}

function deleteSubtaskBoard(i) {
    boardTasks[i].subtasks.splice(i, 1);
    renderSubTasksEdit(i);
    console.log(boardTasks[i].subtasks);
    initMsgBox('Subtask is deleted!');

}

function addSubtaskBoard(i) {
    let inputSubtask = document.getElementById('inputSubtaskBoard').value;
    if (inputSubtask) {
        let subtask = {title: inputSubtask, status: false};
        boardTasks[i].subtasks.push(subtask);
    } 
    document.getElementById('inputSubtaskBoard').value = ``;
    renderSubTasksEdit(i);
}

function toggleColorPrio(button) {
    // Reset the color for all buttons
    resetColorButton();
    // Set the color for the selected button
    setColorbutton(button);
  }

function resetColorButton() {
    document.getElementById("urgentBoard").style.backgroundColor = "#FFFFFF";
      document.getElementById("mediumBoard").style.backgroundColor = "#FFFFFF";
      document.getElementById("lowBoard").style.backgroundColor = "#FFFFFF";
      document.getElementById('urgentBoard-img').style.filter = 'none';
      document.getElementById('mediumBoard-img').style.filter = 'none';
      document.getElementById('lowBoard-img').style.filter = 'none';
}


function setColorbutton(button) {
    switch (button.id) {
        case "urgentBoard":
          document.getElementById("urgentBoard").style.backgroundColor = "#FF3D00";
        document.getElementById('urgentBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
        
          break;
        case "mediumBoard":
          document.getElementById("mediumBoard").style.backgroundColor = "#FFA800";
        document.getElementById('mediumBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
          
          break;
        case "lowBoard":
          document.getElementById("lowBoard").style.backgroundColor = "#8BE644";
        document.getElementById('lowBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
          
          break;
        default:
          break;
      }
}

  function renderContactsAssigndToBoard(i) {
    let array1 = boardTasks[i].assignedTo;
    let array2 = contactsBoard;
    let uniqueContacts = new Set();
    let mergedCantacts = [];

    mergeContacts(array1,array2,uniqueContacts,mergedCantacts)
    generateAssignedContacts(mergedCantacts);

    
}

function mergeContacts(array1,array2,uniqueContacts,mergedCantacts) {
    for (const element of array1.concat(array2)) {
        if (!uniqueContacts.has(element.name)) {
            uniqueContacts.add(element.name);
            mergedCantacts.push(element);
        }
    }
}