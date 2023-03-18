function openTaskPopUp() {
    document.getElementById('task-popUp').classList.remove('d-none');
    document.getElementById('task-bgr-popUp').classList.remove('d-none');
    document.getElementById('task-popUp').classList.add('animationFadeInLeft');
    document.getElementById('task-bgr-popUp').classList.add('animationFadeInLeft');
}

function closeTaskPopUp() {
    document.getElementById('task-popUp').classList.add('d-none');
    document.getElementById('task-bgr-popUp').classList.add('d-none');
}

function getSelectedContact(i,j) {
    let email = orderedContacts[i][j].email;
    let index = contacts.indexOf(contacts.find( u => u.email == email));
    if(!document.getElementById('checkboxAssignedTo'+ (index + 1)).checked)
        checkClick('checkboxAssignedTo'+ (index + 1), index);
}

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
    setDate();
}