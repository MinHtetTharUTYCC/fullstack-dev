async function fetchUser(id) {
    try {
        const res = await fetch(`https://api.github.com/users/${id}`);
        if (!res.ok) throw new Error('HTTP ' + res.status); // 404 etc.
        const data = await res.json();
        console.log(data.login, data.name);
    } catch (err) {
        // network failure, bad URL, HTTP error -> all handled in one place
        console.error('could not load user:', err.message);
    }
}

await fetchUser('octocat');
await fetchUser('no-such-user-xyz-123');
