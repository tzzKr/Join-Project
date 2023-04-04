/**
 * It removes the class 'd-none' from the element with the id 'task-popUp' and the element with the id
 * 'task-bgr-popUp' and adds the class 'animationFadeInLeft' to the element with the id 'task-popUp'
 * and the element with the id 'task-bgr-popUp'.
 */
function openTaskPopUp() {
    let board = window.location.pathname == '/board.html';
    document.getElementById('task-popUp').classList.remove('d-none');
    document.getElementById('task-bgr-popUp').classList.remove('d-none');
    if (board) {
    document.getElementById('boardBg').classList.add('noScroll');
    }
}

/**
 * It adds the class 'd-none' to the element with the id 'task-popUp' and the element with the id
 * 'task-bgr-popUp' and then calls the function 'cancelTask()'.
 */
function closeTaskPopUp() {
    let board = document.getElementById('boardBg');
    document.getElementById('task-popUp').classList.add('d-none');
    document.getElementById('task-bgr-popUp').classList.add('d-none');
    if (board) document.getElementById('boardBg').classList.remove('noScroll');
    cancelTask();
}

/**
 * If the checkbox is not checked, check it.
 * @param i - the index of the row in the table
 * @param j - the index of the contact in the orderedContacts array
 */
function getSelectedContact(i,j) {
    let email = orderedContacts[i][j].email;
    let index = contacts.indexOf(contacts.find( u => u.email == email));
    if(!document.getElementById('checkboxAssignedTo'+ (index + 1)).checked)
        checkClick('checkboxAssignedTo'+ (index + 1), index);
}

/**
 * When the user clicks the 'Add Task' button, the form will be reset.
 */
function resetFormTaskPopUp() {
    document.getElementById('add-new-task').reset();
}