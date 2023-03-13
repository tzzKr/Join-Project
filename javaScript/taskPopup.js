function openTaskPopUp() {
    document.getElementById('task-popUp').classList.remove('d-none');
    document.getElementById('task-bgr-popUp').classList.remove('d-none');
}

function closeTaskPopUp() {
    document.getElementById('task-popUp').classList.add('d-none');
    document.getElementById('task-bgr-popUp').classList.add('d-none');
}