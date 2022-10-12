let contacts = [
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'phone': '01234567989' },
    { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'phone': '0123456789' },
    { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'phone': '0123456789' },
    { 'name': 'Ännik Morjan', 'email': 'ännik@test.com', 'phone': '0123456789' },
    { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'phone': '01234567989' },
    { 'name': 'Önnik Morjan', 'email': 'önik@test.com', 'phone': '0123456789' },
    { 'name': 'Ünnik Morjan', 'email': 'ünnik@test.com', 'phone': '0123456789' }
];

let orderedContacts = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);

function orderContacts() {
    for(let i = 0; i < contacts.length; i++) {
        let letter = contacts[i].name.toLowerCase().toString();
        letter = letter.replace(/\u00e4/g, "ae").replace(/\u00fc/g, "ue").replace(/\u00f6/g, "oe");
        letter = letter.slice(0,1);
        letter = letter.charCodeAt(0) - 97;
        orderedContacts[letter].push(contacts[i]);
    }
    console.log(orderedContacts);
    renderContactbook();
}

function renderContactbook() {
    document.getElementById('contact-book').innerHTML = '';
    for(let i = 0; i < orderedContacts.length; i++) {
        if(orderedContacts[i].length > 0) {
            document.getElementById('contact-book').innerHTML += /*html*/ `
                <div class="contactList">
                    <div class="listLetter">${String.fromCharCode(97 + i).toUpperCase()}</div>
                    <div class="listSeperator"></div>`
            for(let j = 0; j < orderedContacts[i].length; j++) {
                document.getElementById('contact-book').innerHTML += /*html*/ `
                        <div class="listContact" onclick="renderContactDetails(${i},${j})">
                            <div class="listContactInitials bgOr">VM</div>
                            <div class="listContactInfo">
                                <span class="listContactName">${orderedContacts[i][j].name}</span>
                                <span class="listContactEmail">${orderedContacts[i][j].email}</span>
                            </div>
                        </div>`
            }
            document.getElementById('contact-book').innerHTML += /*html*/ `
                </div>    `
        }
    }
}

function renderContactDetails(firstIndex,secondIndex) {
    document.getElementById('contact-details').innerHTML = '';
    document.getElementById('contact-details').innerHTML += /*html*/ `
        <div class="contactHeader">
            <span class="listContactInitials contactScale bgLp">VM</span>
            <div class="contactInfo">
                <span class="contactName">${orderedContacts[firstIndex][secondIndex].name}</span>
                <a href="addTask.html" class="contactAddTaskBtn">
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
                <a href="mailto: abc@example.com" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].email}</a>
            </div>
            <div class="contactAdressSegment">
                <span class="contactAdressTitle">Phone</span>
                <a href="tel: 0123456789" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].phone}</a>
            </div>
        </div>
    `;
}

function openOverlay() {
    document.getElementById('page-mask').classList.remove('d-none');
    document.getElementById('contact-overlay').classList.remove('d-none');
}

function closeOverlay() {
    document.getElementById('page-mask').classList.add('d-none');
    document.getElementById('contact-overlay').classList.add('d-none');
}

function changeOverlayToEditContact(firstIndex,secondIndex) {
    document.getElementById('contact-overlay').innerHTML = '';
    document.getElementById('contact-overlay').innerHTML += /*html*/ `
        <div class="overlayLeft">
            <img src="img/logo-white.svg">
            <span id="overlay-headline" class="overlayHealine">Edit contact</span>
            <div class="overlaySperator"></div>
        </div>
        <div class="overlayRight">
            <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
            <div>
                <span id="overlay-user-img" class="overlayUserImg bgLp">VM</span>
            </div>
            <form class="overlayInputForm" onsubmit="saveContact()">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" typ="text" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].name}" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" typ="email" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].email}" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" typ="tel" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].phone}" required><img src="img/phone.svg">
                </div>
                <div class="overlayBtnSection">
                    <button onclick="" id="overlay-cancel-btn" class="overlayCancelBtn">
                        <span>Delete</span>
                        <img src="img/closeCross.svg">
                    </button>
                    <button id="overlay-save-btn" typ="submit" class="overlayActionBtn" onsubmit="">Save</button>
                </div>
            </form>
        </div>      
    `
    openOverlay();
}

function changeOverlayToNewContact () {
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
            <div>
                <img id="overlay-default-user-img" class="overlayDefaultUserImg" src="img/defaultUser.svg">
            </div>
            <form class="overlayInputForm" onsubmit="createContact()">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" typ="text" class="overlayInput" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" typ="email" class="overlayInput" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" typ="tel" class="overlayInput" required><img src="img/phone.svg">
                </div>
                <div class="overlayBtnSection">
                    <button onclick="closeOverlay()" id="overlay-cancel-btn" class="overlayCancelBtn">
                        <span>Cancel</span>
                        <img src="img/closeCross.svg">
                    </button>
                    <button id="overlay-create-btn" typ="submit" class="overlayActionBtn" onsubmit="createContact()">
                        <span>Create contact</span>
                        <img src="img/simpleCheck.svg">
                    </button>
                </div>
            </form>
        </div>  
    `
    openOverlay();
}

function createContact() {
    console.log('Yes');
}    