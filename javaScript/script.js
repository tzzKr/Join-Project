setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');

let guest = [];
let tasks = [];
let assignedUser = [];
let subtasks = [];
let contacts = [];


let users = [
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'password': 'test123', 'userImg': "" },
    { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'password': 'test456', 'userImg': "" },
    { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'password': 'test789', 'userImg': "" }
];

//**signUp Functions **//
async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value });
    await backend.setItem('users', JSON.stringify(users));

    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    window.location.href = 'index.html';
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

function goToSignUp() {
    window.location.href = 'signUp.html';
}

function goToLogIn() {
    window.location.href = 'index.html';
}

//** OpenlogOutContainer **//

function openLogOutContainer() {
    document.getElementById('logOutContainer').classList.remove('d-none');
    document.getElementById('logOutContainer').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.remove('growIn');
    }, 200);

    document.getElementById('openLogOutContainer').setAttribute('onclick', `closeLogOutContainer()`);
}

function closeLogOutContainer() {
    document.getElementById('logOutContainer').classList.add('d-none');
    document.getElementById('logOutContainer').classList.add('growOut');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.add('d-none');
        document.getElementById('logOutContainer').classList.remove('growOut');
    }, 200);
    document.getElementById('openLogOutContainer').setAttribute('onclick', `openLogOutContainer()`);
}



// Message Box
function openMsgBox() {
    document.getElementById('msgBox').classList.add('msgBox-in-out');
    document.getElementById('msgBox').classList.remove('d-none');
}

function closeMsgBox() {

}

async function init() {
    await downloadFromServer();
    // users = JSON.parse(backend.getItem('users')) || [];
    await backend.setItem('users', JSON.stringify(users));
}

// async function signUp() {
//     users.push('');
//     await backend.setItem('users', JSON.stringify(users));
// }



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
    renderTodos()
}

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function headerInclude() {

}