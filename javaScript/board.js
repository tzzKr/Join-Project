
// Board arrays

let boardTasks;
let filterdTasks = [];
let currentDraggedElement;
let categoriesBoard = [];
let contactsBoard;



async function getTaskCatrgories() {
    await downloadFromServer();
    categoriesBoard = JSON.parse(backend.getItem('taskCategories')) || [];
}

async function saveTaskCategories() {
    await backend.setItem('taskCategories', JSON.stringify(categoriesBoard));
    initMsgBox('New Category created!');
}

async function saveTasks() {
    await backend.setItem('tasks', JSON.stringify(boardTasks))
}

async function loadTasks() {
    await downloadFromServer();
    boardTasks = JSON.parse(await backend.getItem('tasks')) || [];
    for (let i = 0; i < boardTasks.length; i++) {
        boardTasks[i]['id'] = i;
    }
    filterdTasks = boardTasks;
    renderTodos(filterdTasks);

}

// HALLO

function filterTasks() {
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase();

    if (search.length == 0)
        filterdTasks = boardTasks;
    else
        filterdTasks = boardTasks.filter(t => t.title.toLowerCase().startsWith(search));

    renderTodos(filterdTasks);
}
/**
 * Renders every task on board page"!
 * 
 * @param {Array} tasks all task informations
 */

function renderTodos(tasks) {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let task = boardTasks.find(t => t.id == filterdTasks[i].id);
        let boardIndex = boardTasks.indexOf(task);

        

        document.getElementById(tasks[i]['board']).innerHTML += generateTaskHTML(i, boardIndex);
        renderAssingedUser(boardIndex, i);
        checkProgress(boardIndex);
    }

}


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
    filterTasks()

}


function startDragging(id) {
    currentDraggedElement = id;

}

function allowDrop(ev) {
    ev.preventDefault();

}

function moveTo(boardCategory) {
    boardTasks[currentDraggedElement]['board'] = boardCategory;
    saveTasks();
}

async function saveTasks() {
    await backend.setItem('tasks', JSON.stringify(boardTasks));
    loadTasks();
}

function showDragAreas() {
    document.getElementById('todo').classList.add('dragBackground');
    document.getElementById('inProgress').classList.add('dragBackground');
    document.getElementById('testing').classList.add('dragBackground');
    document.getElementById('done').classList.add('dragBackground');

}
function removeDragAreas() {
    document.getElementById('todo').classList.remove('dragBackground');
    document.getElementById('inProgress').classList.remove('dragBackground');
    document.getElementById('testing').classList.remove('dragBackground');
    document.getElementById('done').classList.remove('dragBackground');
}

function checkProgress(i) {


    if (boardTasks[i].board == 'todo' || boardTasks[i].board == 'todo') {
        document.getElementById('progressContainer'+i).classList.add('d-none');
        
    }
    if (boardTasks[i].subtasks.length == 0) {   
    
        document.getElementById('progressContainer'+i).classList.add('d-none');

    }


    

}

function openEditTool(i) {


    let task = boardTasks.find(t => t.id == filterdTasks[i].id);
    let index = boardTasks.indexOf(task);
    console.log(boardTasks[index]['dueDate'])

    document.getElementById('editContainer').innerHTML = generateEditBoardTask(index);
    renderNewCategory();
    selectCategory(boardTasks[i].category, boardTasks[i].categoryColor);


    document.getElementById('moreInfoBg').classList.remove('d-none')
    document.getElementById('taskInfoContainer').classList.add('d-none')
    document.getElementById('backgroundCloser').classList.add('d-none')
    getContactsBoard(i);
    // showPrioEditTool(i)
}

function closeEditTool() {
    document.getElementById('moreInfoBg').classList.add('d-none')
    document.getElementById('editInfo').classList.add('d-none')
    renderTodos(boardTasks)
}

function renderNewCategory() {
    document.getElementById('mainCategoriesBoard').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategoriesBoard').innerHTML += `
        <div onclick="selectCategory('${categories[i].name}', '${categories[i].color}')" class="options">
            <p>${categories[i].name}</p>
            <div id="categoryColorDivBoard${i}" class="listContactInitials contactScale left"></div>
        </div>`;
        document.getElementById(`categoryColorDivBoard${i}`).style.backgroundColor = categories[i].color;
    }
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

function emptySearch() {
    let search = document.getElementById('boardInput');
    search.value = ""
}


function renderAssingedUser(boardIndex, locationIndex) {

    for (let y = 0; y < boardTasks[boardIndex].assignedTo.length; y++) {

        if (y == 2 && boardTasks[boardIndex].assignedTo.length > 3) {
            document.getElementById('assignedUser' + locationIndex).innerHTML += /*html*/`
            <div class="assignedUser">
                +${boardTasks[boardIndex].assignedTo.length - 2}
                    </div>`
            break
        }


        document.getElementById('assignedUser' + locationIndex).innerHTML += /*html*/`

            <div class="assignedUser" style="background-color: ${boardTasks[boardIndex].assignedTo[y].color}">
                ${getInitials(boardTasks[boardIndex].assignedTo[y].name)}
                    </div>`
    }
}

function renderSubTasksInfo(i) {

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {

        if (!boardTasks[i].subtasks[y].status) {
            document.getElementById('subTaskContainer').innerHTML += /*html*/`
            <div class="subtaskInfo">
                <input type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
            </div>
            `
    
        }else {

            document.getElementById('subTaskContainer').innerHTML += /*html*/`
        
            <div class="subtaskInfo">
                <input checked type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
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


async function getContactsBoard(i) {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let userName = sessionStorage.getItem('sessionUser');
    let user = users.find(u => u.name == JSON.parse(userName));
    contactsBoard = user.contacts;
    renderContactsAssigndToBoard(i);
}





function renderContactsAssigndToBoard(i) {
    let array1 = boardTasks[i].assignedTo;
    let array2 = contactsBoard;
    let uniqueContacts = new Set();
    let mergedCantacts = [];

    for (const element of array1.concat(array2)) {
        if (!uniqueContacts.has(element.name)) {
            uniqueContacts.add(element.name);
            mergedCantacts.push(element);
        }
    }


    document.getElementById('listContact').innerHTML = ``;

    for (let y = 0; y < mergedCantacts.length; y++) {
        document.getElementById('listContact').innerHTML += `
        <div class="options-2">
            <p id='addedUser${y + 1}'>${mergedCantacts[y].name}</p>openopen
            <input id="checkboxAssignedTo${y + 1}"
              onclick="checkboxAssignedTo('checkboxAssignedTo${y + 1}', )" class="checkbox"
            type="checkbox">
        </div>`;
    }
}



function toggleColor(button) {
  // Reset the color for all buttons
    document.getElementById("urgentBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("mediumBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("lowBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById('urgentBoard-img').style.filter = 'none';
    document.getElementById('mediumBoard-img').style.filter = 'none';
    document.getElementById('lowBoard-img').style.filter = 'none';

  // Set the color for the selected button
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
