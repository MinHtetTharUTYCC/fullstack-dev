const slow = (label, ms, ok = true) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            ok ? resolve(label) : reject(new Error(label + ' failed'));
        }, ms),
    );

// Promise.all: wait for ALL, but fail fast if any rejects
const pm1 = slow('a', 300, true);
const pm2 = slow('b', 100, true);
const pm3 = slow('c', 200, false);

Promise.all([pm1, pm2]).then((values) => console.log('all:', values)); // ["a", "b"]

Promise.all([pm1, pm2, pm3])
    .then((values) => console.log('all:', values))
    .catch((err) => console.error('all failed:', err.message)); // rejects fast

// Promise.race: first to settle wins (fulfilled or rejected)
// Promise.race([slow('fast', 100), slow('slow', 500)]).then((v) => console.log('race winner:', v)); // "fast"

Promise.race([pm1, pm2]).then((v) => console.log('race winner:', v));
