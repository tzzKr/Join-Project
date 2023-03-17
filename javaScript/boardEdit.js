let mergedContacts = [];
let currentPrio;


/**
 * It opens a modal window with a form to edit a task.
 * @param i - the index of the task in the filtered array
 */
function openEditTool(i) {
    // let task = boardTasks.find(t => t.id == filterdTasks[i].id);
    // let index = boardTasks.indexOf(task);
    document.getElementById('taskInfoContainer').innerHTML = generateEditBoardTask(i);
    document.getElementById('moreInfoBg').classList.remove('d-none')
    document.getElementById('backgroundCloser').classList.add('d-none')
    currentPrio = boardTasks[i].prio;
    selectCategory(boardTasks[i].category, boardTasks[i].categoryColor);
    getContactsBoard(i);
    showSelectedBtnEdit(i);
    renderSubTasksEdit(i)
}


/**
 * It adds the class 'd-none' to the elements with the IDs 'moreInfoBg' and 'editInfo' and then calls
 * the function renderTodos(boardTasks) and sets the variable numberAssingendUserEdit to 0.
 */
function closeEditTool() {
    document.getElementById('moreInfoBg').classList.add('d-none')
    document.getElementById('editInfo').classList.add('d-none')
    document.getElementById('taskInfoContainer').classList.add('d-none')
    closeMobileInfo();
    filterdTasks = boardTasks;
    renderTodos(boardTasks);
    numberAssingendUserEdit = 0;
}




/**
 * It takes the index of the task that is being edited, and then loops through the subtasks of that
 * task, and then generates the HTML for each subtask
 * @param i - the index of the task in the boardTasks array
 */
function renderSubTasksEdit(i) {
    const subTaskContainerEdit = document.getElementById('subTaskContainerEdit');
    subTaskContainerEdit.innerHTML = '';

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        const subtaskHTML = generateSubtaskBoard(i, y, boardTasks[i].subtasks[y]);
        subTaskContainerEdit.innerHTML += subtaskHTML;
    }
}

/**
 * It deletes the picked Task
 * @param i - the index of the task in the array
 */
function deleteTask(i) {
    boardTasks.splice(i, 1);
    closeEditTool()
    filterdTasks = boardTasks
    emptySearch()
    distributeIDs()
    saveTasks();
    renderTodos(boardTasks);
    initMsgBox('successfully deleted')
    
}



/**
 * It showes the current selected priority of the Task
 * @param i - the index of the task in the array
 */
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

/**
 * It takes the value of the input field, creates a new object with the value as the title and a status
 * of false, and pushes that object into the subtasks array of the boardTasks object.
 * @param i - the index of the task in the boardTasks array
 */
function deleteSubtaskBoard(i, y) {
    boardTasks[i].subtasks.splice(y, 1);
    renderSubTasksEdit(i);
    initMsgBox('Subtask is deleted!');
}

/**
 * It takes the value of the input field, creates a new object with the value as the title and a status
 * of false, and pushes that object into the subtasks array of the boardTasks object.
 * @param i - the index of the task in the boardTasks array
 */
function addSubtaskBoard(i) {
    let inputSubtask = document.getElementById('inputSubtaskBoard').value;
    if (inputSubtask) {
        let subtask = { title: inputSubtask, status: false };
        boardTasks[i].subtasks.push(subtask);
    }
    document.getElementById('inputSubtaskBoard').value = ``;
    renderSubTasksEdit(i);
}

/**
 * The function resets the color for all buttons and then sets the color for the selected button.
 * @param button - The button that was clicked
 */
function toggleColorPrio(button) {
    // Reset the color for all buttons
    resetColorButton();
    // Set the color for the selected button
    setColorbutton(button);
}

/**
 * When the user clicks on a button, the function will reset the background color of all buttons to
 * white and reset the filter of all images to none.
 */
function resetColorButton() {
    document.getElementById("urgentBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("mediumBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("lowBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById('urgentBoard-img').style.filter = 'none';
    document.getElementById('mediumBoard-img').style.filter = 'none';
    document.getElementById('lowBoard-img').style.filter = 'none';
}


/**
 * When the user clicks on a button, the button's background color changes to a different color and the
 * button's image changes to a different image.
 * @param button - the button that was clicked
 */
function setColorbutton(button) {
    switch (button.id) {
        case "urgentBoard":
            document.getElementById("urgentBoard").style.backgroundColor = "#FF3D00";
            document.getElementById('urgentBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'urgentBoard';
            break;
        case "mediumBoard":
            document.getElementById("mediumBoard").style.backgroundColor = "#FFA800";
            document.getElementById('mediumBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'mediumBoard';
            break;
        case "lowBoard":
            document.getElementById("lowBoard").style.backgroundColor = "#8BE644";
            document.getElementById('lowBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'lowBoard';
            break;
        default:
            break;
    }
}

/**
 * It takes two arrays, merges them, removes duplicates, and then generates a list of contacts assigned
 * to a board.
 * @param i - the index of the board in the boardTasks array
 */
function renderContactsAssigndToBoard(i) {
    let array1 = boardTasks[i].assignedTo;
    let array2 = contactsBoard;
    let uniqueContacts = new Set();
    mergedContacts = [];
    mergeContacts(array1, array2, uniqueContacts);
    generateAssignedContacts(i);
}

/**
 * It takes two arrays of objects, and merges them into a single array of objects, while removing
 * duplicates.
 * @param array1 - [{name: 'John', phone: '555-555-5555'}, {name: 'Jane', phone: '555-555-5555'}]
 * @param array2 - [{name: "John", phone: "555-555-5555"}, {name: "Jane", phone: "555-555-5555"}]
 * @param uniqueContacts - Set of unique contacts
 */
function mergeContacts(array1, array2, uniqueContacts) {
    for (const element of array1.concat(array2)) {
        if (!uniqueContacts.has(element.email)) {
            uniqueContacts.add(element.email);
            mergedContacts.push(element);
        }
    }
}

/**
 * If the checkbox is checked, then the checkbox is unchecked. If the checkbox is unchecked, then the
 * checkbox is checked.
 * @param id - the id of the checkbox
 */
function checkClickEdit(checkBoxId, mergedId, boardId) {
    let checkbox = document.getElementById(checkBoxId);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
    }
    checkingIfAssignedTrue(checkBoxId, mergedId, boardId);
}

/**
 * It takes a mergedId and a boardId, and then sets the status of the mergedContact with that mergedId
 * to true, and then pushes that mergedContact into the assignedTo array of the boardTask with that
 * boardId.
 * @param mergedId - the id of the merged contact
 * @param boardId - the id of the board
 */
function addAssignedToBoard(mergedId, boardId) {
    mergedContacts[mergedId].status = true;
    boardTasks[boardId].assignedTo.push(mergedContacts[mergedId]);
}

/**
 * It removes a contact from the assignedTo array of a board.
 * @param mergedId - the id of the contact in the mergedContacts array
 * @param boardId - the id of the board
 */
function removeAssignedToBoard(mergedId, boardId) {
    let id = boardTasks[boardId].assignedTo.indexOf(mergedContacts[mergedId]);
    boardTasks[boardId].assignedTo[id].status = false;
    boardTasks[boardId].assignedTo.splice(id, 1);
}

/**
 * It takes the index of the task to be edited, pushes the edited task to the boardTasks array, closes
 * the edit tool, renders the todos, and saves the tasks.
 * @param i - the index of the task in the array
 */
function saveEditedTaskBoard(i) {
    pushToBoardTask(i);
    closeEditTool();
    renderTodos(boardTasks);
    saveTasks();
    initMsgBox('Task edited!');
}

/**
 * It takes the values from the input fields and puts them into the array.
 * @param i - the index of the task in the array
 */
function pushToBoardTask(i) {
    boardTasks[i].title = document.getElementById('titleEditBoard').value;
    boardTasks[i].description = document.getElementById('descriptionEditBoard').value;
    boardTasks[i].category = document.getElementById('categoryName').innerHTML;
    boardTasks[i].categoryColor = document.getElementById('categoryColor').style.backgroundColor;
    boardTasks[i].dueDate = document.getElementById('EditDate').value
    boardTasks[i].prio = currentPrio.replace('Board', '');
}

