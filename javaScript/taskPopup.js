function openTaskPopUp() {
    document.getElementById('task-popUp').classList.remove('d-none');
    document.getElementById('task-bgr-popUp').classList.remove('d-none');
    document.getElementById('task-popUp').classList.add('animationFadeInLeft');
    document.getElementById('task-bgr-popUp').classList.add('animationFadeInLeft');
}

function closeTaskPopUp() {
    document.getElementById('task-popUp').classList.add('d-none');
    document.getElementById('task-bgr-popUp').classList.add('d-none');
}