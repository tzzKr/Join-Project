///**      Selection Functions       **///


function openSelection() {
    document.getElementById('list').classList.remove('d-none');
    document.getElementById('list').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('list').classList.remove('growIn');
    }, 200);

    document.getElementById('selectField').setAttribute('onclick', `javascript: closeSelection()`);
}

function closeSelection() {
    document.getElementById('list').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('list').classList.add('d-none');
        document.getElementById('list').classList.remove('growOut');
    }, 200);
    document.getElementById('selectField').setAttribute('onclick', `javascript: openSelection()`);
}

///**      ContactSelection Functions       **///

function openContactSelection() {
    document.getElementById('listContact').classList.remove('d-none');
    document.getElementById('listContact').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('listContact').classList.remove('growIn');
    }, 200);

    document.getElementById('selectioContactField').setAttribute('onclick', `javascript: closeContactSelection()`);
}


function closeContactSelection() {
    document.getElementById('listContact').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('listContact').classList.add('d-none');
        document.getElementById('listContact').classList.remove('growOut');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `javascript: openContactSelection()`);
}

///**      Select Option Functions       **///

function selectOptions(anything) {
    document.querySelector('textBox').value = anything;
}