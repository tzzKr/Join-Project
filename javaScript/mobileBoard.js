let x = window.matchMedia("(max-width: 760px)")


function openMobileInfo() {
    if (x.matches) {
        document.getElementById('boardParent').classList.add('d-none')
    } else {
        return
    }
}

function closeMobileInfo() {
    document.getElementById('boardParent').classList.remove('d-none')
    
}