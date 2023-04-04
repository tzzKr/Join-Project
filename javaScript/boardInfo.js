/**
 * It opens a modal with information about a task.
 * </code>
 * @param i - the index of the task in the array of tasks
 */
function openTaskInfo(i) {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(i);
    document.getElementById('backgroundCloser').classList.remove('d-none');
    renderAssingedUserInfo(i);
    renderSubTasksInfo(i);
    showSelectedBtn(i);
    emptySearch();
    openMobileInfo();
}

/**
 * It closes the task info container and the background closer.
 */
function closeMoreInfo() {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.add('d-none');
    document.getElementById('backgroundCloser').classList.add('d-none');
    filterTasks();
    closeMobileInfo();
}

/**
 * It saves the tasks, closes the more info window, and renders the todos.
 */
function closeAndSaveInfo() {
    saveTasks();
    closeMoreInfo();
    renderTodos(boardTasks);
}

/**
 * It renders the assigned users to the task.
 * @param i - the index of the task in the boardTasks array
 */
function renderAssingedUserInfo(i) {
    document.getElementById('assignedUserInfo').innerHTML = '';
    if (!boardTasks[i].assignedTo.length) {
        document.getElementById('assignedUserInfo').innerHTML = 'No contacts assigned.';
    } else {
        for (let y = 0; y < boardTasks[i].assignedTo.length; y++) {
            document.getElementById('assignedUserInfo').innerHTML += generateAssignedUserInfoBoard(i, y);
        }
    }
}

/**
 * It renders the subtasks of a task in the task info modal.
 * @param i - the index of the task in the array
 */
function renderSubTasksInfo(i) {
    const subTaskContainer = document.getElementById('subTaskContainer');
    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        const isChecked = boardTasks[i].subtasks[y].status;
        const checkedAttribute = isChecked ? 'checked' : '';
        subTaskContainer.innerHTML += generateSubtaskInfoBoard(i, y, checkedAttribute);
    }
}

/**
 * It's a function that takes in a number, and then loops through an array of objects, and then loops
 * through an array of objects inside of the first array of objects, and then checks if a checkbox is
 * checked, and then changes the status of the object inside of the array inside of the array of
 * objects.
 * @param i - the index of the task in the boardTasks array
 */
function subtaskCheckedInfo(i) {

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        let checked = document.getElementById('subtaskCheckboxInfo' + y).checked
        if (checked) {
            boardTasks[i].subtasks[y].status = true;
        } else {
            boardTasks[i].subtasks[y].status = false;
        }
    }
}

/**
 * Depending on the prio it calls a function to change the style of a button element.
 * @param i - the index of the task in the array
 */
function showSelectedBtn(i) {
    switch (boardTasks[i].prio) {
        case 'urgent':
            changeUrgencyBtnInfoStyle(boardTasks[i].prio,'#FF3D00');
            break;
        case 'medium':
            changeUrgencyBtnInfoStyle(boardTasks[i].prio,'#FFA800');
            break;
        case 'low':
            changeUrgencyBtnInfoStyle(boardTasks[i].prio,'#8BE644');
            break;
        default:
            break;
    }
}

/**
 * It changes the background color of the element and the image filter of the image inside the element.
 * @param {string} urgency - starting string of the id
 * @param {string} color - string for the background color
 */
function changeUrgencyBtnInfoStyle(urgency, color) {
    const filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    document.getElementById(urgency + 'BoardInfo').style.backgroundColor = color;
    document.getElementById(urgency + 'BoardInfo-img').style.filter = filter;
}