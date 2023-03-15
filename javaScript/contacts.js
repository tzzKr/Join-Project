let sessionUser = getSessionUser();
// let contacts = [];
let orderedContacts = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
let colorRangeContacts = ['#FF7A00','#9327FF','#29ABE2','#FC71FF','#02CF2F','#AF1616','#462F8A'];
/**
 * Sorts contacts by alphabetical order into orderedContacts and then executes renderCpntacts()
 * 
 */
function orderContacts() {
    for(let i = 0; i < contacts.length; i++) {
        contacts[i].id = i;
        let letter = contacts[i].name.toLowerCase().toString();
        letter = letter.replace(/\u00e4/g, "ae").replace(/\u00fc/g, "ue").replace(/\u00f6/g, "oe");
        letter = letter.slice(0,1);
        letter = letter.charCodeAt(0) - 97;
        orderedContacts[letter].push(contacts[i]);
    }
    renderContactbook();
}

/**
 * Using orderedContacts, contact elements are rendered on the HTML Page
 * 
 */
function renderContactbook() {
    document.getElementById('contact-book').innerHTML = '';
    for(let i = 0; i < orderedContacts.length; i++) {
        if(orderedContacts[i].length > 0) {
            document.getElementById('contact-book').innerHTML += returnContactLetterSeperator(i)
            for(let j = 0; j < orderedContacts[i].length; j++) {
                document.getElementById('contact-book').innerHTML += returnContactElement(i,j);
                document.getElementById(`single-contact-init${orderedContacts[i][j].id}`).style.backgroundColor = orderedContacts[i][j].color;
            }
            document.getElementById('contact-book').innerHTML += /*html*/ `</div>`
        }
    }
}

/**
 * It returns a Letter and stroke seperator for the Contacts in the Contactbook.
 * 
 * @param i - The index of the letter in the alphabet.
 * @returns A string of HTML code.
 */
function returnContactLetterSeperator(i) {
    return /*html*/ `
        <div class="contactList">
            <div class="listLetter">${String.fromCharCode(97 + i).toUpperCase()}</div>
            <div class="listSeperator">
        </div>`
}

/**
 * It returns a Contact Element for the Contactbook.
 *
 * @param i - the index of the alphabetically orderd contacts
 * @param j - the index of the contact in the alphabetically orderd contacts array
 * @returns A string of HTML code.
 */
function returnContactElement(i,j) {
    return /*html*/ `
        <button class="listContact" onclick="mobileSwitchToDetail(), renderContactDetails(${i},${j})">
            <div id="single-contact-init${orderedContacts[i][j].id}" class="listContactInitials">${orderedContacts[i][j].initials}</div>
            <div class="listContactInfo">
                <span class="listContactName">${orderedContacts[i][j].name}</span>
                <span class="listContactEmail">${orderedContacts[i][j].email}</span>
            </div>
        </button>`;
}

/**
 * Using orderedContacts, detailed contact elements are rendered on the HTML Page
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
function renderContactDetails(firstIndex, secondIndex) {
    document.getElementById('contact-details').innerHTML = '';
    document.getElementById('contact-details').innerHTML += /*html*/ `
        <div class="contactHeader">
            <span id="single-contact-detail-init" class="listContactInitials contactScale">${orderedContacts[firstIndex][secondIndex].initials}</span>
            <div class="contactInfo">
                <span class="contactName">${orderedContacts[firstIndex][secondIndex].name}</span>
                <a onclick="openTaskPopUp(), setDate()" class="contactAddTaskBtn">
                    <img class="addTaskBtnImg" src="img/plus.svg">
                    <span class="addTaskBtnText">Add Task</span>
                </a>
            </div>
        </div>
        <div class="contactInformationHead">
            <span class="contactInformationTitle">Contact Information</span>
            <button class="editContactBtn" onclick="changeOverlayToEditContact(${firstIndex},${secondIndex})">
                <img src="img/pencil_wo_bg.svg">
                <span>Edit Contact</span>
            </button>
        </div>
        <div class="contactAdressInformations">
            <div class="contactAdressSegment">
                <span class="contactAdressTitle">Email</span>
                <a href="mailto: ${orderedContacts[firstIndex][secondIndex].email}" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].email}</a>
            </div>
            <div class="contactAdressSegment">
                <span class="contactAdressTitle">Phone</span>
                <a href="tel: ${orderedContacts[firstIndex][secondIndex].phone}" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].phone}</a>
            </div>
        </div>`;
        document.getElementById('single-contact-detail-init').style.backgroundColor = orderedContacts[firstIndex][secondIndex].color;
        addContactanimation();
}

/**
 * It adds a class to animate an element, then removes it after a set amount of time.
 */
function addContactanimation() {
    document.getElementById('contact-details').classList.add('contactDetailAnimation');
    setTimeout(() => {
        document.getElementById('contact-details').classList.remove('contactDetailAnimation');
    }, 225);  
}

/**
 * Opens the Edit/Create Overlay
 * 
 */
function openOverlay() {
    document.getElementById('page-mask').classList.remove('d-none');
    document.getElementById('contact-overlay').classList.remove('d-none');
}

/**
 * Close the Edit/Create Overlay
 * 
 */
function closeOverlay() {
    document.getElementById('page-mask').classList.add('d-none');
    document.getElementById('contact-overlay').classList.add('d-none');
}

/**
 * Change the overlay content for editing a contact
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
function changeOverlayToEditContact(firstIndex, secondIndex) {
    document.getElementById('contact-overlay').innerHTML = '';
    document.getElementById('contact-overlay').innerHTML += /*html*/ `
        <div class="overlayLeft">
            <img src="img/logo-white.svg">
            <span id="overlay-headline" class="overlayHealine">Edit contact</span>
            <div class="overlaySperator"></div>
        </div>
        <div class="overlayRight">
            <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
            <div class="userContainer">
                <span id="overlay-user-img" class="overlayUserImg">${orderedContacts[firstIndex][secondIndex].initials}</span>
            </div>
            <form class="overlayInputForm" onsubmit="saveContact(${firstIndex}, ${secondIndex}); return false">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" type="text" pattern="[a-zA-ZÄäÜüÖöß ]*" maxlength="30" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].name}" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" type="email" maxlength="40" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].email}" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" type="tel" pattern="[0-9+/ ]*" minlength="6" maxlength="30" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].phone}" required><img src="img/phone.svg">
                </div>
                <button id="overlay-save-btn" type="submit" class="overlayActionBtn">Save</button>
                </form>
                <button onclick="deleteContact()" id="overlay-cancel-btn" class="overlayCancelBtn">
                    <span>Delete</span>
                    <img src="img/trash.png">
                </button>
        </div>`;
        document.getElementById('overlay-user-img').style.backgroundColor = orderedContacts[firstIndex][secondIndex].color;
    openOverlay();
}

/**
 * Delete a Contact from the Array
 * 
 */
async function deleteContact() {
    let inputName = document.getElementById('input-name').value;
    let inputEmail = document.getElementById('input-email').value;
    let inputPhone = document.getElementById('input-phone').value;
    let index = contacts.indexOf(contacts.find( u => u.name == inputName && u.email == inputEmail && u.phone == inputPhone));
    contacts.splice(index,1);
    await deletContactFromServer();
    loadContactsFromServer();
    document.getElementById('contact-details').innerHTML = '';
    mobileSwitchToContactbook();
    initMsgBox('Contact succesfully deleted');
    closeOverlay();  
}

/**
 * Overrides the users object from the server with the chenged one.
 * 
 */
async function deletContactFromServer() {
    let users = JSON.parse(backend.getItem('users')) || [];
    let username = sessionStorage.getItem('sessionUser');
    let user = users.find( u => u.name == JSON.parse(username));
    let userIndex = users.indexOf(user);
    users[userIndex].contacts = contacts;
    await backend.setItem('users', JSON.stringify(users));
}

/**
 * Save a Contact
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
async function saveContact(firstIndex, secondIndex) {
    let id = orderedContacts[firstIndex][secondIndex].id;
    contacts[id].name = document.getElementById('input-name').value;
    contacts[id].email = document.getElementById('input-email').value;
    contacts[id].phone = document.getElementById('input-phone').value;
    contacts[id].initials = getInitials(document.getElementById('input-name').value);
    await pushEditedContactToServer();
    loadContactsFromServer();
    document.getElementById('contact-details').innerHTML = '';
    mobileSwitchToContactbook();
    initMsgBox('Contact succesfully changed');
    closeOverlay();
}

/**
 * It downloads the users from the server, finds the user that is currently logged in, finds the index
 * of that user in the array, and then sets the contacts of that user to the contacts array.
 */
async function pushEditedContactToServer() {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let username = sessionStorage.getItem('sessionUser');
    let user = users.find( u => u.name == JSON.parse(username));
    let index = users.indexOf(user);
    users[index].contacts = contacts;
    await backend.setItem('users', JSON.stringify(users));
}

/**
 * It takes the values from the input fields, checks if the contact already exists, and if not, it
 * pushes the contact to the server and reloads the contacts from the server.
 */
async function createContact() {
    let inputName = document.getElementById('input-name').value;
    let inputEmail = document.getElementById('input-email').value;
    let inputPhone = document.getElementById('input-phone').value;
    let existingContact = contacts.find( u => u.email == inputEmail);
    if(existingContact) {
        initMsgBox('Contact already exists!');
    } else {
        await pushNewContactToServer(inputName, inputEmail, inputPhone);
        loadContactsFromServer();
        initMsgBox('Contact succesfully created');
        closeOverlay();
    }
}

/**
 * It downloads the users from the server, finds the user that is currently logged in, pushes a new
 * contact to the user's contacts array, and then uploads the users back to the server.
 * @param inputName - name of the contact
 * @param inputEmail - email of the contact
 * @param inputPhone - phonenumber of the contact
 */
async function pushNewContactToServer(inputName, inputEmail, inputPhone) {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let username = sessionStorage.getItem('sessionUser');
    let user = users.find( u => u.name == JSON.parse(username));
    let index = users.indexOf(user);
    let serverContacts = users[index].contacts;
    serverContacts.push({name: inputName, email: inputEmail, phone: inputPhone, color: colorRangeContacts[Math.floor(Math.random() * colorRangeContacts.length)], initials: getInitials(inputName)});
    users[index].contacts = serverContacts;
    await backend.setItem('users', JSON.stringify(users));
}

/**
 * Load contacts from server
 * 
 */
async function loadContactsFromServer() {
    await downloadFromServer();
    let users = JSON.parse(backend.getItem('users')) || [];
    let username = sessionStorage.getItem('sessionUser');
    let user = users.find( u => u.name == JSON.parse(username));
    let serverContacts = user.contacts;
    contacts = serverContacts;
    if(contacts.length > 0) {
        orderedContacts = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
        orderContacts();
    }
}

/**
 * Change the overlay content for creating a new contact
 * 
 */
function changeOverlayToNewContact() {
    document.getElementById('contact-overlay').innerHTML = '';
    document.getElementById('contact-overlay').innerHTML += /*html*/ `
        <div class="overlayLeft">
            <img src="img/logo-white.svg">
            <span id="overlay-headline" class="overlayHealine">Add contact</span>
            <span id="overlay-subheadline" class="overlaySubheadline">Tasks are better with a team!</span>
            <div class="overlaySperator"></div>
        </div>
        <div class="overlayRight">
            <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
            <div class="userContainer">
                <img id="overlay-default-user-img" class="overlayDefaultUserImg" src="img/defaultUser.svg">
            </div>
            <form class="overlayInputForm" onsubmit="createContact(); return false;">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" type="text" pattern="[a-zA-ZäÄöÖüÜß ]*" maxlength="30" class="overlayInput" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" type="email" maxlength="40" class="overlayInput" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" type="tel" pattern="[0-9+/ ]*" minlength="6" maxlength="30" class="overlayInput" required><img src="img/phone.svg">
                </div>
                <button id="overlay-create-btn" typ="submit" class="overlayActionBtn">
                    <span>Create contact</span>
                    <img src="img/simpleCheck.svg">
                </button>
            </form>
            <button onclick="closeOverlay()" id="overlay-cancel-btn" class="overlayCancelBtn">
                <span>Cancel</span>
                <img src="img/closeCross.svg">
            </button>        
        </div>`;
    openOverlay();
}

/**
 * If the window width is less than or equal to 1100px, hide the contact book and set its z-index to 0,
 * hide the new contact button and set the content div's display to flex and its z-index to 1.
 */
function mobileSwitchToDetail() {
    if(window.innerWidth <= '1100') {
        document.getElementById('contact-book').style.display = 'none';
        document.getElementById('contact-book').style.zIndex = -1;
        document.getElementById('new-contact-btn').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
        document.getElementById('content').style.zIndex = 0;
    } 
    else {
        resetMobile();
    }
}

/**
 * If the window width is less than or equal to 1100px, then set the z-index of the content div to 0,
 * set the display of the content div to none, set the display of the contact-book div to block, set
 * the z-index of the contact-book div to 1, and set the display of the new-contact-btn div to flex.
 */
function mobileSwitchToContactbook() {
    if(window.innerWidth <= '1100') {
        document.getElementById('content').style.zIndex = -1;
        document.getElementById('content').style.display = 'none';
        document.getElementById('contact-book').style.display = 'block';
        document.getElementById('contact-book').style.zIndex = 0;
        document.getElementById('new-contact-btn').style.display = 'flex';
    } 
    else {
        resetMobile();
        document.getElementById('contact-details').innerHTML = '';
    }
}

/**
 * Resets the Mobile Version to Desktop Version
 * 
 */
function resetMobile() {
    document.getElementById('content').style.display = 'flex';
    document.getElementById('contact-book').style.display = 'block';
    document.getElementById('new-contact-btn').style.display = 'flex';
}