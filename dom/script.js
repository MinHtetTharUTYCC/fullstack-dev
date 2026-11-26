const textDemo = document.getElementById('text-demo');
const itemList = document.getElementById('item-list');

const exampleMarkup = '<strong>This text is bold.</strong>';

document.getElementById('text-button').addEventListener('click', () => {
    textDemo.textContent = exampleMarkup;
});

document.getElementById('html-button').addEventListener('click', () => {
    textDemo.innerHTML = exampleMarkup;
});

document.getElementById('class-button').addEventListener('click', () => {
    textDemo.classList.toggle('highlight');
});

document.getElementById('add-button').addEventListener('click', () => {
    const item = document.createElement('li');
    item.textContent = `List item ${itemList.children.length + 1}`;
    itemList.appendChild(item);
});
