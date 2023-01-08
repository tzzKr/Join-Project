setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');

let guest = [];


//**signUp Functions **//


/**
 * It takes the values from the input fields, adds them to the users array, then saves the users array
 * to the browser's local storage.
 */
async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value});
    await backend.setItem('users', JSON.stringify(users));
    window.location.href = 'index.html?msg=Successful registration';
}


/**
 * If the URL contains a query string parameter named "msg", then call the function initMsgBox() and
 * pass it the value of the "msg" parameter.
 */
function checkRegistrationStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        initMsgBox(msg);  
    }
    
}


/**
 * It removes the class 'd-none' from the element with the id 'msg-box' and adds the class 'growIn' to
 * the same element. Then it removes the class 'growIn' from the element with the id 'messageBox' after
 * 200 milliseconds.
 */
function showSuccessfulMsg() {
    document.getElementById('msg-box').classList.remove('d-none');
    document.getElementById('msg-box').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('messageBox').classList.remove('growIn');
    }, 200);
}


/**
 * If the sessionUser key is not found in sessionStorage, redirect to the index.html page
 */
function checkLoginStatus() {
    if (sessionStorage.getItem('sessionUser') == null){
        window.location.href = 'index.html';
    }
}


/**
 * If the user is a guest, change the profile-init element to 'Guest' and change the background color
 * of the openLogOutContainer element to #2A3647.
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
 * It removes the class 'd-none' from the element with the id 'logOutContainer' and adds the class
 * 'growIn' to the element with the id 'logOutContainer'. Then, it sets the onclick attribute of the
 * element with the id 'openLogOutContainer' to the function 'closeLogOutContainer()'.
 */
function openLogOutContainer() {
    document.getElementById('logOutContainer').classList.remove('d-none');
    document.getElementById('logOutContainer').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.remove('growIn');
    }, 200);

    document.getElementById('openLogOutContainer').setAttribute('onclick', `closeLogOutContainer()`);
}

/**
 * It adds a class to the element with the id of 'logOutContainer' that makes it invisible, then after
 * 200 milliseconds, it removes the class that makes it invisible and adds a class that makes it
 * visible.
 */
function closeLogOutContainer() {
    // document.getElementById('logOutContainer').classList.add('d-none');
    document.getElementById('logOutContainer').classList.add('growOut');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.add('d-none');
        document.getElementById('logOutContainer').classList.remove('growOut');
    }, 200);
    document.getElementById('openLogOutContainer').setAttribute('onclick', `openLogOutContainer()`);
}

// Message Box

/**
 * The function takes a string as an argument and sets the innerHTML of the msgBox element to the
 * string.
 * @param msg - The message to be displayed in the message box.
 */
function initMsgBox(msg) {
   document.getElementById('msgBox').innerHTML = `${msg}`;
   openMsgBox();
}

/**
 * It removes the class 'animationFadeOut' from the element with the id 'msgBox'. It adds the class
 * 'animationFadeIn' to the element with the id 'msgBox'. It removes the class 'd-none' from the
 * element with the id 'msgBox'. It calls the function 'closeMsgBox' after 3 seconds.
 */
function openMsgBox() {
    document.getElementById('msgBox').classList.remove('animationFadeOut');
    document.getElementById('msgBox').classList.add('animationFadeIn');
    document.getElementById('msgBox').classList.remove('d-none');
    setTimeout(closeMsgBox, 3000);
}


/**
 * It removes the class 'animationFadeIn' from the element with the id 'msgBox' and adds the class
 * 'animationFadeOut' to the same element.
 */
function closeMsgBox() {
    document.getElementById('msgBox').classList.remove('animationFadeIn');
    document.getElementById('msgBox').classList.add('animationFadeOut');
}


/**
 * Download the users from the server, and if the download fails, use the users that are already stored
 * in the browser.
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(await backend.getItem('users')) || [];
}


/**
 * It gets the user from the session storage, parses it, and returns it.
 * @returns The user object.
 */
function getSessionUser() {
    let user = sessionStorage.getItem('sessionUser');
    user = JSON.parse(user);
    return user; 
}


/**
 * It removes the sessionUser from the sessionStorage.
 */
function deleteSessionUser() {
    sessionStorage.removeItem('sessionUser');
}

//**Include Function */


/**
 * For each element with the attribute w3-include-html, fetch the file specified by the attribute, and
 * if the fetch is successful, replace the element's innerHTML with the file's contents.
 */
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


/**
 * If the name contains a space, return the first letter of the first name and the first letter of the
 * last name. Otherwise, return the first letter of the name.
 * @param name - The name of the person you want to get the initials of.
 * @returns The first letter of the first name and the first letter of the last name.
 */
function getInitials(name) {
    let initials
    if(name.includes(' ')){
        initials = `${name.charAt(0)}${name.charAt(name.lastIndexOf(' ') + 1)}`
    } else {
        initials = `${name.charAt(0)}`
    }
    return initials.toUpperCase();
}