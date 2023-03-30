/**
    * @description      : 
    * @author           : hosny
    * @group            : 
    * @created          : 30/11/2022 - 20:00:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/11/2022
    * - Author          : hosny
    * - Modification    : 
**/
///            Navbar Functions             ///

/**
 * /* A function that is used to include the header.html file into the index.html file. */

 function goToSummary() {
    window.location.href = 'summary.html';
}

function goToBoard() {
    window.location.href = 'board.html';
}

function goToAddTask() {
    window.location.href = 'addTask.html';
}

function goToContacts() {
    window.location.href = 'contacts.html';
}

function goToSignUp() {
    window.location.href = 'signUp.html';
}

function goToLogIn() {
    window.location.href = 'index.html';
}

function goToLegal() {
    window.location.href = 'legal.html';
}

/**
 * When the user clicks on the 'Contact' link in the navbar, add the 'navbar-active' class to the
 * 'Contact' link and the 'Contact' link in the dropdown menu.
 */
function addBgrToContactNav() {
    document.getElementById('hover-active4').setAttribute('onclick', '');
    document.getElementById('hover-active8').setAttribute('onclick', '');
    document.getElementById('hover-active4').classList.add('navbar-active');
    document.getElementById('hover-active8').classList.add('navbar-active');
}

/**
 * When the user clicks on the 'Add Task' button, the 'Add Task' button and the 'Add Task' dropdown
 * menu will have a background color.
 */
function addBgrToAddTaskNav() {
    document.getElementById('hover-active3').setAttribute('onclick', '');
    document.getElementById('hover-active7').setAttribute('onclick', '');
    document.getElementById('hover-active3').classList.add('navbar-active');
    document.getElementById('hover-active7').classList.add('navbar-active');
}

/**
 * When the user clicks on the 'Board' tab, add the 'navbar-active' class to the 'Board' tab and the
 * 'Board' dropdown menu.
 */
function addBgrToBoardNav() {
    document.getElementById('hover-active2').setAttribute('onclick', '');
    document.getElementById('hover-active6').setAttribute('onclick', '');
    document.getElementById('hover-active2').classList.add('navbar-active');
    document.getElementById('hover-active6').classList.add('navbar-active');
}

/**
 * It adds a class to two elements when the page loads.
 */
function addBgrToSummaryNav() {
    document.getElementById('hover-active1').setAttribute('onclick', '');
    document.getElementById('hover-active5').setAttribute('onclick', '');
    document.getElementById('hover-active1').classList.add('navbar-active');
    document.getElementById('hover-active5').classList.add('navbar-active');
}

/**
 * When the user clicks on the 'Legal' link, add the 'navbar-active' class to the 'Legal' link.
 */
function addBgrToLegalNav() {
    document.getElementById('hover-active9').setAttribute('onclick', '');
    document.getElementById('hover-active9').classList.add('navbar-active');
}

/**
 * Gets the current path, then undo the onclick function and styles the background in the navbar depending to the current path.
 * 
 */
function checkCurrentPage() {
    const pathname = window.location.pathname;
    if(pathname == '/join/contacts.html') {
        addBgrToContactNav();
    }else if(pathname == '/join/addTask.html') {
        addBgrToAddTaskNav();
    }else if(pathname == '/join/board.html') {
        addBgrToBoardNav();
    }else if(pathname == '/join/summary.html') {
        addBgrToSummaryNav();
    }else if(pathname == '/join/legal.html') {
        addBgrToLegalNav();
    }
}