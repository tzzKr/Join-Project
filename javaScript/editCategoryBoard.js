let pickedColor;

/**
 * It renders a color selection board for the user to select a color for a new board.
 */
function renderColorBoard() {
    for (let i = 0; i < colorRange.length; i++) {
        const color = colorRange[i];

        document.getElementById('colorSelectionBoard').innerHTML += `
        <div onclick="selectColorBoard( '${color}', 'newBoardCategoryColor-${i + 1}')"
                class="selectCategoryColor bgVi" style="background-color: ${color}" id="newBoardCategoryColor-${i + 1}">
        </div>`
    }
}

/**
 * It toggles the class 'd-none' on the element with the id 'listBoard' and then calls the function
 * renderNewCategoryBoard() and then toggles the class 'growIn' on the element with the id 'listBoard'
 * and then sets a timeout to toggle the class 'growIn' on the element with the id 'listBoard' after
 * 200 milliseconds.
 */
function toggleSelectionBoard() {
    document.getElementById('listBoard').classList.toggle('d-none');
    renderNewCategoryBoard();
    document.getElementById('listBoard').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('listBoard').classList.toggle('growIn');
    }, 200);

}

/**
 * When the user clicks the button, the newCategoryBoard div will be displayed, and the
 * selectFieldBoard and listBoard divs will be hidden.
 */
function newCategoryBoard() {
    document.getElementById('newCategoryBoard').classList.remove('d-none');
    document.getElementById('colorSelectionBoard').classList.remove('d-none');
    document.getElementById('selectFieldBoard').classList.add('d-none');
    document.getElementById('listBoard').classList.add('d-none');

}

/**
 * It takes a color and an id, and then toggles the class 'selected' on the element with the id that
 * matches the id passed in.
 * @param color - the color that was selected
 * @param id - the id of the element that was clicked
 */
function selectColorBoard(color, id) {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newBoardCategoryColor-' + i;
        document.getElementById(element).classList.toggle('selected', element === id);
    });
    pickedColor = color;
    console.log('pickedColor :>> ', pickedColor);
}

/**
 * It takes the value of the input field, checks if it's not empty, if it's not already in the array,
 * and if a color has been selected. If all of these conditions are met, it pushes the value of the
 * input field and the color to the array.
 */
function createCategoryBoard() {
    let categoryInput = document.getElementById('categoryInputBoard').value;
    categoryInput = categoryInput.charAt(0).toUpperCase() + categoryInput.slice(1);
    if (categoryInput && !checkCategoryExistence(categoryInput) && checkColorSelectedBoard()) {
        categories.push({ name: categoryInput, color: pickedColor });

        collectFunktion(pickedColor);

    } else if (checkColorSelected() && !categoryInput) {
        initMsgBoxAlert('Please enter a category name');
    } else {
        initMsgBoxAlert('Category exists!');
        resetSelectedColor();
    }
}

/**
 * It checks if any of the 6 color options have the class 'selected' and returns true if so.
 * @returns A boolean value.
 */
function checkColorSelectedBoard() {
    let colorSelected = false;
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newBoardCategoryColor-' + i;
        if (document.getElementById(element).classList.contains('selected')) {
            colorSelected = true;
        }
    });
    return colorSelected;
}

/**
 * When the user clicks the 'Create' button, the function will save the new category, select the new
 * category, render the new category, clear the new category, reset the selected color, and toggle the
 * selection.
 * @param color - the color of the category
 */
function collectFunktion(color) {
    saveTaskCategories('New Category created!');
    selectCategoryBoard(categories[categories.length - 1].name, categories[categories.length - 1].color);
    renderNewCategoryBoard();
    clearNewCategoryBoard();
    resetSelectedColorBoard();
    toggleSelectionBoard();
}


/**
 * It takes a name and color, saves it in an object, and then displays it in the DOM.
 * @param name - the name of the category
 * @param color - #FF0000
 */
function selectCategoryBoard(name, color) {
    let categoryListBoard = document.getElementById('selectFieldBoard');
    saveNewCategoryInObject(name, color);
    categoryListBoard.innerHTML = categoryListItemHTML(name, color);
    document.getElementById('categoryName').innerHTML = name;
    document.getElementById('categoryColor').style.backgroundColor = color;
    resetBorder();
    toggleSelectionBoard();
}

/**
 * It takes the categories array and generates a new HTML element for each category.
 */
function renderNewCategoryBoard() {
    Board = 'Board';
    document.getElementById('mainCategoriesBoard').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategoriesBoard').innerHTML += generateNewCategoryHTML(i, Board);
    }
}

/**
 * It removes the class 'd-none' from the element with the id 'selectFieldBoard', sets the value of the
 * element with the id 'categoryInputBoard' to an empty string, adds the class 'd-none' to the element
 * with the id 'newCategoryBoard', adds the class 'd-none' to the element with the id
 * 'colorSelectionBoard', calls the function 'resetSelectedColorBoard()', and sets the onclick
 * attribute of the element with the id 'selectFieldBoard' to the function 'toggleSelectionBoard()'.
 */
function clearNewCategoryBoard() {
    document.getElementById('selectFieldBoard').classList.remove('d-none');
    document.getElementById('categoryInputBoard').value = ''
    document.getElementById('newCategoryBoard').classList.add('d-none');
    document.getElementById('colorSelectionBoard').classList.add('d-none');
    resetSelectedColorBoard();
    document.getElementById('selectFieldBoard').setAttribute('onclick', `toggleSelectionBoard()`);
}

/**
 * It removes the class 'selected' from all elements with the id 'newBoardCategoryColor-1',
 * 'newBoardCategoryColor-2', 'newBoardCategoryColor-3', 'newBoardCategoryColor-4',
 * 'newBoardCategoryColor-5', and 'newBoardCategoryColor-6'.
 */
function resetSelectedColorBoard() {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newBoardCategoryColor-' + i;
        document.getElementById(element).classList.remove('selected');
    });
}