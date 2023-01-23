function generateTaskInfoHTML(i) {
    let element = filterdTasks[i]
    return /*html*/ `<div class="taskInfoBg">
    <div class="categoryTag tag${element['category']}"> ${element['category']} </div>
    
    <div id="titleInfo"> <b class="infoTitle">${element['title']}</b> </div>
    <div> <span class="infoDesc">${element['description']}</span>
    </div>
    <div class="priorityInfo"> <b class="infoDesc">Due date:</b> <span class="infoDesc">${element['dueDate']}</span> </div>
    <div class="priorityInfo"> <b class="infoDesc">Priority:</b> <div class="urgencyTagInfo"><p>${element['prio']}</p> <img style="height: 20px;" src="img/prio_high.svg" alt=""></div></div>
    <div class="priorityInfo"> <b class="infoDesc">Assigned To:</b>  </div>
    <div class="assingedUserInfoContainer">
        <div class="assingedUserInfo">
            <div class="assignedUserImg">GB</div> <span>Max Mustermann</span>
        </div>
    </div>
<div class="editBtn" onclick="openEditTool(${i})"><img class="editBtnImg" src="img/edit.svg" alt=""  ></div>
<div id="deleteTask" class="deleteTaskBtn d-none"><img class="" src="img/delete.svg" alt=""></div>

</div>

`
}

/**
 * Generates HTML script
 * @param {object} element all task informations
 * @returns board task HTML elements
 */
function generateTaskHTML(i) {

    
    return /*html*/ `<div onclick="openTaskInfo(${i})" draggable="true" ondragstart="startDragging(${filterdTasks[i]['id']})" class="boardTask">
    <div class="categoryTag tag${filterdTasks[i]['category']}"> ${filterdTasks[i]['category']} </div>
    <div>
        <h3>${filterdTasks[i]['title']}</h3>
        <span class="taskDesc">${filterdTasks[i]['description']}</span>
    </div>
    <div class="progressContainer">
        <div class="progressBar">
            <div class="progressLine" style="width: ${filterdTasks[i]['progress']}%">

            </div>
        </div>
        <p>${filterdTasks[i]['progressNumber']}/3 Done</p>
    </div>
    <div class="user_urgency">
        <div class="assignedTo">
            <div class="assignedUser">
                HF
            </div>
            <div class="assignedUser">
                YM
            </div>
            <div class="assignedUser">
                GB
            </div>
        </div>
        <div class="urgency">
            <img src="img/prio_${filterdTasks[i]['prio']}.svg" alt="${filterdTasks[i]['prio']}"> 
        </div>
    </div>
    `
}

function generateEditBoardTask(i) {
    return /*html*/ `
     <div class="editInfo">
            <div id="main-container-addTask" class="main-container-addTask">
                <form onsubmit="createTask()" action="" class="addTask" id="add-new-task" method="dialog">
                    <div class="columnLeft">
                        <div class="container">
                            <h3>Title</h3>
                            <input class="input-addTask" required placeholder="Add Title" id="title" onchange="addTitle()">
                        </div>
                        <div class="container">
                            <h3>Description</h3>
                            <textarea required placeholder="Enter a description" id="description" method="dialog"
                                onchange="addDescription()"></textarea>
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
                                    class="listContactInitial bgVi" id="newCategoryColor-1">
                                </div>
                                <div onclick="selectColor('colorRange[1]', 'newCategoryColor-2')"
                                    class="listContactInitial bgRd" id="newCategoryColor-2">
                                </div>
                                <div onclick="selectColor('colorRange[2]', 'newCategoryColor-3')"
                                    class="listContactInitial bgLg" id="newCategoryColor-3">
                                </div>
                                <div onclick="selectColor('colorRange[3]', 'newCategoryColor-4')"
                                    class="listContactInitial bgOg" id="newCategoryColor-4">
                                </div>
                                <div onclick="selectColor('colorRange[4]', 'newCategoryColor-5')"
                                    class="listContactInitial bgRo" id="newCategoryColor-5">
                                </div>
                                <div onclick="selectColor('colorRange[5]', 'newCategoryColor-6')"
                                    class="listContactInitial bgBu" id="newCategoryColor-6">
                                </div>
                            </div>
                            <div onclick="openSelection()" class="select-field" id="selectField">
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
                            <div id="selectContact" class="select-color d-none">
                                <div id="contactCircle" class=" bgVi"></div>
                                <div id="contactCircle" class="listContact bgRd"></div>
                                <div id="contactCircle" class="listContact bgLg"></div>
                            </div>
                            <div onclick="openContactSelection()" class="select-field" id="selectioContactField">
                                <p>Select contacts to assign</p>
                                <img src="img/arrow.png">
                            </div>
    
                            <div id="listContact" class="list d-none"></div>
                        </div>
                    </div>
    
                    <div class="middleLine"></div>
    
                    <div class="columnRight">
                        <div class="container">
                            <h3>Due date</h3>
                            <input onchange="addDate()" class="input-addTask" type="date" id="date">
                        </div>
                        <div class="prio">
                            <h3>Prio</h3>
                            <div class="prio-buttons">
                                <div class="prio-btns" onclick="changePriority(this)" id="urgent">
                                    Urgent
                                    <img id="urgent-img" src="img/prio_urgent.svg">
                                </div>
                                <div class="prio-btns" onclick="changePriority(this)" id="medium">
                                    Medium
                                    <img id="medium-img" src="img/prio_medium.svg">
                                </div>
                                <div class="prio-btns" onclick="changePriority(this)" id="low">
                                    Low
                                    <img id="low-img" src="img/prio_low.svg">
                                </div>
                            </div>
                        </div>
                        <div class="container">
    
                            <h3>Subtasks</h3>
                            <div class="subtasks">
                                <input id="inputSubtask" class="input-addTask" placeholder="Add new subtask" type=""><img
                                    onclick="addSubtask()" src="img/plus.svg">
                            </div>
                        </div>
                        <div id="addSubtaskElement">
                        </div>
    
                        <div class="create-task-buttons">
                            <button type="reset" onclick="cancelTask()" class="clear-btn">Clear <img
                                    src="img/clear.svg"></button>
                            <button type="submit" class="create-task-btn">Create Task <img
                                    src="img/addTask-right.svg"></button>
                        </div>
                    </div>
    
    
                </form>
            </div>
            <dialog id="msgBox" class="msgBox d-none"></dialog>
        </div>`
}