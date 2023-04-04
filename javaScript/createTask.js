// *******  Create Task Functions  *******  //

/**
 * It pushes the new task to the tasks array, then it saves the tasks array to the server.
 */
async function createTask() {
    if (checkForm()) {
        taskBtnDisabled();
        await loadTasksFromServer();
        tasks = JSON.parse(await backend.getItem('tasks')) || [];
        tasks.push(task);
        await backend.setItem('tasks', JSON.stringify(tasks));
        initMsgBox('New Task added to Board!');
        CheckPage();
    } else {
        initMsgBoxAlert(currentAlert);
        showMissing();
    }
    taskBtnEnabled()
    currentAlert = 'Something is missing!';
}

/**
 * If the date is empty, return 'empty'. If the date is not a number, return 'NaN'. Otherwise, return 'valid'
 * @returns A string.
 */
function isValidDate() {
    let date = task.dueDate;
    if (!date || date.trim() === '') {
        return 'empty';
    }
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
        return 'NaN';
    }
    return 'valid';
}

/**
 * If the date is valid it returns true else false and set an alert.
 * @returns The return value of the switch statement is the return value of the function isValidDate().
 */
function DateValidation() {
    switch (isValidDate()) {
        case "empty":
            currentAlert = 'Date is empty';
            return false;
        case 'NaN':
            currentAlert = 'Date is invalid';
            return false;
        case 'valid':
            return true;
        default:
            break;
    }
}

/**
 * If the user is on the addTask.html page, wait 1 second and then go to the board.html page.
 * If the user is on the board.html page, close the Popup and rerender the board Taks.
 */
function CheckPage() {
    if (window.location.pathname == '/join/addTask.html') {
        setTimeout(() => {
            goTo('board.html')
        }, 1000);
    }
    if (window.location.pathname == '/join/board.html') {
        boardTasks = tasks;
        distributeIDs()
        filterdTasks = boardTasks;
        closeTaskPopUp();
        renderTodos(boardTasks);
    }
}

/**
 * It closes the task pop up window and resets the form.
 */
function closeTaskPopUp() {
    let board = window.location.pathname == '/board.html';
    document.getElementById('task-popUp').classList.add('d-none');
    document.getElementById('task-bgr-popUp').classList.add('d-none');
    if (board) {
        document.getElementById('boardBg').classList.remove('noScroll');
    }
    cancelTask();
    document.getElementById('add-new-task').reset();
}

/**
 * If the task object doesn't have a category, priority, or due date, then the corresponding input
 * field will be highlighted in red
 */
function showMissing() {
    if (!task.category)
        document.getElementById('selectField').style.border = `1px solid red`;
    if (!task.prio) {
        document.getElementById('urgent').style.border = `1px solid red`;
        document.getElementById('medium').style.border = `1px solid red`;
        document.getElementById('low').style.border = `1px solid red`;
    } if (!task.dueDate)
        document.getElementById('date').style.border = `1px solid red`;
}

/**
 * If the user has selected a category, priority, and due date, then the border of the select field,
 * the priority radio buttons, and the date field will be reset to their default state.
 */
function resetBorder() {
    if (task.category)
        document.getElementById('selectField').style.border = ``;
    if (task.prio) {
        document.getElementById('urgent').style.border = ``;
        document.getElementById('medium').style.border = ``;
        document.getElementById('low').style.border = ``;
    } if (task.dueDate)
        document.getElementById('date').style.border = ``;
}

/**
 * If the task has a category, an assignedTo, a priority, and a dueDate, then return true. Otherwise,
 * return false
 * @returns a boolean value.
 */
function checkForm() {
    if (task.category && task.prio && task.dueDate && DateValidation() && task.title && task.description) {
        return true;
    } else {
        return false;
    }
}

/**
 * If the user has not entered any text into the textarea, then the button will be disabled.
 */
function taskBtnDisabled() {
    document.getElementById('creatTaskBtn').disabled = true;
}

/**
 * If the user has entered a task name, then enable the 'Create Task' button.
 */
function taskBtnEnabled() {
    document.getElementById('creatTaskBtn').disabled = false;
}

/**
 * Get the contacts for the current user from the server.
 * @returns An array of contacts.
 */
async function getContacts() {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let userName = sessionStorage.getItem('sessionUser');
    let user = users.find(u => u.name == JSON.parse(userName));
    contacts = user.contacts;
    setTimeout(() => {
    renderContactsAssigndTo();
    }, 2000); 
}

/**
 * It takes a name and a color, and then it does a bunch of stuff with the DOM.
 * @param name - the name of the category
 * @param color - the color of the category
 */
function selectCategory(name, color) {
    let categoryList = document.getElementById('selectField');
    toggleSelection();
    saveNewCategoryInObject(name, color);
    categoryList.innerHTML = categoryListItemHTML(name, color);
    document.getElementById('categoryName').innerHTML = name;
    document.getElementById('categoryColor').style.backgroundColor = color;
    resetBorder();
}

/**
 * This function takes two arguments, a name and a color, and assigns them to the task object's
 * category and categoryColor properties.
 * @param name - the name of the category
 * @param color - the color of the category
 */
function saveNewCategoryInObject(name, color) {
    task.categoryColor = color;
    task.category = name;
}

/**
 * The function takes the value of the input field with the id of 'title' and assigns it to the title
 * property of the task object.
 */
function addTitle() {
    let titleInput = document.getElementById('title').value;
    task.title.toString(titleInput);
    task.title = titleInput;
}

/**
 * The function takes the value of the input field with the id of 'description' and assigns it to the
 * description property of the task object.
 */
function addDescription() {
    let descriptionInput = document.getElementById('description').value;
    task.title.toString(descriptionInput);
    task.description = descriptionInput;
}

/**
 * It deletes a category from the array and then updates the select field.
 * @param i - the index of the category in the array
 */
function deleteCategory(i) {
    categories.splice(i, 1);
    saveTaskCategories('Category is deleted!');
    task.category = '';
    task.categoryColor = '';
    document.getElementById('selectField').innerHTML = generateSelectCategoryHTML();
    toggleSelection();
}

/**
 * It takes the index of the subtask in the array and removes it from the array.
 * @param i - the subtask to be deleted
 */
function deleteSubtask(i) {
    task.subtasks.splice(i, 1);
    renderSubtask();
    initMsgBox('Subtask is deleted!');
}

/**
 * It creates a new category, saves it to local storage, selects it, renders it, clears the input
 * field, resets the color, and removes the onclick event from the save button.
 * @param color - the color of the category
 */
function createCategory(color) {
    let categoryInput = document.getElementById('categoryInput').value;
    categoryInput = categoryInput.charAt(0).toUpperCase() + categoryInput.slice(1);
    if (categoryInput && !checkCategoryExistence(categoryInput) && checkColorSelected()) {
        categories.push({ name: categoryInput, color: color });
        clusterFunktion(color);
        document.getElementById('saveNewCategory').setAttribute('onclick', '');
    } else if (checkColorSelected() && !categoryInput) {
        initMsgBoxAlert('Please enter a category name');
    } else {
        initMsgBoxAlert('Category exists!');
        document.getElementById('saveNewCategory').setAttribute('onclick', '');
        resetSelectedColor();
    }
}

/**
 * When the user clicks the 'Add Category' button, a new category is created and added to the
 * categories array, the new category is selected, the new category is rendered, the new category is
 * cleared, the selected color is reset, and the selection is toggled.
 * @param color - the color of the new category
 */
function clusterFunktion(color) {
    saveTaskCategories('New Category created!');
    selectCategory(categories[categories.length - 1].name, categories[categories.length - 1].color);
    renderNewCategory();
    clearNewCategory();
    resetSelectedColor();
    toggleSelection();
}

/**
 * Returns true if categorie already exist, else false.
 * @param catName - The name of the category to check for.
 * @returns a boolean value.
 */
function checkCategoryExistence(catName) {
    let match = false;
    categories.forEach(category => {
        if (category.name.toLowerCase() === catName.toLowerCase()) {
            match = true;
        }
    });
    return match;
}