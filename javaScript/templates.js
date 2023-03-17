let numberAssingendUserEdit = 0;

function generateTaskInfoHTML(i) {
    return /*html*/`

<div class="editInfo">
    <div id="main-container-addTask" class="main-container-addTask-board">
                    <div class="moreInfoForm" id="add-new-task" method="dialog">
                        <div class="columnLeft">
                            <div class="container">
                                <h3>Title</h3>
                                <p class="input-addTask">${boardTasks[i]['title']}</p>
                            </div>
                            <div class="container">
                                <h3>Description</h3>
                                <span class="input-addTask" style="height: fit-content" method="dialog" >${boardTasks[i]['description']}</span>
                            </div>
                            <div class="container">
                                <h3>Category</h3>
                                
                                
                                <div class="input-addTask" style="justify-content: space-between"> 
                                    <p class="textBox">${boardTasks[i]['category']}</p>
                                    <div class="listContactInitials" style="background-color: ${boardTasks[i]['categoryColor']}"></div>          
                                </div>
        
                        
                            </div>
                            <div class="container">
                                <h3>Assigned to</h3>
        
                                <div id="assignedUserInfo" class="assingedUserInfo">
                                    <p>Keine Kontakte ausgewählt!</p>
                                </div>
                            </div>
                        </div>
        
                        <div class="middleLine"></div>
        
                        <div class="columnRight" style="justify-content: space-between;">
                            <div> 
                                <div class="container">
                                    <h3>Due date</h3>
                                    <p  class="input-addTask" id="date"> ${boardTasks[i]['dueDate']} </p>
                                </div>
                                <div class="prio">
                                    <h3>Prio</h3>
                                    <div class="prio-buttons" >
                                        <div class="prio-btns" id="urgentBoardInfo" style="cursor: default; pointer-events: none; ">
                                            Urgent
                                            <img id="urgentBoardInfo-img" src="img/prio_urgent.svg">
                                        </div>
                                        <div class="prio-btns" id="mediumBoardInfo" style="cursor: default; pointer-events: none;">
                                            Medium
                                            <img id="mediumBoardInfo-img" src="img/prio_medium.svg">
                                        </div>
                                        <div class="prio-btns" id="lowBoardInfo" style="cursor: default; pointer-events: none;">
                                            Low
                                            <img id="lowBoardInfo-img" src="img/prio_low.svg">
                                        </div>
                                    </div>
                                </div>
                                <div class="container">
        
                                    <h3>Subtasks</h3>
                                    <div class="subTaskContainer" id="subTaskContainer"> </div>
                                </div>
                               
                            
                            </div>
                            <div id="infoBtnsBoard" class="editTask" style="gap: 10px">
                                <button onclick="closeAndSaveInfo()" id="okBoardInfo" class="create-task-btn">Ok<img src="img/addTask-right.svg"></button>
                                <button onclick="openEditTool(${i})" type="submit" class="create-task-btn">Edit Task</button>   
                            </div>
                        </div>
                        
                        <div class="showOnlyMobile">
                            <div class="mobileBackToBoard">
                                <button onclick="closeAndSaveInfo()"><img style="height: 48px; width: 48px;" src="img/backToBoard.svg"></button>
                            </div>
                            <div class="mobileOpenEdit">
                                <button onclick="openEditTool(${i})" type="submit" ><img style="height: 48px; width: 48px;" src="img/openEdit.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
                </div> 
    `

}


/**
 * Generates HTML script
 * @param {object} element all task informations
 * @returns board task HTML elements
 * 
 */



function generateTaskHTML(i, boardIndex) {


    return /*html*/ `<div draggable="true" ondragstart="startDragging(${boardTasks[boardIndex]['id']})" class="boardTask">
    <div class="categoryContainer">
        <div onclick="openTaskInfo(${boardIndex})" class="categoryTag" style="background-color: ${boardTasks[boardIndex]['categoryColor']}"> ${boardTasks[boardIndex]['category']} </div>
        <div class="MobileMoveBtns showOnlyMobileFlex">
            <button class="BoardBtn" onclick="prevBoard(${boardIndex})" id="prevBoard${i}"><img class="prevBoard" src="img/moveArrow.svg" alt=""></button>
            <button class="BoardBtn" onclick="nextBoard(${boardIndex})" id="nxtBoard${i}"><img class="nextBoard" src="img/moveArrow.svg" alt=""></button>
        </div>
    </div>
    <div onclick="openTaskInfo(${boardIndex})">
        <h3>${boardTasks[boardIndex]['title']}</h3>
        <span class="taskDesc">${boardTasks[boardIndex]['description']}</span>
    </div>
    <div onclick="openTaskInfo(${boardIndex})" class="progressContainer" id="progressContainer${boardIndex}">
        <div class="progressBar">
            <div class="progressLine" style="width:${countCheckedSubtasks(boardIndex)}%;">

            </div>
        </div>
        <p>${boardTasks[boardIndex]['progressNumber']}/${boardTasks[boardIndex].subtasks.length} Done</p>
    </div>
    <div onclick="openTaskInfo(${boardIndex})" class="user_urgency">
        <div id='assignedUser${i}' class="assignedTo">
            
        </div>
        <div class="urgency">
            <img src="img/prio_${boardTasks[boardIndex]['prio']}.svg" alt="${boardTasks[boardIndex]['prio']}"> 
        </div>
    </div>
    `
}

function generateEditBoardTask(i) {
    return /*html*/ `
     <div id="editInfo" class="editInfo">

            <div id="main-container-addTask" class="main-container-addTask-board">
                <form class="moreInfoForm" id="add-new-task" method="dialog">
                    <div class="columnLeft">
                        <div class="container">
                            <h3>Title</h3>
                            <input class="input-addTask" required placeholder="Add Title" id="titleEditBoard" value="${boardTasks[i]['title']}">
                        </div>
                        <div class="container">
                            <h3>Description</h3>
                            <textarea required  placeholder="Enter a description" id="descriptionEditBoard" method="dialog" >${boardTasks[i]['description']}</textarea>
                        </div>
                        <div class="container">
                            <h3>Category</h3>
                            <div id="newCategory" class="new-category d-none">
                                <input id="categoryInput" class="input-addTask" placeholder="New category name" type=""><img
                                    class="clear-img" onclick="clearNewCategory()" src="img/clear.svg">
                                <div class="line"></div>
                                <img id="saveNewCategory" class="right-img" onclick="" src="img/addTask-right.svg">
                            </div>
                            <div id="colorSelection" class="select-color d-none">
                                <div onclick="selectColor('colorRange[0]', 'newCategoryColor-1')"
                                    class="selectCategoryColor bgVi" id="newCategoryColor-1">
                                </div>
                                <div onclick="selectColor('colorRange[1]', 'newCategoryColor-2')"
                                    class="selectCategoryColor bgRd" id="newCategoryColor-2">
                                </div>
                                <div onclick="selectColor('colorRange[2]', 'newCategoryColor-3')"
                                    class="selectCategoryColor bgLg" id="newCategoryColor-3">
                                </div>
                                <div onclick="selectColor('colorRange[3]', 'newCategoryColor-4')"
                                    class="selectCategoryColor bgOg" id="newCategoryColor-4">
                                </div>
                                <div onclick="selectColor('colorRange[4]', 'newCategoryColor-5')"
                                    class="selectCategoryColor bgRo" id="newCategoryColor-5">
                                </div>
                                <div onclick="selectColor('colorRange[5]', 'newCategoryColor-6')"
                                    class="selectCategoryColor bgBu" id="newCategoryColor-6">
                                </div>
                            </div>
                            <div onclick="toggleSelection()" class="select-field" id="selectField">

                                <p class="textBox">Select task category</p>
                                <img src="img/arrow.png">

                            </div>
    
                            <div id="list" class="list d-none">
                                <div onclick="newCategory()" class="options">
                                    <p id="selectText">New category</p>
                                </div>
                                <div id="mainCategories"></div>
    
                            </div>
                        </div>
                        <div class="container">
                            <h3>Assigned to</h3>
                          
                            <div onclick="toggleContactSelection()" class="select-field" id="selectioContactField">
                                <p id="contactNumber">Select contacts to assign</p>
                                <img src="img/arrow.png">
                            </div>
    
                            <div id="listContact" class="list d-none"></div>
                        </div>
                    </div>
    
                    <div class="middleLine"></div>
    
                    <div class="columnRight">
                        <div>
                        <div class="container">
                            <h3>Due date</h3>
                            <input value="${boardTasks[i]['dueDate']}" class="input-addTask" type="date" id="EditDate">
                        </div>
                        <div class="prio">
                            <h3>Prio</h3>
                            <div class="prio-buttons">
                                <div class="prio-btns" onclick="toggleColorPrio(this)" id="urgentBoard">
                                    Urgent
                                    <img id="urgentBoard-img" src="img/prio_urgent.svg">
                                </div>
                                <div class="prio-btns" onclick="toggleColorPrio(this)" id="mediumBoard">
                                    Medium
                                    <img id="mediumBoard-img" src="img/prio_medium.svg">
                                </div>
                                <div class="prio-btns" onclick="toggleColorPrio(this)" id="lowBoard">
                                    Low
                                    <img id="lowBoard-img" src="img/prio_low.svg">
                                </div>
                            </div>
                        </div>
                        <div class="container">
    
                            <h3>Subtasks</h3>
                            <div class="subtasks">
                                <input id="inputSubtaskBoard" class="input-addTask" placeholder="Add new subtask" type=""><img
                                    onclick="addSubtaskBoard(${i})" src="img/plus.svg">
                            </div>
                             <div class="subTaskContainerBoard" id="subTaskContainerEdit"> </div>

                        </div>
                        
                    
                        
    
                        <div class="create-task-buttons">
                            <button type="reset" onclick="deleteTask(${i})" class="clear-btn">Delete<img
                                    src="img/trash.png"></button>
                            <button onclick="saveEditedTaskBoard(${i})" type="submit" class="create-task-btn">Edit<img
                                    src="img/addTask-right.svg"></button>
                        </div>
                    </div>

                    <div>
                            <div class="mobileBackToBoard">
                                <button onclick="closeEditTool()"><img style="height: 48px; width: 48px;" src="img/backToBoard.svg"></button>
                            </div>
                            <div class="saveEditMobile">
                                <button onclick="deleteTask(${i})" type="submit" class="centerButtonElements"><img style="height: 40px; width: 40px; filter: invert(1);" src="img/delete.svg" alt=""></button>

                                <button onclick="saveEditedTaskBoard(${i})" type="submit" class="centerButtonElements"><img style="height: 40px; width: 40px;" src="img/addTask-right.svg" alt=""></button>
                            </div>
                    </div>
    
    
                </form>
            </div>
            
        

        </div>`
}

function generateAssignedContacts(i) {

    for (let j = 0; j < boardTasks[i].assignedTo.length; j++) {
        let matchId = mergedContacts.indexOf(mergedContacts.find(u => u.email == boardTasks[i].assignedTo[j].email));
        mergedContacts[matchId].status = true;
    }

    document.getElementById('listContact').innerHTML = ``;
    for (let y = 0; y < mergedContacts.length; y++) {
        if (mergedContacts[y].status) {
            document.getElementById('listContact').innerHTML += /*html*/ `
                    <div class="options-2" onclick="checkClickEdit('checkboxAssignedTo${y + 1}', ${y}, ${i})">
                    <p id='addedUser${y + 1}'>${mergedContacts[y].name}</p>
                    <input id="checkboxAssignedTo${y + 1}"
                        onclick="checkClickEdit('checkboxAssignedTo${y + 1}', ${y}, ${i})" checked class="checkbox"
                        type="checkbox">
                    </div>`;
            renderAssignedNumberInEdit(true);

        } else {
            document.getElementById('listContact').innerHTML += /*html*/ `
                    <div class="options-2" onclick="checkClickEdit('checkboxAssignedTo${y + 1}', ${y}, ${i})">
                    <p id='addedUser${y + 1}'>${mergedContacts[y].name}</p>
                    <input id="checkboxAssignedTo${y + 1}"
                    onclick="checkClickEdit('checkboxAssignedTo${y + 1}', ${y}, ${i})" class="checkbox"
                        type="checkbox">
                    </div>`;
        }
    }
}

/**
 * If the addition parameter is true, increment the numberAssingendUserEdit variable by 1, otherwise
 * decrement it by 1.
 * 
 * Then, update the contactNumber element's innerHTML to reflect the new value of
 * numberAssingendUserEdit.
 * 
 * If the new value of numberAssingendUserEdit is 0, set the contactNumber element's innerHTML to
 * "Select contacts to assign".
 * 
 * If the new value of numberAssingendUserEdit is 1, set the contactNumber element's innerHTML to "1
 * contact assigned".</code>
 * @param addition - true or false
 */
function renderAssignedNumberInEdit(addition) {
    if (addition) {
        numberAssingendUserEdit += 1;
    } else {
        numberAssingendUserEdit -= 1;
    }
    document.getElementById('contactNumber').innerHTML = `${numberAssingendUserEdit} contacts assigned`;
    if (numberAssingendUserEdit == 0) {
        document.getElementById('contactNumber').innerHTML = `Select contacts to assign`;
    } else if (numberAssingendUserEdit == 1) {
        document.getElementById('contactNumber').innerHTML = `${numberAssingendUserEdit} contact assigned`;
    }
}

/**
 * If the checkbox is checked, render the assigned number in the edit form. If the checkbox is not
 * checked, do not render the assigned number in the edit form.
 * @param checkboxId - the id of the checkbox
 */
function checkingIfAssignedTrue(checkBoxId, mergedId, boardId) {
    let checkBox = document.getElementById(checkBoxId);
    if (checkBox.checked == true) {
        renderAssignedNumberInEdit(true);
        addAssignedToBoard(mergedId, boardId);
    } else {
        renderAssignedNumberInEdit(false);
        removeAssignedToBoard(mergedId, boardId);
    }

}

function categoryListItemHTML(name  ,color) {
    return `
        <p id="categoryName" class="textBox">${name}</p>
        <div id="categoryColor" style="background-color: ${color}" class="selectCategoryColor left"></div>
        `
}

function generateSelectCategoryHTML() {
    return `
    <p class="textBox">Select task category</p>
    <img src="img/arrow.png">`
}

function generateNewCategoryHTML(i) {
    return `
    <div  class="options">
        <div class="category-element" onclick="selectCategory('${categories[i].name}', '${categories[i].color}')">
          <p>${categories[i].name}</p>
          <div id="categoryColorDiv${i}" class="selectCategoryColor left"></div>
        </div>
        <div class="delete-img">
          <img class="delete-category" onclick="deleteCategory(${i})" src="img/trash.png">
        </div>  
    </div>`
}

function genarateContactAssignedTo(i) {
    return `
    <div onclick="checkClick('checkboxAssignedTo${i + 1}', ${i})" class="options-2">
         <p data-tooltip="${contacts[i].email}" data-flow="top right" id='addedUser${i + 1}'>${contacts[i].name}</p>
         <input id="checkboxAssignedTo${i + 1}" onclick="checkClick('checkboxAssignedTo${i + 1}', ${i})" type="checkbox" class="assigndTo-input">
    </div>

    `;
}

function generateNotCheckedSubtask(i) {
   return `
            <div class="subtask-element">
                <div class="justify-content-center">
                  <input onclick="subtaskChecked(${i})" id="checkbox-subtask${i}" class="p-absolute" type="checkbox"></input>
                  <span>${task.subtasks[i].title}</span>
                </div>
                <div class="delete-img">
                  <img onclick="deleteSubtask(${i})" class="delete-subtask-trash" src="img/trash.png">
                </div>
            </div>`
}

function generateCheckedSubtask(i) {
    return `
    <div class="subtask-element">
        <div class="justify-content-center">
          <input onclick="subtaskChecked(${i})" checked id="checkbox-subtask${i}" class="p-absolute" type="checkbox"></input>
          <span>${task.subtasks[i].title}</span>
        </div>
        <div class="delete-img">
          <img onclick="deleteSubtask(${i})" class="delete-subtask-trash" src="img/trash.png">
        </div>
    </div>`
}



function generateSubtaskBoard(i, y, subtask) {
    return /*html*/ `
    <div class="subTaskParent">
        <div class="subtaskInfo">
            <input ${subtask.status ? 'checked' : ''} class="subtaskCheckbox" id="subtaskCheckboxBoard${y}" onclick="subtaskCheckedBoard(${i}, ${y})" type="checkbox">
            <p>${subtask.title}</p>
        </div>
        <div class="delete-img">
             <img src="img/trash.png" class="delete-subtask-trash" onclick="deleteSubtaskBoard(${i}, ${y})">
        </div>
    </div>
    `;
}

function generateAssignedUserInfoBoard(i, y) {
        return /*html*/`
            <div class="assignedUserInfoParent">
                <div class="assignedUserImg" style="background-color: ${boardTasks[i].assignedTo[y].color}" data-tooltip="${boardTasks[i].assignedTo[y].email}" data-flow="right">
                  ${getInitials(boardTasks[i].assignedTo[y].name)}
                </div>
                <p>${boardTasks[i].assignedTo[y].name}</p>
        </div>
            
            `
}

function generateSubtaskInfoBoard(i, y, checkedAttribute) {
    return /*html*/`
    <div class="subtaskInfo">
        <input class="subtaskCheckbox" onclick="subtaskCheckedInfo(${i})" id="subtaskCheckboxInfo${y}" type="checkbox" ${checkedAttribute}>
        <p>${boardTasks[i].subtasks[y].title}</p>
    </div>
    `
}

function generateDisplayedCardUsers(y, assignedUsers) {
        return    /*html*/`
            <div class="assignedUser" style="background-color: ${assignedUsers[y].color}">
                ${getInitials(assignedUsers[y].name)}
            </div>`
}

function generateNotDisplayedCardUsers(assignedUsersLength, maxUsersToDisplay) {
        return /*html*/`
            <div class="assignedUser">
                +${assignedUsersLength - maxUsersToDisplay}
            </div>`
}