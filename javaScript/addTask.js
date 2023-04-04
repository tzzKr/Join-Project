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
 * Get the task categories from the server, and if there are none, set the categories to an empty array.
 */
async function getTaskCatrgories() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem('taskCategories')) || [];
}

/**
 * Saves the categories array to the backend, and then calls the initMsgBox function.
 */
async function saveTaskCategories(msg) {
    await backend.setItem('taskCategories', JSON.stringify(categories));
    initMsgBox(msg);
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
    if (checkBox) task.subtasks[i].status = true;
    else task.subtasks[i].status = false;
}

/**
  * Changes if a color is selected or not and changes the onclick attribut.
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
 * Checks if a color is selected.
 * @returns A boolean value.
 */
function checkColorSelected() {
    let colorSelected = false;
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newCategoryColor-' + i;
        if (document.getElementById(element).classList.contains('selected'))
            colorSelected = true;
    });
    return colorSelected;
}

/**
 * Resets all color selctions.
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
            changePrioBtnStyle(button.id, '#FF3D00');
            break;
        case "medium":
            changePrioBtnStyle(button.id, '#FFA800');
            break;
        case "low":
            changePrioBtnStyle(button.id, '#8BE644');
            break;
        default:
            break;
    }
}

function changePrioBtnStyle(id, color) {
    let filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    document.getElementById(id).style.backgroundColor = color;
    document.getElementById(id + '-img').style.filter = filter;
    task.prio = id;
}

/**
 * Reset the color for all buttons, then set the color for the selected button.
 * @param button - The button that was clicked
 */
function toggleColorPriority(button) {
    resetColorPriority();
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
    resetFilterImgPriority();
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
 * Toggles the Catergory Selection.
 */
function toggleSelection() {
    document.getElementById('list').classList.toggle('d-none');
    renderNewCategory();
    document.getElementById('list').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('list').classList.toggle('growIn');
    }, 200);
}

/**
 * Toggles the Contact Selection
 */
function toggleContactSelection() {
    document.getElementById('listContact').classList.toggle('d-none');
    document.getElementById('listContact').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('listContact').classList.toggle('growIn');
    }, 200);
}

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
 * Cleared the new category inputfield.
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
 * Shows the new category inputfield.
 */
function inputNewContact() {
    document.getElementById('inviteNewContact').classList.remove('d-none');
    document.getElementById('selectioContactField').classList.add('d-none');
    document.getElementById('listContact').classList.add('d-none');
}

/**
 * Cleared the invite new contact field and changes the oncklick attribute.
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