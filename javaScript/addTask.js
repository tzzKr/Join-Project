/** AddTask Functions **/
let colorRange = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];

let task = {
    id: "",
    board: "",
    category: "",
    title: "",
    description: "",
    progress: 0,
    progressNumber: 0,
    assignedTo: new Array,
    prio: "",
    dueDate: "",
    subtasks: new Array
}

let categories = [
    { name: "Sales", color: "#E200BE" },
    { name: "Backoffice", color: "#2AD300" },
    { name: "Design", color: "#FF8A00" },
    { name: "Development", color: "#8AA4FF" }
];

let contacts = [
    { name: 'Hosny Fahim', email: 'hosny@test.com' },
    { name: 'Yannik Morjan', email: 'yannik@test.com' },
    { name: 'Gerhard Baliet', email: 'gerhard@test.com' }
];




// async function createTask() {
//     let newTask = {
//         id: 0,
//         title: document.getElementById('title').value,
//         description: document.getElementById('description').value,
//         category: document.getElementById('category').value,
//         assignedTo: document.getElementById('assignedTo').value,
//         dueDate: document.getElementById('Date').value,
//         prio: document.getElementById('prio').value,
//         subtasks: document.getElementById('subtasks').value
//     }

// }

/**
 * It takes two parameters, a name and a color, and then it changes the innerHTML of a div to display
 * the name and color.
 * @param name - The name of the category
 * @param color - the class name of the color you want to use
 */
function selectCategory(name, color) {
    closeSelection();
    let categoryList = document.getElementById('selectField');
    if (categoryList) {
        categoryList.innerHTML = `
        <p id="categoryName" class="textBox"></p>
        <div id="categoryColor" class="listContactInitials contactScale left"></div>
        `;
        document.getElementById('categoryName').innerHTML = name;
        document.getElementById('categoryColor').style.backgroundColor = color;
    }
}




function addTitle() {
    document.getElementById('input').value;
}

function addDescription() {
    document.getElementById('description').value;
}

/**
 * It takes a color as an argument and pushes a new object to the categories array. The object has a
 * name and color property. The name property is the value of the categoryInput element. The color
 * property is the color argument.
 * 
 * The function then calls the selectCategory function with the name and color of the new category.
 * 
 * The function then calls the clearNewCategory function.
 * @param color - the color of the category
 */
function selectNewCategory(color) {
    let categoryInput = document.getElementById('categoryInput').value;
    if (categoryInput) {
        categories.push({ name: categoryInput, color: color });
        selectCategory(categories[categories.length - 1].name, categories[categories.length - 1].color);
        renderNewCategory();
        clearNewCategory();
        changeSelectedColorStyle();
        document.getElementById('saveNewCategory').setAttribute('onclick', '');
    }
}


/* Rendering the categories to the page. */
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

/**
 * When the user clicks on a color, the function will wait 100 milliseconds, then it will change the
 * onclick attribute of the saveNewCategory button to selectNewCategory(color).
 * @param color - The color that the user selected.
 */
function selectColor(id, color) {

    setTimeout(() => {
        let element = document.getElementById('newCategoryColor');
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
        } else {
            element.classList.add('selected');
        }
        document.getElementById('saveNewCategory').setAttribute('onclick', `selectNewCategory(${id, color})`);
    }, 100);
}

function changeSelectedColorStyle() {

}





function addNewContact() {
    let assignedToInput = document.getElementById('assignedToInput').value;
    if (assignedToInput) {
        document.getElementById('assignedToInput').value = ``;
        clearInviteNewContact();
    }
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
    console.log(task.assignedTo);
}

/**
 * The function takes the value of the input field, pushes it to the array, renders the subtask, clears
 * the input field, and logs the array.
 */
function addSubtask() {
    let inputSubtask = document.getElementById('inputSubtask').value;
    task.subtasks.push(inputSubtask);
    renderSubtask(inputSubtask);
    document.getElementById('inputSubtask').value = ``;
    console.log(task.subtasks);
}
/**
 * It takes the value of the input field and adds it to the HTML as a checkbox.
 * @param {*} taskInput - the value of the input field
 */
function renderSubtask(inputSubtask) {
    document.getElementById('addSubtaskElement').innerHTML += `
    <div class="checkbox">
        <input class="p-absolute" type="checkbox">
        <span>${inputSubtask}</span>
    </div>`
}

function saveSubtaskInJson() {

}


/* Checking the id of the button that was clicked and then calling the appropriate function. */
function changePriority(button) {
    if (button.id == 'urgent') {
        changeColorUrgent(button);
    } else if (button.id == 'medium') {
        changeColorMedium(button);
    } else if (button.id == 'low') {
        changeColorLow(button);
    }
        // document.getElementById(id + '-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    // document.getElementById('urgent').style.backgroundColor = '#FFFFFF';
    // document.getElementById('medium').style.backgroundColor = '#FFFFFF';
    // document.getElementById('low').style.backgroundColor = '#FFFFFF';
    // task.prio = id;
    // console.log(task.prio);
    // document.getElementById(id).style.backgroundColor = color;
    // setTimeout(() => {
    //     document.getElementById(id).onclick = function () {resetBgColor(id, color)};
    // }, 100);
}

/**
 * It changes the background color of the button that was clicked, and then changes the onclick
 * attribute of the other buttons to a different function.
 * @param button - the button that was clicked
 */
function changeColorUrgent(button) {
    button.style.backgroundColor = '#FF3D00';
    setTimeout(() => {
    }, 200);
    document.getElementById('urgent').setAttribute('onclick', `resetBgColor(this)`);
    document.getElementById('medium').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('low').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('medium').style.backgroundColor = '#FFFFFF';
    document.getElementById('low').style.backgroundColor = '#FFFFFF';
}

/**
 * It changes the background color of the button to orange, and then changes the onclick attribute of
 * the other two buttons to a function that changes the priority of the task.
 * @param button - the button that was clicked
 */
function changeColorMedium(button) {
    button.style.backgroundColor = '#FFA800';
    setTimeout(() => {
    }, 200);
    document.getElementById('medium').setAttribute('onclick', `resetBgColor(this)`);
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
    setTimeout(() => {
    }, 200);
    document.getElementById('low').setAttribute('onclick', `resetBgColor(this)`);
    document.getElementById('urgent').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('medium').setAttribute('onclick', `changePriority(this)`);
    document.getElementById('urgent').style.backgroundColor = '#FFFFFF';
    document.getElementById('medium').style.backgroundColor = '#FFFFFF';
}



/* Checking the id of the button that was clicked and then calling the appropriate function to reset
the background color. */
function resetBgColor(button) {
    if (button.id == 'urgent') {
        resetColorUrgent (button);
    } else if (button.id == 'medium') {
        resetColorMedium (button);
    } else if (button.id == 'low') {
        resetColorLow(button);
    }
        // document.getElementById(id + '-img').style.filter = '';
    // document.getElementById('urgent').style.backgroundColor = '#FFFFFF';
    // document.getElementById('medium').style.backgroundColor = '#FFFFFF';
    // document.getElementById('low').style.backgroundColor = '#FFFFFF';
    // task.prio = '';
    // console.log(task.prio);
    // document.getElementById(id).style.backgroundColor = '#FFFFFF';
    // setTimeout(() => {
    //     document.getElementById(id).onclick = function () {changePriority(id, color)};
    // }, 100);

}

/**
 * When the user clicks the button, the button's background color changes to red, and the button's
 * onclick attribute is changed to a function that resets the button's background color to white.
 * @param button - the button that was clicked
 */
function resetColorUrgent(button) {
    button.style.backgroundColor = '#FFFFFF';
    setTimeout(() => {
    }, 200);
    document.getElementById('urgent').setAttribute('onclick', `changePriority(this)`);
}

/**
 * When the user clicks on the button, the button's background color changes to white, and the button's
 * onclick attribute is set to the changePriority function.
 * @param button - the button that was clicked
 */
function resetColorMedium(button) {
    button.style.backgroundColor = '#FFFFFF';
    setTimeout(() => {
    }, 200);
    document.getElementById('medium').setAttribute('onclick', `changePriority(this)`);
}

/**
 * When the user clicks on the button, the button's background color changes to white, and the onclick
 * attribute of the button is set to the changePriority function.
 * @param button - the button that was clicked
 */
function resetColorLow(button) {
    button.style.backgroundColor = '#FFFFFF';
    setTimeout(() => {
    }, 200);
    document.getElementById('low').setAttribute('onclick', `changePriority(this)`);
}















///**      Selection Functions       **///


/**
 * It removes the class 'd-none' from the element with the id 'list' and adds the class 'growIn' to the
 * same element. Then, after 200 milliseconds, it removes the class 'growIn' from the same element.
 * Finally, it changes the onclick attribute of the element with the id 'selectField' to
 * 'closeSelection()'.
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
 * It adds a class to the list element that makes it grow out, then after 200ms it adds a class that
 * makes it disappear and removes the class that makes it grow out.
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
 * When the user clicks the button, the function will remove the class 'd-none' from the element with
 * the id 'newCategory' and the element with the id 'colorSelection' and add the class 'd-none' to the
 * element with the id 'selectField' and the element with the id 'list'.
 */
function newCategory() {
    document.getElementById('newCategory').classList.remove('d-none');
    document.getElementById('colorSelection').classList.remove('d-none');
    document.getElementById('selectField').classList.add('d-none');
    document.getElementById('list').classList.add('d-none');

}

/**
 * It removes the class 'd-none' from the element with the id 'selectField' and adds the class 'd-none'
 * to the element with the id 'newCategory' and the element with the id 'colorSelection'. It also sets
 * the onclick attribute of the element with the id 'selectField' to the function 'openSelection()'.
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
 * 'openContactSelection()'.</code>
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
