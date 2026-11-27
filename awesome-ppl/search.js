import { getSavedUsers, saveUsers } from './storage.js';
import { User } from './class.js';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/users';

const searchForm = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const status = document.getElementById('search-status');
const resultsList = document.getElementById('search-results');

function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle('error', Boolean(isError));
}

function renderResults(users) {
    resultsList.replaceChildren();

    users.forEach((user) => {
        const item = document.createElement('li');
        const profile = document.createElement('div');
        profile.className = 'profile';

        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;
        avatar.alt = '';
        avatar.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'profile-info';

        const link = document.createElement('a');
        link.href = user.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = user.login;

        const type = document.createElement('p');
        type.textContent = user.type;

        info.append(link, type);
        profile.append(avatar, info);

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => addUser(user, addButton));

        item.append(profile, addButton);
        resultsList.appendChild(item);
    });
}

function addUser(user, button) {
    try {
        const users = getSavedUsers();
        const githubId = user.node_id;
        const existingUser = users.find((savedUser) => savedUser.id === githubId);
        if (existingUser) {
            existingUser.id = githubId;
            saveUsers(users);
            button.textContent = 'Added';
            button.disabled = true;
            return;
        }

        const newUser = new User({
            id: githubId,
            name: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            created_at: new Date().toISOString(),
        });
        users.push(newUser);
        saveUsers(users);
        button.textContent = 'Added';
        button.disabled = true;
        setStatus(`${user.login} was added to your list.`);
    } catch (error) {
        setStatus(error.message || 'Could not save this user.', true);
    }
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();
    if (!query) {
        setStatus('Enter a search term.', true);
        queryInput.focus();
        return;
    }

    resultsList.replaceChildren();
    setStatus('Searching GitHub...');

    try {
        const url = new URL(GITHUB_SEARCH_URL);
        url.searchParams.set('q', query);
        url.searchParams.set('per_page', '100');
        const response = await fetch(url);

        if (!response.ok) {
            const details = await response.json().catch(() => ({}));
            throw new Error(details.message || `GitHub search failed (${response.status}).`);
        }

        const data = await response.json();
        renderResults(data.items || []);
        setStatus(
            data.items && data.items.length
                ? `Showing ${data.items.length} GitHub users.`
                : 'No users found.',
        );
    } catch (error) {
        setStatus(error.message || 'Could not search GitHub. Please try again.', true);
    }
});
