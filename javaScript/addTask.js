/** AddTask Functions **/
let tasks;
let colorRange = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
let contacts;
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

let categories = [];

async function loadTasksFromServer() {
    await downloadFromServer();
    tasks = JSON.parse(await backend.getItem('tasks')) || [];
}

async function getTaskCatrgories() {
    await downloadFromServer();
    categories = JSON.parse(backend.getItem('taskCategories')) || [];
}

async function saveTaskCategories() {
    await backend.setItem('taskCategories', JSON.stringify(categories));
    initMsgBox('New Category created!');
}

// *******  Create Task Functions  *******  //

/**
 * It loads the tasks from the server, then it pushes the new task to the tasks array, then it saves
 * the tasks array to the server.
 */
async function createTask() {
    await loadTasksFromServer();
    tasks = JSON.parse(await backend.getItem('tasks')) || [];
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    initMsgBox('New Task added to Board!');
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
    renderContactsAssigndTo();
    console.log(contacts);
    // renderColorSelection();
}


/**
 * It takes two parameters, a name and a color, and then it saves the name and color in an object, and
 * then it displays the name and color in the HTML.
 * @param name - the name of the category
 * @param color - #FF0000
 */
function selectCategory(name, color) {
    closeSelection();
    let categoryList = document.getElementById('selectField');
    if (categoryList) {
        saveNewCategoryInObject(name, color);
        categoryList.innerHTML = `
        <p id="categoryName" class="textBox"></p>
        <div id="categoryColor" class="listContactInitials contactScale left"></div>
        `;
        document.getElementById('categoryName').innerHTML = name;
        document.getElementById('categoryColor').style.backgroundColor = color;
    }
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
 * It adds a new category to the categories array, then renders the new category, clears the new
 * category input, changes the selected color style, and removes the onclick attribute from the save
 * button.
 * @param color - the color of the category
 */
function selectNewCategory(color) {
    let categoryInput = document.getElementById('categoryInput').value;
    if (categoryInput) {
        categories.push({ name: categoryInput, color: color });
        saveTaskCategories();
        selectCategory(categories[categories.length - 1].name, categories[categories.length - 1].color);
        renderNewCategory();
        clearNewCategory();
        document.getElementById('saveNewCategory').setAttribute('onclick', '');
    }
}

////////// ***************************   Render Functions  *******************************  //////////////////


/**
 * It renders the categories in the HTML.
 */
function renderNewCategory() {
    document.getElementById('mainCategories').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategories').innerHTML += `
        <div onclick="selectCategory('${categories[i].name}', '${categories[i].color}')" class="options">
            <p>${categories[i].name}</p>
            <div id="categoryColorDiv${i}" class="listContactInitials contactScale left"></div>
        </div>`;
        document.getElementById(`categoryColorDiv${i}`).style.backgroundColor = categories[i].color;
    }
}


function renderContactsAssigndTo() {
    document.getElementById('listContact').innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('listContact').innerHTML += `
        <div class="options-2">
            <p id='addedUser${i + 1}'>${contacts[i].name}</p>
            <input id="checkboxAssignedTo${i + 1}"
              onclick="checkboxAssignedTo('checkboxAssignedTo${i + 1}', 'addedUser${i + 1}')" class="p-absolute"
            type="checkbox">
        </div>`;
    }
}

/**
 * It takes the inputSubtask parameter and adds it to the HTML element with the id of
 * addSubtaskElement.
 * @param inputSubtask - the value of the input field
 */
function renderSubtask(inputSubtask) {
    document.getElementById('addSubtaskElement').innerHTML += `
    <div class="checkbox">
        <input class="p-absolute" type="checkbox">
        <span>${inputSubtask}</span>
    </div>`
}

/**
 * It adds a class to the element that was clicked and removes the class from all other elements.
 * @param color - The color of the category
 * @param id - the id of the element that was clicked
 */
function selectColor(color, id) {
    for (let i = 1; i <= 6; i++) {
        let element = 'newCategoryColor-' + i;
        if (id == element) {
            document.getElementById(id).classList.add('selected');
        } else {
            document.getElementById(element).classList.remove('selected');
        }
    }
    setTimeout(() => {
        document.getElementById('saveNewCategory').setAttribute('onclick', `selectNewCategory(${color})`);
    }, 100);
}



/**
 * If the checkbox is checked, add the name to the assignedTo array, if it's unchecked, remove the name
 * from the array
 * @param checkboxId - the id of the checkbox that was clicked
 * @param nameId - the id of the name of the person you want to assign the task to
 */
function checkboxAssignedTo(checkboxId, nameId) {
    let checkBox = document.getElementById(checkboxId);
    let name = document.getElementById(nameId).innerHTML;
    if (checkBox.checked == true) {
        task.assignedTo.push(name);
    } else {
        let index = task.assignedTo.indexOf(name);
        task.assignedTo.splice(index, 1);
    }
}


/**
 * The function takes the value of the input field, pushes it to the subtasks array, and then renders
 * the subtask to the DOM.
 */
function addSubtask() {
    let inputSubtask = document.getElementById('inputSubtask').value;
    task.subtasks.push(inputSubtask);
    renderSubtask(inputSubtask);
    document.getElementById('inputSubtask').value = ``;
}


/**
 * If the button's id is urgent, call the changeColorUrgent function, else if the button's id is
 * medium, call the changeColorMedium function, else if the button's id is low, call the changeColorLow
 * function.
 * @param button - the button that was clicked
 */
function changePriority(button) {
    if (button.id == 'urgent') {
        changeColorUrgent(button);
    } else if (button.id == 'medium') {
        changeColorMedium(button);
    } else if (button.id == 'low') {
        changeColorLow(button);
    }
    task.prio = button.id;
}


/**
 * It changes the background color of the button to red, resets the filter of the image, changes the
 * filter of the image, and changes the onclick attribute of the other buttons.
 * @param button - the button that was clicked
 */
function changeColorUrgent(button) {
    button.style.backgroundColor = '#FF3D00';
    resetFilterImgPriority();
    document.getElementById(button.id + `-img`).style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    document.getElementById('urgent').setAttribute('onclick', `resetColorPriority(this)`);
    document.getElementById('medium').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('low').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('medium').style.backgroundColor = '#FFFFFF';
    document.getElementById('low').style.backgroundColor = '#FFFFFF';
}


/**
 * When the user clicks on the button with the id of 'medium', the background color of the button will
 * change to orange, the filter of the image with the id of 'medium-img' will change to a sepia filter,
 * and the onclick attribute of the button with the id of 'medium' will change to a function that
 * resets the color of the button to white, while the onclick attribute of the buttons with the id of
 * 'urgent' and 'low' will change to a function that changes the color of the button to orange.
 * @param button - the button that was clicked
 */
function changeColorMedium(button) {
    button.style.backgroundColor = '#FFA800';
    resetFilterImgPriority();
    document.getElementById(button.id + `-img`).style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    document.getElementById('medium').setAttribute('onclick', `resetColorPriority(this)`);
    document.getElementById('urgent').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('low').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('urgent').style.backgroundColor = '#FFFFFF';
    document.getElementById('low').style.backgroundColor = '#FFFFFF';
}

/**
 * When the user clicks on the 'low' button, the button's background color changes to green, and the
 * other buttons' background colors change to white.
 * @param button - the button that was clicked
 */
function changeColorLow(button) {
    button.style.backgroundColor = '#8BE644';
    resetFilterImgPriority();
    document.getElementById(button.id + `-img`).style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    document.getElementById('low').setAttribute('onclick', `resetColorPriority(this)`);
    document.getElementById('urgent').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('medium').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('urgent').style.backgroundColor = '#FFFFFF';
    document.getElementById('medium').style.backgroundColor = '#FFFFFF';
}


/**
 * When the user clicks on a button, the button's background color changes to white, and the button's
 * onclick attribute is changed to call the changePriority() function.
 * @param button - the button that was clicked
 */
function resetColorPriority(button) {
    button.style.backgroundColor = '#FFFFFF';
    setTimeout(() => {
    }, 200);
    document.getElementById(button.id).setAttribute('onclick', `changePriority(this)`);
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
 * The function takes the value of the input field with the id of 'date' and assigns it to the variable
 * 'date'. Then it converts the value of 'date' to a date object and assigns it to the variable 'date'.
 * Then it assigns the value of 'date' to the property 'dueDate' of the object 'task'. Then it logs the
 * value of 'task' to the console.
 */
function addDate() {
    let date = document.getElementById('date').value;
    date = new Date(date);
    date = (date.getMonth() + 1) + '.' + date.getDate() + '.' + date.getFullYear();
    date.toString(date);
    task.dueDate = date;
}


////////// ***************************   Selection Functions  *******************************  //////////////////

/**
 * It removes the class 'd-none' from the list, renders a new category, adds the class 'growIn' to the
 * list, removes the class 'growIn' from the list after 200ms, and changes the onclick attribute of the
 * selectField to closeSelection().
 */
function openSelection() {
    document.getElementById('list').classList.remove('d-none');
    renderNewCategory();
    document.getElementById('list').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('list').classList.remove('growIn');
    }, 200);
    document.getElementById('selectField').setAttribute('onclick', `closeSelection()`);
}


/**
 * It adds a class to the list element, then after 100ms, it adds a class to hide the list element and
 * removes the class that was added to make it grow out.
 */
function closeSelection() {
    document.getElementById('list').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('list').classList.add('d-none');
        document.getElementById('list').classList.remove('growOut');
    }, 100);
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
}

///**      ContactSelection Functions       **///

/**
 * It removes the class 'd-none' from the element with the id 'listContact' and adds the class 'growIn'
 * to the same element. Then it removes the class 'growIn' from the same element after 200
 * milliseconds. Then it sets the attribute 'onclick' of the element with the id 'selectioContactField'
 * to the function 'closeContactSelection()'.
 */
function openContactSelection() {
    document.getElementById('listContact').classList.remove('d-none');
    document.getElementById('listContact').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('listContact').classList.remove('growIn');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `closeContactSelection()`);
}


/**
 * It adds a class to an element, then after 200ms, it adds another class to the same element and
 * removes the first class.
 */
function closeContactSelection() {
    document.getElementById('listContact').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('listContact').classList.add('d-none');
        document.getElementById('listContact').classList.remove('growOut');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `openContactSelection()`);
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
 * class 'd-none' to the input field, adds the class 'd-none' to the color selection, and sets the
 * onclick attribute of the select field to openSelection().
 */
function clearNewCategory() {
    document.getElementById('selectField').classList.remove('d-none');
    document.getElementById('categoryInput').value = ''
    document.getElementById('newCategory').classList.add('d-none');
    document.getElementById('colorSelection').classList.add('d-none');
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
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