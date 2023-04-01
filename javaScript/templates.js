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
                            <div id="newCategoryBoard" class="new-category d-none">
                                <input id="categoryInputBoard" class="input-addTask" placeholder="New category name" type=""><img
                                    class="clear-img" onclick="clearNewCategoryBoard()" src="img/clear.svg">
                                <div class="line"></div>
                                <img id="saveNewCategoryBoard" class="right-img" onclick="createCategoryBoard()" src="img/addTask-right.svg">
                            </div>
                            <div id="colorSelectionBoard" class="select-color d-none">
                                
                            </div>
                            <div onclick="toggleSelectionBoard()" class="select-field" id="selectFieldBoard">

                                <p class="textBox">Select task category</p>
                                <img src="img/arrow.png">

                            </div>
    
                            <div id="listBoard" class="list d-none">
                                <div onclick="newCategoryBoard()" class="options">
                                    <p id="selectText">New category</p>
                                </div>
                                <div id="mainCategoriesBoard"></div>
    
                            </div>
                        </div>
                        <div class="container">
                            <h3>Assigned to</h3>
                          
                            <div onclick="toggleContactSelectionBoard()" class="select-field" id="selectioContactField">
                                <p id="contactNumberBoard">Select contacts to assign</p>
                                <img src="img/arrow.png">
                            </div>
    
                            <div id="listContactBoard" class="list d-none"></div>
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
                    </div>
    
                </form>
            </div>
            
        

        </div>`
}

function generateAssignedContactsHTML(i) {
    document.getElementById('listContactBoard').innerHTML = mergedContacts.map((contact, y) => {
        return /*html*/ `
                <div class="options-2" onclick="toggleCheckbox('checkboxAssignedToBoard${y + 1}', ${y}, ${i})">
                    <p id='addedUser${y + 1}'>${contact.name}</p>
                    <input id="checkboxAssignedToBoard${y + 1}"
                        class="checkbox" type="checkbox" ${contact.status ? 'checked' : ''}
                        style="pointer-events: none;"> 
                </div>`;
    }).join('');
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

function generateNewCategoryHTML(i, Board) {
    return `
    <div  class="options">
        <div class="category-element" onclick="selectCategory${Board}('${categories[i].name}', '${categories[i].color}')">
          <p>${categories[i].name}</p>
          <div id="" style="background-color: ${categories[i].color}" class="selectCategoryColor left"></div>
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

function returnContactLetterSeperator(i) {
    return /*html*/ `
        <div class="contactList">
            <div class="listLetter">${String.fromCharCode(97 + i).toUpperCase()}</div>
            <div class="listSeperator">
        </div>`
}

function returnContactElement(i,j) {
    return /*html*/ `
        <button class="listContact" onclick="mobileSwitchToDetail(), renderContactDetails(${i},${j})">
            <div id="single-contact-init${orderedContacts[i][j].id}" class="listContactInitials">${orderedContacts[i][j].initials}</div>
            <div class="listContactInfo">
                <span class="listContactName">${orderedContacts[i][j].name}</span>
                <span class="listContactEmail">${orderedContacts[i][j].email}</span>
            </div>
        </button>`;
}

function generateRenderContactDetails(firstIndex, secondIndex) {
    return /*html*/ `
    <div class="contactHeader">
        <span id="single-contact-detail-init" class="listContactInitials contactScale">${orderedContacts[firstIndex][secondIndex].initials}</span>
        <div class="contactInfo">
            <span class="contactName">${orderedContacts[firstIndex][secondIndex].name}</span>
            <a onclick="openTaskPopUp(), setDate(), getSelectedContact(${firstIndex}, ${secondIndex})" class="contactAddTaskBtn">
                <img class="addTaskBtnImg" src="img/plus.svg">
                <span class="addTaskBtnText">Add Task</span>
            </a>
        </div>
    </div>
    <div class="contactInformationHead">
        <span class="contactInformationTitle">Contact Information</span>
        <button class="editContactBtn" onclick="changeOverlayToEditContact(${firstIndex},${secondIndex})">
            <img src="img/pencil_wo_bg.svg">
            <span>Edit Contact</span>
        </button>
    </div>
    <div class="contactAdressInformations">
        <div class="contactAdressSegment">
            <span class="contactAdressTitle">Email</span>
            <a href="mailto: ${orderedContacts[firstIndex][secondIndex].email}" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].email}</a>
        </div>
        <div class="contactAdressSegment">
            <span class="contactAdressTitle">Phone</span>
            <a href="tel: ${orderedContacts[firstIndex][secondIndex].phone}" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].phone}</a>
        </div>
    </div>`;
}

function generateChangeOverlayToEditContact(firstIndex, secondIndex) {
    return /*html*/ `
    <div class="overlayLeft">
        <img src="img/logo-white.svg">
        <span id="overlay-headline" class="overlayHealine">Edit contact</span>
        <div class="overlaySperator"></div>
    </div>
    <div class="overlayRight">
        <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
        <div class="userContainer">
            <span id="overlay-user-img" class="overlayUserImg">${orderedContacts[firstIndex][secondIndex].initials}</span>
        </div>
        <form class="overlayInputForm" onsubmit="saveContact(${firstIndex}, ${secondIndex}); return false">
            <div class="overlayInputSection">
                <input id="input-name" placeholder="Name" type="text" pattern="[a-zA-ZÄäÜüÖöß ]*" maxlength="30" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].name}" required><img src="img/user.svg">
            </div>
            <div class="overlayInputSection">
                <input id="input-email" placeholder="Email" type="email" maxlength="40" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].email}" required><img src="img/Email.svg">
            </div>
            <div class="overlayInputSection">
                <input id="input-phone" placeholder="Phone" type="tel" pattern="[0-9+/ ]*" minlength="6" maxlength="30" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].phone}" required><img src="img/phone.svg">
            </div>
            <button id="overlay-save-btn" type="submit" class="overlayActionBtn">Save</button>
            </form>
            <button onclick="deleteContact()" id="overlay-cancel-btn" class="overlayCancelBtn">
                <span>Delete</span>
                <img src="img/trash.png">
            </button>
    </div>`;
}

function generateChangeOverlayToNewContact() {
    return /*html*/ `
    <div class="overlayLeft">
        <img src="img/logo-white.svg">
        <span id="overlay-headline" class="overlayHealine">Add contact</span>
        <span id="overlay-subheadline" class="overlaySubheadline">Tasks are better with a team!</span>
        <div class="overlaySperator"></div>
    </div>
    <div class="overlayRight">
        <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
        <div class="userContainer">
            <img id="overlay-default-user-img" class="overlayDefaultUserImg" src="img/defaultUser.svg">
        </div>
        <form class="overlayInputForm" onsubmit="createContact(); return false;">
            <div class="overlayInputSection">
                <input id="input-name" placeholder="Name" type="text" pattern="[a-zA-ZäÄöÖüÜß ]*" maxlength="30" class="overlayInput" required><img src="img/user.svg">
            </div>
            <div class="overlayInputSection">
                <input id="input-email" placeholder="Email" type="email" maxlength="40" class="overlayInput" required><img src="img/Email.svg">
            </div>
            <div class="overlayInputSection">
                <input id="input-phone" placeholder="Phone" type="tel" pattern="[0-9+/ ]*" minlength="6" maxlength="30" class="overlayInput" required><img src="img/phone.svg">
            </div>
            <button id="overlay-create-btn" typ="submit" class="overlayActionBtn">
                <span>Create contact</span>
                <img src="img/simpleCheck.svg">
            </button>
        </form>
        <button onclick="closeOverlay()" id="overlay-cancel-btn" class="overlayCancelBtn">
            <span>Cancel</span>
            <img src="img/closeCross.svg">
        </button>        
    </div>`;
}