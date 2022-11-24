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






//**signUp Functions **//
 /* A function that is used to include the header.html file into the index.html file. */
 async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value});
    await backend.setItem('users', JSON.stringify(users));
    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    window.location.href = 'index.html?msg=Successful registration';
}

/**
 * Checks if the URL have a msg (it gets one in the addUser function), if so initMsgBox get triggert with the msg
 * 
 */
function checkRegistrationStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        initMsgBox(msg);  
    }
    
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
    window.location.href = 'summary.html';
}

function goToBoard() {
    window.location.href = 'board.html';
    document.getElementById('hover-active1').classList.add('navbar-active');

}
/**
 * 
 */
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
 * Checks from the sessionStorage if the user is logged in. If not redirect to index.html
 * 
 */
function checkLoginStatus() {
    if (sessionStorage.getItem('sessionUser') == null){
        window.location.href = 'index.html';
    }
}

/**
 * Checks the username in the sessionStorage, when its Guest then Guest would be set in the profile-img and background color would be changed.
 * When there is a real name the name get sliced to the initials and get set in the profile-img.
 * 
 */
function getProfileInit() {
    if(getSessionUser() == 'Guest') {
        document.getElementById('profile-init').innerHTML = 'Guest';
        document.getElementById('openLogOutContainer').style.fontSize = '16px';
        document.getElementById('openLogOutContainer').style.backgroundColor = '#2A3647';
        document.getElementById('openLogOutContainer').style.borderColor = '#2A3647';
    } else {
        let fullname = sessionStorage.getItem('sessionUser').split(" ");
        let init = `${fullname[0].slice(1,2)}${fullname[fullname.length-1].slice(0,1)}`;
        document.getElementById('profile-init').innerHTML = `${init}`;
        document.getElementById('openLogOutContainer').style.backgroundColor = '#29ABE2';
    }
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

// Message Box
/**
 * Sets the message for the 'MsgBox' and triggers the opening function.
 * 
 * @param {string} msg - Message string that should displayed in the 'MsgBox' 
 */
function initMsgBox(msg) {
   document.getElementById('msgBox').innerHTML = `${msg}`;
   openMsgBox();
}
/**
 * It removes the class 'animationFadeOut', adds the class 'animationFadeIn' to the 'msgBox' and removes the class 'd-none'
 * after 3000ms the function 'closeMsgBox' is called.
 * 
 */
function openMsgBox() {
    document.getElementById('msgBox').classList.remove('animationFadeOut');
    document.getElementById('msgBox').classList.add('animationFadeIn');
    document.getElementById('msgBox').classList.remove('d-none');
    setTimeout(closeMsgBox, 3000);
}

/**
 * It removes the class 'animationFadeIn' and adds the class 'animationFadeOut' to the 'msgBox'.
 * 
 */
function closeMsgBox() {
    document.getElementById('msgBox').classList.remove('animationFadeIn');
    document.getElementById('msgBox').classList.add('animationFadeOut');
}

/**
 * Download the users from the server, and if there are none, create an empty array.
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(await backend.getItem('users')) || [];
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

//**Include Function */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            getProfileInit();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}