import { User } from './class.js';
import { getSavedUsers, saveUsers } from './storage.js';

const MAX_NAME = 50;

const list = document.getElementById('user-list');
const addForm = document.getElementById('add-form');
const nameInput = document.getElementById('name');
const dialog = document.getElementById('edit-dialog');
const editForm = document.getElementById('edit-form');
const editName = document.getElementById('edit-name');
const cancelBtn = document.getElementById('cancel-edit');

let users = getSavedUsers();
let editingId = null;

function render() {
    list.innerHTML = '';
    users.forEach((u) => {
        const li = document.createElement('li');
        const userEntry = document.createElement('div');
        userEntry.className = 'user-entry';

        if (u.avatar_url) {
            const avatar = document.createElement('img');
            avatar.src = u.avatar_url;
            avatar.alt = '';
            avatar.loading = 'lazy';
            userEntry.appendChild(avatar);
        }

        const userDetails = document.createElement('div');
        userDetails.className = 'user-details';

        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = u.name;

        if (u.html_url) {
            const profileLink = document.createElement('a');
            profileLink.href = u.html_url;
            profileLink.target = '_blank';
            profileLink.rel = 'noopener noreferrer';
            profileLink.appendChild(name);
            userDetails.appendChild(profileLink);
        } else {
            userDetails.appendChild(name);
        }

        const createdAt = document.createElement('time');
        createdAt.className = 'created-at';
        const createdDate = u.created_at ? new Date(u.created_at) : null;
        if (createdDate && !Number.isNaN(createdDate.getTime())) {
            createdAt.dateTime = createdDate.toISOString();
            createdAt.textContent = `Added ${createdDate.toLocaleString()}`;
        } else {
            createdAt.textContent = 'Added date unavailable';
        }
        userDetails.appendChild(createdAt);
        userEntry.appendChild(userDetails);

        const buttons = document.createElement('div');
        buttons.className = 'btns';
        ['edit', 'delete'].forEach((action) => {
            const button = document.createElement('button');
            button.className = action;
            button.dataset.id = u.id;
            button.textContent = action === 'edit' ? 'Edit' : 'Delete';
            buttons.appendChild(button);
        });

        li.append(userEntry, buttons);
        list.appendChild(li);
    });
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();

    if (!name || name.length > MAX_NAME) return;

    const newUser = new User({
        id: new Date().toISOString(),
        name,
        avatar_url: null,
        html_url: null,
        created_at: new Date().toISOString(),
    });
    users.push(newUser);
    saveUsers(users);
    render();

    nameInput.value = '';
});

list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.classList.contains('delete')) {
        if (!confirm('Delete this user?')) return;
        users = users.filter((u) => u.id !== id);
        saveUsers(users);
        render();
    } else if (btn.classList.contains('edit')) {
        const u = users.find((x) => x.id === id);
        if (!u) return;
        editingId = id;
        editName.value = u.name;
        dialog.showModal();
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = users.find((x) => x.id === editingId);
    if (u) {
        const v = editName.value.trim();
        if (!v || v.length > MAX_NAME) {
            dialog.close();
            editingId = null;
            return;
        }
        u.name = v;
        saveUsers(users);
        render();
    }
    dialog.close();
    editingId = null;
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
    editingId = null;
});

render();
