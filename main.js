
///////////////////////////// Modal open/close logic ///////////////////////////////////////////////////
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.querySelector('.overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

overlay.addEventListener('click',() => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

//////////////////////////////////// Create list item ////////////////////////////////////////////

const submitButton = document.querySelector('.create-button');
const title = document.querySelector('.title-text');
const description = document.querySelector('.description-textarea');
const list = document.querySelector('#to-do-box');
const containerBox = document.querySelector('.containerBox');
const listStart = document.querySelector('.list-start');

submitButton.addEventListener('click', addItem);
containerBox.addEventListener('click', removeItem);

//create list items
function addItem(event) {
    event.preventDefault();
    
    //create div.
    const newListItem = document.createElement('div');    
    newListItem.classList.add('list-item');
    newListItem.classList.add('draggable');
    listStart.appendChild(newListItem);

    //make the newListItem draggable
    newListItem.draggable = true;

//Content inside the newListItem

    //create titleItem
    const titleItem = document.createElement('p');
    titleItem.innerText = title.value;
    titleItem.classList.add('title-item');
    newListItem.appendChild(titleItem);

    //create descriptionItem
    const descriptionItem = document.createElement('p');
    descriptionItem.innerText = description.value;
    descriptionItem.classList.add('description-item');
    newListItem.appendChild(descriptionItem);

    // create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trashButton');
    newListItem.appendChild(trashButton);

    //clear title text in the modal
    title.value = '';

    //clear description text in the modal
    description.value = '';
    }

//Delete items
function removeItem(event) {
    const item = event.target;
    if (item.classList[0] === "trashButton"){
        const listDiv = item.parentElement;
        listDiv.remove();
    }
}

//////////////////////// Drag and Drop logic////////////////////////////////////////////
const draggableElements = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.containerBox');

//drag start
draggableElements.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
        console.log('start drag')
    })

//drag end
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
});

//drag over
containers.forEach(containerBox => {
    containerBox.addEventListener('dragover', event => {
        event.preventDefault()
        const draggable = document.querySelector('.dragging');
        containerBox.appendChild(draggable);
    })
})

/*//sort list-item up and down
function getDragAfterElement(containerBox, y){
    containerBox.querySelectorAll('draggable:not(.dragging)')
}*/
