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