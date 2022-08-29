function openTaskEditor() {
    document.getElementById("backlog-task-overview").classList.add("d-none")
    document.getElementById("backlog-task-editor").classList.remove("d-none")
}

function closeTaskEditor() {
    document.getElementById("backlog-task-editor").classList.add("d-none")
    document.getElementById("backlog-task-overview").classList.remove("d-none")
}