///**      Selection Functions       **///


function openSelection() {
    document.getElementById('list').classList.remove('d-none');
    document.getElementById('list').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('list').classList.remove('growIn');
    }, 200);

    document.getElementById('selectField').setAttribute('onclick', `closeSelection()`);
}

function closeSelection() {
    document.getElementById('list').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('list').classList.add('d-none');
        document.getElementById('list').classList.remove('growOut');
    }, 200);
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
}

///**      ContactSelection Functions       **///

function openContactSelection() {
    document.getElementById('listContact').classList.remove('d-none');
    document.getElementById('listContact').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('listContact').classList.remove('growIn');
    }, 200);

    document.getElementById('selectioContactField').setAttribute('onclick', `closeContactSelection()`);
}


function closeContactSelection() {
    document.getElementById('listContact').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('listContact').classList.add('d-none');
        document.getElementById('listContact').classList.remove('growOut');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `openContactSelection()`);
}

///**      Select Option Functions       **///

function newCategory() {
    document.getElementById('newCategory').classList.remove('d-none');
    document.getElementById('selectCorlor').classList.remove('d-none');
    document.getElementById('selectField').classList.add('d-none');
    document.getElementById('list').classList.add('d-none');
}

function clearNewCategory() {
    document.getElementById('selectField').classList.remove('d-none');
    document.getElementById('newCategory').classList.add('d-none');
    document.getElementById('selectCorlor').classList.add('d-none');
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
}