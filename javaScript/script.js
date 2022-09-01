// Backend

setURL('https://gruppe-303.developerakademie.net/Join-Project/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function deleteUser(name) {
    await backend.deleteItem('users');
  }

//**Include Function */



async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function openResponsiveNav() {
    document.getElementById('responsiveMenu').classList.remove('d-none');
    document.getElementById('responsiveMenu').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('responsiveMenu').classList.remove('growIn');
    }, 300);

    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: closeResponsiveNav()`);
}


function closeResponsiveNav() {
    document.getElementById('responsiveMenu').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('responsiveMenu').classList.add('d-none');
        document.getElementById('responsiveMenu').classList.remove('growOut');
    }, 200);
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: openResponsiveNav()`);
}