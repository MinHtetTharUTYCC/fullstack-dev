function getUser(id, callback) {
    setTimeout(() => {
        callback(null, { id: id, name: 'Ada' });
    }, 2000);
}
function getPosts(userId, callback) {
    setTimeout(() => {
        callback(null, ['post1', 'post2', 'post3']);
    }, 2000);
}
function getComments(postId, callback) {
    setTimeout(() => {
        callback(null, ['nice!', 'great post', 'thanks for sharing']);
    }, 2000);
}

getUser(1, (err, userData) => {
    // use user data
    getPosts(userData.id, (err, postsData) => {
        // use posts data
        getComments(postsData[0], (err, commentsData) => {
            // use comments data
            console.log('comments:', commentsData);
        });
    });
});

// This is not a good way to write code because it is hard to read and maintain.
// This is called "callback hell" or "pyramid of doom".
// We can use promises and async/await to make this code more readable and maintainable.
