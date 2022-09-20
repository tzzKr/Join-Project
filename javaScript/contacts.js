function openOverlay () {
    document.getElementById('page-mask').classList.remove('d-none');
    document.getElementById('contact-overlay').classList.remove('d-none');
}

function closeOverlay () {
    document.getElementById('page-mask').classList.add('d-none');
    document.getElementById('contact-overlay').classList.add('d-none');
}