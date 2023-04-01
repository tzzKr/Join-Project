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
 * It adds the class 'navbar-active' to the elements with the IDs 'el1' and 'el2'.
 * @param el1 - The first element to add the class to.
 * @param el2 - The element that you want to add the background to.
 */
function addBgrToNav(el1, el2) {
    document.getElementById(el1).setAttribute('onclick', '');
    document.getElementById(el2).setAttribute('onclick', '');
    document.getElementById(el1).classList.add('navbar-active');
    document.getElementById(el2).classList.add('navbar-active');
}

/**
 * When the user hovers over the contact link, add a background color to the contact link and the home
 * link.
 */
function addBgrToContactNav() {
  addBgrToNav('hover-active4', 'hover-active8');
}

/**
 * It adds a background color to the navigation bar when the user hovers over the "Add Task" button.
 */
function addBgrToAddTaskNav() {
  addBgrToNav('hover-active3', 'hover-active7');
}

/**
 * It adds a background color to the navigation bar when the user hovers over it.
 */
function addBgrToBoardNav() {
  addBgrToNav('hover-active2', 'hover-active6');
}

/**
 * It adds a background color to the navigation bar when the mouse hovers over it.
 */
function addBgrToSummaryNav() {
  addBgrToNav('hover-active1', 'hover-active5');
}

/**
 * When the user clicks on the 'Legal' link in the navbar, add the class 'navbar-active' to the 'Legal'
 * link.
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