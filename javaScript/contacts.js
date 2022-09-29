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

// let contact = [
//     { 'name': 'Hosny Fahim', 'email': 'hosny@test.com', 'phone': '01234567989' },
//     { 'name': 'Gerhard Baliet', 'email': 'gerhard@test.com', 'phone': '0123456789' },
//     { 'name': 'Yannik Morjan', 'email': 'yannik@test.com', 'phone': '0123456789' }
// ];