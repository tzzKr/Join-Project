let pickedColor;

function renderColorBoard() {
    for (let i = 0; i < colorRange.length; i++) {
        const color = colorRange[i];

        document.getElementById('colorSelectionBoard').innerHTML += `
        <div onclick="selectColorBoard( '${color}', 'newBoardCategoryColor-${i + 1}')"
                class="selectCategoryColor bgVi" style="background-color: ${color}" id="newBoardCategoryColor-${i + 1}">
        </div>`
    }
}

function toggleSelectionBoard() {
    document.getElementById('listBoard').classList.toggle('d-none');
    renderNewCategoryBoard();
    document.getElementById('listBoard').classList.toggle('growIn');
    setTimeout(() => {
        document.getElementById('listBoard').classList.toggle('growIn');
    }, 200);

}

function newCategoryBoard() {
    document.getElementById('newCategoryBoard').classList.remove('d-none');
    document.getElementById('colorSelectionBoard').classList.remove('d-none');
    document.getElementById('selectFieldBoard').classList.add('d-none');
    document.getElementById('listBoard').classList.add('d-none');

}

function selectColorBoard(color, id) {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newBoardCategoryColor-' + i;
        document.getElementById(element).classList.toggle('selected', element === id);
    });
    pickedColor = color;
    console.log('pickedColor :>> ', pickedColor);
}

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

function collectFunktion(color) {
    saveTaskCategories('New Category created!');
    selectCategoryBoard(categories[categories.length - 1].name, categories[categories.length - 1].color);
    renderNewCategoryBoard();
    clearNewCategoryBoard();
    resetSelectedColorBoard();
    toggleSelectionBoard();
}


function selectCategoryBoard(name, color) {
    let categoryListBoard = document.getElementById('selectFieldBoard');
    saveNewCategoryInObject(name, color);
    categoryListBoard.innerHTML = categoryListItemHTML(name, color);
    document.getElementById('categoryName').innerHTML = name;
    document.getElementById('categoryColor').style.backgroundColor = color;

    resetBorder();

    toggleSelectionBoard();

}

function renderNewCategoryBoard() {
    Board = 'Board';
    document.getElementById('mainCategoriesBoard').innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        document.getElementById('mainCategoriesBoard').innerHTML += generateNewCategoryHTML(i, Board);

    }
}

function clearNewCategoryBoard() {
    document.getElementById('selectFieldBoard').classList.remove('d-none');
    document.getElementById('categoryInputBoard').value = ''
    document.getElementById('newCategoryBoard').classList.add('d-none');
    document.getElementById('colorSelectionBoard').classList.add('d-none');
    resetSelectedColorBoard();
    document.getElementById('selectFieldBoard').setAttribute('onclick', `toggleSelectionBoard()`);
}
function resetSelectedColorBoard() {
    [1, 2, 3, 4, 5, 6].forEach(i => {
        let element = 'newBoardCategoryColor-' + i;
        document.getElementById(element).classList.remove('selected');
    });
}