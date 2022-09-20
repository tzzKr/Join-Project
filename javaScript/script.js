let guest = [];
let tasks = [];
let todos = [];
let assignedUser = [];
let subtasks = [];
let contacts = [];


let users = [
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'password': 'test123', 'userImg': "" },
    { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'password': 'test456', 'userImg': "" },
    { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'password': 'test789', 'userImg': "" }
];

function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value });
    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    // window.location.href = 'login.html';
}

//**GoTo Functions **//

function goToSummary() {
    window.location.href = 'summary.html';
}

function goToBoard() {
    window.location.href = 'board.html';

}

function goToAddTask() {

    window.location.href = 'addTask.html';
}

function goToContacts() {
    window.location.href = 'contacts.html';
}





async function init() {
    setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users'));
}


//**Include Function */



async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


// async function safeData() {
//     await backend.setItem('users', JSON.stringify(users)) || [];
//     await loadData();
// }


// async function loadData() {
//     users = await JSON.parse(backend.getItem('users')) || [];
// }


// async function safeUsers() {
//     await backend.setItem('users', JSON.stringify(users));

// }


// async function safeUsers() {
//     await backend.setItem('users', JSON.stringify(users));
//     await loadUser();
// }


// async function loadUsers() {
//     users = await JSON.parse(backend.getItem('users')) || [];
// }