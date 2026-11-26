const textDemo = document.getElementById('text-demo');
const itemList = document.getElementById('item-list');
const counter = document.getElementById('counter');
const classDemo = document.getElementById('class-demo');
let count = 0;

const exampleMarkup = '<strong>This text is bold.</strong>';

document.getElementById('text-button').addEventListener('click', () => {
    // Using textContent to set the content of the element, which will treat the string as plain text and not render any HTML tags.
    textDemo.textContent = exampleMarkup;
});

document.getElementById('html-button').addEventListener('click', () => {
    // Using innerHTML to set the content of the element, which will render the HTML tags in the string.
    textDemo.innerHTML = exampleMarkup;
});

document.getElementById('increment-button').addEventListener('click', () => {
    count += 1;
    counter.textContent = count;
});

document.getElementById('highlight-button').addEventListener('click', () => {
    classDemo.classList.toggle('highlight');
});

document.getElementById('large-text-button').addEventListener('click', () => {
    classDemo.classList.toggle('large-text');
});

document.getElementById('border-button').addEventListener('click', () => {
    classDemo.classList.toggle('bordered');
});

document.getElementById('add-button').addEventListener('click', () => {
    const item = document.createElement('li');
    item.textContent = `List item ${itemList.children.length + 1}`;
    itemList.appendChild(item);
});
