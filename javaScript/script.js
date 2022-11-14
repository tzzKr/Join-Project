/**
    * @description      : 
    * @author           : Hosny, Gerhard, Yannik.
    * @group            : 
    * @created          : 27/10/2022 - 19:11:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 27/10/2022
    * - Author          : hosny
    * - Modification    : 
**/
setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');

let guest = [];




let users = [
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'password': 'test123', 'userImg': "" },
    { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'password': 'test456', 'userImg': "" },
    { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'password': 'test789', 'userImg': "" }
];

//**signUp Functions **//
 /* A function that is used to include the header.html file into the index.html file. */
 async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value, contacts: new Array() });
    await backend.setItem('users', JSON.stringify(users));
    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    window.location.href = 'index.html?msg=Successful registration';
    showSuccessfulMsg();
}

/**
 * It removes the class 'display-none' from the element with the id 'messageBox' and adds the class
 * 'growIn' to the same element. Then, after 200 milliseconds, it removes the class 'growIn' from the
 * same element.
 */
function showSuccessfulMsg() {
    document.getElementById('msg-box').classList.remove('d-none');
    document.getElementById('msg-box').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('messageBox').classList.remove('growIn');
    }, 200);
}

/* A comment. */
/* A variable that is used to store the element with the id "msgBox" in it. */

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');
// if(msg) {
//    messageBox.innerHTML = msg
// }

/**
 * /* A function that is used to include the header.html file into the index.html file. */

function goToSummary() {
    document.getElementById('hover-active1').classList.add('navbar-active');
    // window.location.href = 'summary.html';
}

function goToBoard() {
    window.location.href = 'board.html';
    document.getElementById('hover-active1').classList.add('navbar-active');

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

/**
/* A function that is used to open the logout container. */


function openLogOutContainer() {
    document.getElementById('logOutContainer').classList.remove('d-none');
    document.getElementById('logOutContainer').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.remove('growIn');
    }, 200);

    document.getElementById('openLogOutContainer').setAttribute('onclick', `closeLogOutContainer()`);
}
/* A function that is used to close the logout container. */
/**
 * 
 */
function closeLogOutContainer() {
    document.getElementById('logOutContainer').classList.add('d-none');
    document.getElementById('logOutContainer').classList.add('growOut');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.add('d-none');
        document.getElementById('logOutContainer').classList.remove('growOut');
    }, 200);
    document.getElementById('openLogOutContainer').setAttribute('onclick', `openLogOutContainer()`);
}


/**
 * It adds the class 'msgBox-in-out' to the element with the id 'msgBox' and removes the class 'd-none'
 * from the same element.
 */
// Message Box
function openMsgBox() {
    document.getElementById('msgBox').classList.add('msgBox-in-out');
    document.getElementById('msgBox').classList.remove('d-none');
}

function closeMsgBox() {

}

/**
 * Download the users from the server, and if there are none, create an empty array.
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    await backend.setItem('users', JSON.stringify(users));
}

/**
 * Get you the data of the actual session user from the sessionStorage in parsed form.
 * 
 * @returns session user object
 */
function getSessionUser() {
    let user = sessionStorage.getItem('sessionUser');
    user = JSON.parse(user);
    return user; 
}

/**
 * Deletes the actual session user from the sessionStorage
 * 
 */
function deleteSessionUser() {
    sessionStorage.removeItem('sessionUser');
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
    // renderTodos()
}

// async function init() {
//     await downloadFromServer();
//     users = JSON.parse(backend.getItem('users')) || [];
// }

async function headerInclude() {

}

// Board arrays

let boardTasks = [{
    'id': 0,
    'category': 'done',
    'categoryTag': 'Design',
    'title': 'Bye',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
{
    'id': 1,
    'category': 'progress',
    'categoryTag': 'Design',
    'title': 'tschüss',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
{
    'id': 3,
    'category': 'done',
    'categoryTag': 'Design',
    'title': 'HALLo',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
{
    'id': 4,
    'category': 'progress',
    'categoryTag': 'Design',
    'title': 'Hallo',
    'taskDesc': 'test',
    'progress': '0%',
    'user' : 0,
    'urgency' : 'high',
},
];