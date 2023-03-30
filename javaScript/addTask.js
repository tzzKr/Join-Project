/** AddTask Functions **/
let tasks;
let colorRange = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let contacts;
let numberAssingendUser = 0;
let task = {
    id: "",
    board: "todo",
    category: "",
    categoryColor: "",
    title: "",
    description: "",
    progress: 0,
    progressNumber: 0,
    assignedTo: new Array,
    prio: "",
    dueDate: "",
    subtasks: new Array
}

let currentAlert = 'Something is missing!';

let categories = [];

/**
 * Load the tasks from the server, and if there are none, set the tasks to an empty array.
 */
async function loadTasksFromServer() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * Get the task categories from the server, and if there are none, set the categories to an empty
 * array.
 */
async function getTaskCatrgories() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem('taskCategories')) || [];
}

/**
 * This function saves the categories array to the local storage, and then calls the initMsgBox
 * function to display a message to the user.
 */
async function saveTaskCategories(msg) {
    await backend.setItem('taskCategories', JSON.stringify(categories));
    initMsgBox(msg);
}

// *******  Create Task Functions  *******  //

/**
 * It loads the tasks from the server, then it pushes the new task to the tasks array, then it saves
 * the tasks array to the server.
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
 * If the date is empty, return 'empty'. If the date is not a number, return 'NaN'. Otherwise, return
 * 'valid'
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
 * If the date is empty, return false and set the currentAlert to 'Date is empty'. If the date is not a
 * number, return false and set the currentAlert to 'Date is invalid'. If the date is valid, return
 * true.
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
 * If the user is on the addTask.html page, wait 1 second and then go to the board.html page. If the
 * user is on the board.html page, then do the following:
 * 1. Set the boardTasks variable to the tasks variable.
 * 2. Distribute IDs to the tasks.
 * 3. Set the filterdTasks variable to the boardTasks variable.
 * 4. Close the task pop up.
 * 5. Render the tasks.
 */
function CheckPage() {
    if (window.location.pathname == '/join/addTask.html') {
        setTimeout(() => {
            goToBoard()
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
    if (!task.category) {
        document.getElementById('selectField').style.border = `1px solid red`;
    }
    if (!task.prio) {
        document.getElementById('urgent').style.border = `1px solid red`;
        document.getElementById('medium').style.border = `1px solid red`;
        document.getElementById('low').style.border = `1px solid red`;
    }
    if (!task.dueDate) {
        document.getElementById('date').style.border = `1px solid red`;
    }
}

/**
 * If the user has selected a category, priority, and due date, then the border of the select field,
 * the priority radio buttons, and the date field will be reset to their default state.
 */
function resetBorder() {
    if (task.category) {
        document.getElementById('selectField').style.border = ``;
    }
    if (task.prio) {
        document.getElementById('urgent').style.border = ``;
        document.getElementById('medium').style.border = ``;
        document.getElementById('low').style.border = ``;
    }
    if (task.dueDate) {
        document.getElementById('date').style.border = ``;
    }
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
 * 
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
 * It loops through the array of categories and checks if the name of the category matches the name of
 * the category that was passed in.
 * 
 * If it does, it sets the match variable to true.
 * 
 * If it doesn't, it does nothing.
 * 
 * If the match variable is true, it returns true.
 * 
 * If the match variable is false, it returns false.
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



////////// ***************************   Render Functions  *******************************  //////////////////


/**
 * It renders the categories in the HTML.
 */
function renderNewCategory() {
    Board = '';
    document.getElementById('mainCategories').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategories').innerHTML += generateNewCategoryHTML(i, Board);

    }
}


/**
 * It renders the contacts to the page.
 */
function renderContactsAssigndTo() {
    document.getElementById('listContact').innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('listContact').innerHTML += genarateContactAssignedTo(i);
    }
}


/**
 * It takes the inputSubtask parameter and adds it to the HTML element with the id of
 * addSubtaskElement.
 * @param inputSubtask - the value of the input field
 */
function renderSubtask() {

    document.getElementById('addSubtaskContainer').innerHTML = ``;
    for (let i = 0; i < task.subtasks.length; i++) {
        if (!task.subtasks[i].status) {
            document.getElementById('addSubtaskContainer').innerHTML += generateNotCheckedSubtask(i);
        }
        else {
            document.getElementById('addSubtaskContainer').innerHTML += generateCheckedSubtask(i);
        }

    }

}


/**
 * Updates the text of the 'contactNumber' element based on the number 
 * of contacts assigned to a task.
 */
function renderContactNumber() {
    let contactNumber = document.getElementById('contactNumber');
    switch (numberAssingendUser) {
        case 0:
            contactNumber.innerHTML = `Select contacts to assign`;
            break;
        case 1:
            contactNumber.innerHTML = `${numberAssingendUser} contact assigned`;
            break;
        default:
            contactNumber.innerHTML = `${numberAssingendUser} contacts assigned`;
    }

}



/**
 * If the checkbox exists, toggle its checked state and call the checkboxAssignedTo function.
 * @param id - the id of the checkbox
 * @param i - the index of the row in the table
 */
function checkClick(id, i) {
    let checkbox = document.getElementById(id);
    checkbox.checked = !checkbox.checked;
    checkboxAssignedTo(id, i);
}


/**
 * If the checkbox is checked, set the status of the subtask to true, otherwise set it to false.
 * @param i - the index of the subtask in the subtasks array
 */
function subtaskChecked(i) {
    let checkBox = document.getElementById('checkbox-subtask' + i).checked;
    if (checkBox) {
        task.subtasks[i].status = true;
    } else {
        task.subtasks[i].status = false;
    }
}


/**
  * It toggles the class 'selected' on the element with the id 'newCategoryColor-i' if the element's id
  * is equal to the id passed to the function.
  * 
  * Then, it sets the onclick attribute of the element with the id 'saveNewCategory' to the function
  * createCategory with the color passed to the function as the argument.
  * @param color - The color of the category
  * @param id - the id of the element that was clicked
 */
function selectColor(color, id) {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newCategoryColor-' + i;
        document.getElementById(element).classList.toggle('selected', element === id);
    });
    setTimeout(() => {
        document.getElementById('saveNewCategory').setAttribute('onclick', `createCategory(${color})`);
    }, 100);
}

/**
 * It loops through the elements with the id's newCategoryColor-1, newCategoryColor-2,
 * newCategoryColor-3, newCategoryColor-4, newCategoryColor-5, and newCategoryColor-6, and if any of
 * them have the class 'selected', it returns true.
 * @returns A boolean value.
 */
function checkColorSelected() {
    let colorSelected = false;
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newCategoryColor-' + i;
        if (document.getElementById(element).classList.contains('selected')) {
            colorSelected = true;
        }
    });
    return colorSelected;
}

/**
 * It removes the class 'selected' from all elements with the id 'newCategoryColor-1',
 * 'newCategoryColor-2', 'newCategoryColor-3', 'newCategoryColor-4', 'newCategoryColor-5', and
 * 'newCategoryColor-6'.
 */
function resetSelectedColor() {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newCategoryColor-' + i;
        document.getElementById(element).classList.remove('selected');
    });
}



/**
 * If the checkbox is checked, add the user to the task.assignedTo array. If the checkbox is unchecked,
 * remove the user from the task.assignedTo array.
 * @param checkboxId - the id of the checkbox that was clicked
 * @param i - the index of the contact in the contacts array
 */
function checkboxAssignedTo(checkboxId, i) {
    let checkBox = document.getElementById(checkboxId);
    let userIndex = task.assignedTo.findIndex(u => u.name == contacts[i].name);
    if (checkBox.checked) {
        if (userIndex === -1) {
            task.assignedTo.push(contacts[i]);
            numberAssingendUser++;
        }
    } else if (userIndex !== -1) {
        task.assignedTo.splice(userIndex, 1);
        numberAssingendUser--;
    }
    renderContactNumber();
}


/**
 * The function takes the value of the input field, pushes it to the subtasks array, and then renders
 * the subtask to the DOM.
 */
function addSubtask() {
    let inputSubtask = document.getElementById('inputSubtask').value;
    if (inputSubtask) {
        let subtask = { title: inputSubtask, status: false };
        task.subtasks.push(subtask);
        renderSubtask();
    }
    document.getElementById('inputSubtask').value = ``;
}



/**
 * It changes the background color of the button that was clicked and changes the filter of the image
 * inside the button.
 * @param button - the button that was clicked
 */
function changePriority(button) {
    switch (button.id) {
        case "urgent":
            document.getElementById("urgent").style.backgroundColor = "#FF3D00";
            document.getElementById('urgent-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            task.prio = 'urgent';
            break;
        case "medium":
            document.getElementById("medium").style.backgroundColor = "#FFA800";
            document.getElementById('medium-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            task.prio = 'medium'
            break;
        case "low":
            document.getElementById("low").style.backgroundColor = "#8BE644";
            document.getElementById('low-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            task.prio = 'low'
            break;
        default:
            break;
    }

}


/**
 * Reset the color for all buttons, then set the color for the selected button.
 * @param button - The button that was clicked
 */
function toggleColorPriority(button) {
    // Reset the color for all buttons
    resetColorPriority();
    // Set the color for the selected button
    changePriority(button);
    resetBorder();
}

/**
 * This function resets the background color of the three priority buttons to white and removes the
 * grayscale filter from the three priority images.
 */
function resetColorPriority() {
    document.getElementById("urgent").style.backgroundColor = "#FFFFFF";
    document.getElementById("medium").style.backgroundColor = "#FFFFFF";
    document.getElementById("low").style.backgroundColor = "#FFFFFF";
    document.getElementById('urgent-img').style.filter = 'none';
    document.getElementById('medium-img').style.filter = 'none';
    document.getElementById('low-img').style.filter = 'none';

}

/**
 * This function resets the filter property of the three images to 'none'.
 */
function resetFilterImgPriority() {
    document.getElementById('urgent-img').style.filter = 'none';
    document.getElementById('medium-img').style.filter = 'none';
    document.getElementById('low-img').style.filter = 'none';
}

////////// ***************************   date Functions  *******************************  //////////////////


/**
 * It takes a date in the format of "YYYY-MM-DD" and returns the same date in the format of
 * "MM-DD-YYYY".
 * @param date - the date you want to format
 * @returns A string in the format of YYYY-MM-DD
 */
function addDate() {
    let date = document.getElementById('date').value;
    date = new Date(date);
    dateMonth = (date.getMonth() + 1);
    dateDay = date.getDate();
    dateMonth.toString();
    dateDay.toString();
    date = date.getFullYear() + '-' + ('00' + dateMonth).slice(-2) + '-' + ('000' + dateDay).slice(-2);
    date.toString(date);
    task.dueDate = date;
    resetBorder();
}


/**
 * The function sets the value of the date input to the current date.
 */
function setDate() {
    document.getElementById("date").valueAsDate = new Date();
    task.dueDate = document.getElementById('date').value;
}


////////// ***************************   Selection Functions  *******************************  //////////////////


/**
 * It toggles the class 'd-none' on the element with the id 'list' which hides the element. Then it
 * calls the function renderNewCategory() which is defined below. Then it toggles the class 'growIn' on
 * the element with the id 'list' which makes the element grow in size. Then it sets a timeout for 200
 * milliseconds and then toggles the class 'growIn' on the element with the id 'list' which makes the
 * element shrink in size.
 */
function toggleSelection() {
    document.getElementById('list').classList.toggle('d-none');
    renderNewCategory();
    document.getElementById('list').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('list').classList.toggle('growIn');
    }, 200);
}



///**      ContactSelection Functions       **///


/**
 * It toggles the class 'd-none' on the element with the id 'listContact' and then toggles the class
 * 'growIn' on the same element.
 * 
 * Then it sets a timeout to toggle the class 'growIn' off the same element after 200 milliseconds.
 */
function toggleContactSelection() {
    document.getElementById('listContact').classList.toggle('d-none');
    document.getElementById('listContact').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('listContact').classList.toggle('growIn');
    }, 200);
}



///**      Select Option Functions       **///


/**
 * When the user clicks the button, the new category form appears and the other elements disappear.
 */
function newCategory() {
    document.getElementById('newCategory').classList.remove('d-none');
    document.getElementById('colorSelection').classList.remove('d-none');
    document.getElementById('selectField').classList.add('d-none');
    document.getElementById('list').classList.add('d-none');

}



/**
 * It removes the class 'd-none' from the select field, clears the value of the input field, adds the
 * class 'd-none' to the input field, adds the class 'd-none' to the color selection div, resets the
 * selected color, and sets the onclick attribute of the select field to toggleSelection().
 */
function clearNewCategory() {
    document.getElementById('selectField').classList.remove('d-none');
    document.getElementById('categoryInput').value = '';
    document.getElementById('newCategory').classList.add('d-none');
    document.getElementById('colorSelection').classList.add('d-none');
    resetSelectedColor();
    document.getElementById('selectField').setAttribute('onclick', `toggleSelection()`);
}

/**
 * When the user clicks the button with the id of 'inviteNewContact', the function will remove the
 * class of 'd-none' from the element with the id of 'inviteNewContact', and add the class of 'd-none'
 * to the elements with the ids of 'selectioContactField' and 'listContact'.
 */
function inputNewContact() {
    document.getElementById('inviteNewContact').classList.remove('d-none');
    document.getElementById('selectioContactField').classList.add('d-none');
    document.getElementById('listContact').classList.add('d-none');
}


/**
 * It removes the class 'd-none' from the element with the id 'selectioContactField' and adds the class
 * 'd-none' to the elements with the ids 'inviteNewContact' and 'listContact'. It also sets the onclick
 * attribute of the element with the id 'selectioContactField' to the function
 * 'openContactSelection()'
 * 
 * 
 * 
 * I'm not sure if this is the best way to do this, but it works.
 */

function clearInviteNewContact() {
    document.getElementById('selectioContactField').classList.remove('d-none');
    document.getElementById('inviteNewContact').classList.add('d-none');
    document.getElementById('listContact').classList.add('d-none');
    document.getElementById('selectioContactField').setAttribute('onclick', `openContactSelection()`);
}

/**
 * It resets the task object to its default values.
 */
function resetTask() {
    task = {
        id: "",
        board: "todo",
        category: "",
        categoryColor: "",
        title: "",
        description: "",
        progress: 0,
        progressNumber: 0,
        assignedTo: new Array,
        prio: "",
        dueDate: "",
        subtasks: new Array
    }
}

/**
 * If the user clicks the cancel button, the page will reload.
 */
function cancelTask() {
    resetTask();
    resetColorPriority();
    document.getElementById('contactNumber').innerHTML = `Select contacts to assign`;
    document.getElementById('selectField').innerHTML = generateSelectCategoryHTML();
    renderSubtask();
    numberAssingendUser = 0;
}