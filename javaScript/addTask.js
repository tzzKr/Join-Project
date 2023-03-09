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
        await loadTasksFromServer();
        tasks = JSON.parse(await backend.getItem('tasks')) || [];
        tasks.push(task);
        await backend.setItem('tasks', JSON.stringify(tasks));
        initMsgBox('New Task added to Board!');
        setTimeout(() => {
            window.location.href = 'board.html'
        },2100);
    } else {
        initMsgBoxAlert('Something missing!');
    }
}


/**
 * If the task has a category, an assignedTo, a priority, and a dueDate, then return true. Otherwise,
 * return false
 * @returns a boolean value.
 */
function checkForm() {
    if (task.category && task.prio && task.dueDate) {
        return true;
    } else {
        return false;
    }
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
 * It deletes a category from the array and then updates the select field.
 * 
 * @param i - the index of the category in the array
 */
function deleteCategory(i) {
    categories.splice(i, 1);
    saveTaskCategories('Category is deleted!');
    task.category = '';
    task.categoryColor = '';
    document.getElementById('selectField').innerHTML = `
      <p class="textBox">Select task category</p>
      <img src="img/arrow.png">`;
    closeSelection();
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
        saveTaskCategories('New Category created!');
        selectCategory(categories[categories.length - 1].name, categories[categories.length - 1].color);
        renderNewCategory();
        clearNewCategory();
        resetSelectedColor();
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
    document.getElementById('mainCategories').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategories').innerHTML += `
        <div  class="options">
            <div class="category-element" onclick="selectCategory('${categories[i].name}', '${categories[i].color}')">
              <p>${categories[i].name}</p>
              <div id="categoryColorDiv${i}" class="listContactInitials contactScale left"></div>
            </div>
            <div class="delete-img">
              <img class="delete-category" onclick="deleteCategory(${i})" src="img/trash.png">
            </div>  
        </div>`;
        document.getElementById(`categoryColorDiv${i}`).style.backgroundColor = categories[i].color;    //// ======>  TO fixed
    }
}


/**
 * It renders the contacts to the page.
 */
function renderContactsAssigndTo() {
    document.getElementById('listContact').innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('listContact').innerHTML += `
        <div onclick="checkClick('checkboxAssignedTo${i + 1}', ${i})" class="options-2">
             <p data-tooltip="${contacts[i].email}" data-flow="right" id='addedUser${i + 1}'>${contacts[i].name}</p>
             <input id="checkboxAssignedTo${i + 1}" onclick="checkClick('checkboxAssignedTo${i + 1}', ${i})" type="checkbox" class="assigndTo-input">
        </div>

        `;
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
            document.getElementById('addSubtaskContainer').innerHTML += `
            <div class="subtask-element">
                <div class="justify-content-center">
                  <input onclick="subtaskChecked(${i})" id="checkbox-subtask${i}" class="p-absolute" type="checkbox"></input>
                  <span>${task.subtasks[i].title}</span>
                </div>
                <div class="delete-img">
                  <img onclick="deleteSubtask(${i})" class="delete-subtask-trash" src="img/trash.png">
                </div>
            </div>`;
        }
        else {
            document.getElementById('addSubtaskContainer').innerHTML += `
            <div class="subtask-element">
                <div class="justify-content-center">
                  <input onclick="subtaskChecked(${i})" checked id="checkbox-subtask${i}" class="p-absolute" type="checkbox"></input>
                  <span>${task.subtasks[i].title}</span>
                </div>
                <div class="delete-img">
                  <img onclick="deleteSubtask(${i})" class="delete-subtask-trash" src="img/trash.png">
                </div>
            </div>`;
        }

    }

}

/**
 * If the addition parameter is true, then add 1 to the numberAssingendUser variable, otherwise
 * subtract 1 from the numberAssingendUser variable. Then, set the innerHTML of the contactNumber
 * element to the numberAssingendUser variable, and if the numberAssingendUser variable is equal to 0,
 * then set the innerHTML of the contactNumber element to the string 'Select contacts to assign'.
 * @param addition - true or false, depending on whether the user is adding or removing a contact
 */
function renderContactNumber(addition) {
    if (addition) {
        numberAssingendUser += 1;
    } else {
        numberAssingendUser -= 1;
    }
    document.getElementById('contactNumber').innerHTML = `${numberAssingendUser} contacts assigned`;
    if (numberAssingendUser == 0) {
        document.getElementById('contactNumber').innerHTML = `Select contacts to assign`;
    } else if (numberAssingendUser == 1) {
        document.getElementById('contactNumber').innerHTML = `${numberAssingendUser} contact assigned`;
    }

}



/**
 * If the checkbox exists, toggle its checked state and call the checkboxAssignedTo function.
 * @param id - the id of the checkbox
 * @param i - the index of the row in the table
 */
function checkClick(id, i) {
    let checkbox = document.getElementById(id);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
    }
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
 * If the checkbox is checked, add the contact to the task.assignedTo array, and render the contact
 * number. If the checkbox is unchecked, remove the contact from the task.assignedTo array, and render
 * the contact number.
 * @param checkboxId - the id of the checkbox that was clicked
 * @param i - the index of the contact in the contacts array
 */
function checkboxAssignedTo(checkboxId, i) {
    let checkBox = document.getElementById(checkboxId);
    if (checkBox.checked == true) {
        console.log(contacts[i]);
        task.assignedTo.push(contacts[i]);
        renderContactNumber(true);
    } else {
        task.assignedTo.splice(task.assignedTo.findIndex(u => u.name == contacts[i].name), 1);
        renderContactNumber(false);
    }
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
 * It takes a date in the format of "YYYY-MM-DD" and returns the same date in the format of
 * "MM-DD-YYYY".
 * @param date - the date you want to format
 * @returns A string in the format of YYYY-MM-DD
 */
function addDate() {
    let date = document.getElementById('date').value;
    date = new Date(date);
    dateMonth = (date.getMonth() + 1)
    dateDay = date.getDate();
    dateMonth.toString();
    dateDay.toString();
    date = date.getFullYear() + '-' + ('00' + dateMonth).slice(-2) + '-' + ('000' + dateDay).slice(-2);
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
    resetSelectedColor();
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

/**
 * If the user clicks the cancel button, the page will reload.
 */
function cancelTask() {
    window.location.reload();
}