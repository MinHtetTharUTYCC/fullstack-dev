import { User } from './class.js';

const STORAGE_KEY = 'awesome-people-users';

function getSavedUsers() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const saved = stored === null ? [] : JSON.parse(stored);
        if (!Array.isArray(saved)) {
            throw new Error('Your saved list could not be read.');
        }
        return saved.map(User.fromJSON);
    } catch (error) {
        console.error('Error reading saved users from localStorage:', error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export { STORAGE_KEY, getSavedUsers, saveUsers };
