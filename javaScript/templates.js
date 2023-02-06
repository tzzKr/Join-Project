

function generateTaskInfoHTML(i) {
    return /*html*/`

<div class="editInfo" style="z-index: 20">
    <div id="main-container-addTask" class="main-container-addTask">
                    <form action="" class="addTask" id="add-new-task" method="dialog">
                        <div class="columnLeft">
                            <div class="container">
                                <h3>Title</h3>
                                <p class="input-addTask" id="title"> ${boardTasks[i]['title']} </p>
                            </div>
                            <div class="container">
                                <h3>Description</h3>
                                <span class="input-addTask" style="height: fit-content" id="description" method="dialog" >${boardTasks[i]['description']}</span>
                            </div>
                            <div class="container">
                                <h3>Category</h3>
                                
                                
                                <div class="input-addTask" style="justify-content: space-between" id="selectField">
                                    <p class="textBox">${boardTasks[i]['category']}</p>
                                    <div class="listContactInitials" style="background-color: ${boardTasks[i]['categoryColor']}"></div>          
                                </div>
        
                        
                            </div>
                            <div class="container">
                                <h3>Assigned to</h3>
        
                                <div id="assignedUserInfo" class="assingedUserInfo">
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
                                    <div class="prio-btns" id="urgentBoardInfo" style="cursor: default">
                                        Urgent
                                        <img id="urgentBoardInfo-img" src="img/prio_urgent.svg">
                                    </div>
                                    <div class="prio-btns" id="mediumBoardInfo" style="cursor: default">
                                        Medium
                                        <img id="mediumBoardInfo-img" src="img/prio_medium.svg">
                                    </div>
                                    <div class="prio-btns" id="lowBoardInfo" style="cursor: default">
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
                            <div class="editTask">
                                <button onclick="openEditTool(${i})" type="submit" class="create-task-btn">Edit Task<img
                                        src="img/addTask-right.svg"></button>
                            </div>
        
                        
                    </form>
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


    return /*html*/ `<div onclick="openTaskInfo(${i})" draggable="true" ondragstart="startDragging(${filterdTasks[i]['id']})" class="boardTask">
    <div class="categoryTag" style="background-color: ${filterdTasks[i]['categoryColor']}"> ${filterdTasks[i]['category']} </div>
    <div>
        <h3>${filterdTasks[i]['title']}</h3>
        <span class="taskDesc">${filterdTasks[i]['description']}</span>
    </div>
    <div class="progressContainer" id="progressContainer${boardIndex}">
        <div class="progressBar">
            <div class="progressLine" style="width: ${filterdTasks[i]['progress']}%">

            </div>
        </div>
        <p>${filterdTasks[i]['progressNumber']}/3 Done</p>
    </div>
    <div class="user_urgency">
            <div id='assignedUser${i}' class="assignedTo">
            
        </div>
        <div class="urgency">
            <img src="img/prio_${filterdTasks[i]['prio']}.svg" alt="${filterdTasks[i]['prio']}"> 
        </div>
    </div>
    `
}

function generateEditBoardTask(i) {
    return /*html*/ `
     <div id="editInfo" class="editInfo">

            <div id="main-container-addTask" class="main-container-addTask">
                <form action="" class="addTask" id="add-new-task" method="dialog">
                    <div class="columnLeft">
                        <div class="container">
                            <h3>Title</h3>
                            <input class="input-addTask" required placeholder="Add Title" id="title" value="${boardTasks[i]['title']}">
                        </div>
                        <div class="container">
                            <h3>Description</h3>
                            <textarea required  placeholder="Enter a description" id="description" method="dialog" >${boardTasks[i]['description']}</textarea>
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
                                <p class="textBox">${boardTasks[i]['category']}</p>
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
                          
                            <div onclick="openContactSelection()" class="select-field" id="selectioContactField">
                                <p>Select contacts to assign</p>
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
                            <input value="${boardTasks[i]['dueDate']}" class="input-addTask" type="date" id="date">
                        </div>
                        <div class="prio">
                            <h3>Prio</h3>
                            <div class="prio-buttons">
                                <div class="prio-btns" onclick="toggleColor(this)" id="urgentBoard">
                                    Urgent
                                    <img id="urgentBoard-img" src="img/prio_urgent.svg">
                                </div>
                                <div class="prio-btns" onclick="toggleColor(this)" id="mediumBoard">
                                    Medium
                                    <img id="mediumBoard-img" src="img/prio_medium.svg">
                                </div>
                                <div class="prio-btns" onclick="toggleColor(this)" id="lowBoard">
                                    Low
                                    <img id="lowBoard-img" src="img/prio_low.svg">
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
                        </div>
                        
    
                        <div class="create-task-buttons">
                            <button type="reset" onclick="deleteTask(${i})" class="clear-btn">Delete<img
                                    src="img/trash.png"></button>
                            <button type="submit" class="create-task-btn">Edit<img
                                    src="img/addTask-right.svg"></button>
                        </div>
                    </div>
    
    
                </form>
            </div>
            <dialog id="msgBox" class="msgBox d-none"></dialog>
        

        </div>`
}