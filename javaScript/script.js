let user = [];
let guest = [];
let tasks = [];
let todos = [];
let assignedUser = [];
let subtasks = [];
let contacts = [];


let users = [
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'password': 'test123', },
    { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'password': 'test456' },
    { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'password': 'test789' }
];




// setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever')

async function initStart() {
    setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadUser();

    if (user.length == 0) {
        setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');
        await downloadFromServer();
        await safeUserAccounts();
    }
}


async function init() {
    setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadData();
    await loadUser();
    await loadLoggedUser();
    await addUser();
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


async function safeData() {
    await backend.setItem('tasks', JSON.stringify(tasks));
    await backend.setItem('todos', JSON.stringify(todos));
    await backend.setItem('users', JSON.stringify(users));
    await loadData();
}


async function loadData() {
    tasks = await JSON.parse(backend.getItem('tasks')) || [];
    todos = await JSON.parse(backend.getItem('todos')) || [];
    users = await JSON.parse(backend.getItem('users')) || [];

}


async function safeUser() {
    await backend.setItem('user', JSON.stringify(user));
    await backend.setItem('guest', JSON.stringify(guest));
    await backend.setItem('users', JSON.stringify(users));
    await loadUser();
}


async function safeUserAccounts() {
    await backend.setItem('user', JSON.stringify(user));
    await backend.setItem('guest', JSON.stringify(guest));
    await backend.setItem('users', JSON.stringify(users));
    await loadUser();
}


async function loadUser() {
    user = await JSON.parse(backend.getItem('user')) || [];
    guest = await JSON.parse(backend.getItem('guest')) || [];
    users = await JSON.parse(backend.getItem('users')) || [];
}


async function safeLoggedUser() {
    await backend.setItem('users', JSON.stringify(users));
}