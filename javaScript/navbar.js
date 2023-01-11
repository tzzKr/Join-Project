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
    document.getElementById('hover-active1').classList.add('navbar-active');
}

function goToBoard() {
    window.location.href = 'board.html';
}
/**
 * 
 */
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