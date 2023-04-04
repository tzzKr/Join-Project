/**
 * A function that is used to include the header.html file into the index.html file.
 */
function goTo(pathname) {
    window.location.href = pathname;
 }

/**
 * It adds the class 'navbar-active' to the elements with the IDs 'el1' and 'el2'.
 * @param el1 - The first element to add the class to.
 * @param el2 - The element that you want to add the background to.
 */
function addBgrToNav(el1, el2) {
    document.getElementById(el1).setAttribute('onclick', '');
    document.getElementById(el1).classList.add('navbar-active');
    if(el2) {
        document.getElementById(el2).setAttribute('onclick', '');
        document.getElementById(el2).classList.add('navbar-active');
    }
}

/**
 * Gets the current path, then undo the onclick function and styles the background in the navbar depending to the current path.
 * 
 */
function checkCurrentPage() {
    const pathname = window.location.pathname;
    if(pathname == '/join/contacts.html') {
        addBgrToNav('hover-active4', 'hover-active8');
    }else if(pathname == '/join/addTask.html') {
        addBgrToNav('hover-active3', 'hover-active7');
    }else if(pathname == '/join/board.html') {
        addBgrToNav('hover-active2', 'hover-active6');
    }else if(pathname == '/join/summary.html') {
        addBgrToNav('hover-active1', 'hover-active5');
    }else if(pathname == '/join/legal.html') {
        addBgrToNav('hover-active9');
    }
}