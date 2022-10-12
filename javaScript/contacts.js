function openOverlay () {
    document.getElementById('page-mask').classList.remove('d-none');
    document.getElementById('contact-overlay').classList.remove('d-none');
}

function closeOverlay () {
    document.getElementById('page-mask').classList.add('d-none');
    document.getElementById('contact-overlay').classList.add('d-none');
}

function changeOverlayToEditContact () {
    document.getElementById('overlay-headline').innerHTML = 'Edit contact';
    document.getElementById('overlay-subheadline').classList.add('d-none');
    document.getElementById('overlay-cancel-btn').classList.add('d-none');
    document.getElementById('overlay-create-btn').classList.add('d-none');
    document.getElementById('overlay-save-btn').classList.remove('d-none');
    document.getElementById('overlay-default-user-img').classList.add('d-none');
    document.getElementById('overlay-user-img').classList.remove('d-none');
    
    openOverlay();
}

function changeOverlayToNewContact () {
    document.getElementById('overlay-headline').innerHTML = 'Add contact';
    document.getElementById('overlay-subheadline').classList.remove('d-none');
    document.getElementById('overlay-cancel-btn').classList.remove('d-none');
    document.getElementById('overlay-create-btn').classList.remove('d-none');
    document.getElementById('overlay-save-btn').classList.add('d-none');
    document.getElementById('overlay-default-user-img').classList.remove('d-none');
    document.getElementById('overlay-user-img').classList.add('d-none');

    openOverlay();
}

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
                    <div class="listSeperator"></div>
            `
            for(let j = 0; j < orderedContacts[i].length; j++) {
                document.getElementById('contact-book').innerHTML += /*html*/ `
                        <div class="listContact">
                            <div class="listContactInitials bgOr">VM</div>
                            <div class="listContactInfo">
                                <span class="listContactName">${orderedContacts[i][j].name}</span>
                                <span class="listContactEmail">${orderedContacts[i][j].email}</span>
                            </div>
                        </div>
                `
            }
            document.getElementById('contact-book').innerHTML += /*html*/ `
                </div>    
            `
        }
    }
    console.log(orderedContacts.length)
}
