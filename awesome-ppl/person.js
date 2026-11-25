import { User } from './class.js';

const USERS_STORAGE_KEY = 'awesome-ppl-users';
const MAX_CHARACTERS = 5;

/**
 * Get references to the DOM elements
 * DOM = Document Object Model
 * by using the document object, we can access and manipulate the HTML elements on the page
 */

const addForm = document.getElementById('add-form');
const editForm = document.getElementById('edit-form');
const userList = document.getElementById('user-list');
const nameInput = document.getElementById('name');
const editDialog = document.getElementById('edit-dialog');
const editNameInput = document.getElementById('edit-name');
const cancelEditButton = document.getElementById('cancel-edit');

// Variable to keep track of the user being edited
let editingId = null;

// Load users from local storage
function loadUsers() {
    try {
        const usersFromStorage = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
        const users = usersFromStorage.map((u) => User.fromJSON(u));

        console.log('Loaded users from local storage:', users);
        return users;
    } catch (error) {
        console.error('Error loading users from local storage:', error);
        alert('Please try again later.');
        return [];
    }
}

let users = loadUsers();

function validateName(input) {
    const name = input.value.trim();

    if (!name) {
        input.setCustomValidity('Please enter a name.');
        return false;
    }

    if (name.length > MAX_CHARACTERS) {
        input.setCustomValidity(`Name must be ${MAX_CHARACTERS} characters or fewer.`);
        return false;
    }

    input.setCustomValidity('');
    return true;
}

// Save users to local storage
function saveToLocalStorage() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Render(show) the list of users in the DOM
function renderUsers() {
    userList.innerHTML = ''; // clear the list before rendering
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${user.name}</span>
        <button class="edit" data-id="${user.id}">Edit</button>
        <button class="delete" data-id="${user.id}">Delete</button>`;
        userList.appendChild(li);
    });
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('Add Form submitted');
    const name = nameInput.value.trim();
    if (!validateName(nameInput)) {
        nameInput.reportValidity();
        return;
    }

    users.push(User.create(name));
    saveToLocalStorage();
    renderUsers();
    nameInput.value = '';
});

nameInput.addEventListener('input', () => validateName(nameInput));

userList.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;

    const idInAction = btn.dataset.id;

    if (btn.classList.contains('delete')) {
        const sureToDelete = confirm('Are you sure you want to delete this user?');

        if (sureToDelete) {
            const updatedUsers = users.filter((u) => u.id !== idInAction);
            users = updatedUsers;

            saveToLocalStorage();
            renderUsers();
        }
    } else if (btn.classList.contains('edit')) {
        console.log(`Editing user with id: ${idInAction}`);

        const userToEdit = users.find((u) => u.id === idInAction);
        if (!userToEdit) {
            console.error(`User with id ${idInAction} not found`);
            return;
        }

        editNameInput.value = userToEdit.name;
        validateName(editNameInput);
        editingId = userToEdit.id;

        editDialog.showModal();
    }
});

cancelEditButton.addEventListener('click', () => {
    editingId = null;
    editDialog.close();
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Edit Form submitted');

    const editedName = editNameInput.value.trim();
    if (!validateName(editNameInput)) {
        editNameInput.reportValidity();
        return;
    }

    const userInAction = users.find((u) => u.id === editingId);
    if (!userInAction) {
        return;
    }

    userInAction.name = editedName;

    saveToLocalStorage();
    renderUsers();

    editNameInput.value = '';
    editDialog.close();
    editingId = null;
});

editNameInput.addEventListener('input', () => validateName(editNameInput));

renderUsers();
