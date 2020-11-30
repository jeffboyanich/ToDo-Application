import {toDoArr, createToDo, priority, byProject, byDate, toLocalStorage, fromLocalStorage, 
    toDoToday, thisWeek, byCategories, filterCats} from './to-do.js';

const dateFormat = require('dateformat');

const content = document.getElementById('content');
const toDoList = document.getElementById('todo-list');
const toDoDisplay = document.getElementById('display');
const displayAllBtn = document.getElementById('all');
const todayBtn = document.getElementById('today');
const weekBtn = document.getElementById('week');
const categoryBtn = document.getElementById('categories');

const render = (() => {
    fromLocalStorage();
    displayAll(byDate());
    categoriesMenu();
    toLocalStorage();
})();

function transDate(date) {
    date.toLocaleString('en-US', {
    weekday: 'short', 
    month: 'long', 
    day: '2-digit', 
    year: 'numeric' 
    });
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);
    let dateStr = `${month}-${day}-${year}`; 
    return dateStr;
}

function displayForm() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
}

function getValues() {
    const form = document.getElementById('form');
    let title = form.title.value;
    let description = form.description.value;
    let date = form.date.value;
    let project = form.project.value;
    const task = createToDo(title, description, date, project);
    task.addToArr();
}

function resetForm() {
    const form = document.getElementById('form');
    form.reset();
}

const addTask = (() => {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        getValues();
        resetForm();
        toLocalStorage();
        render();
    })
})();

const cancelBtn = (() => {
    const cancel = document.getElementById('cancel-btn');
    cancel.addEventListener('click', function() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    })
})();

const newTask = (() => {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        displayForm(); 
    })
})();

//Manipulate DOM to display sorted todos
function displayAll(sortFunc) {
    refresh();
    let arr = sortFunc;
    arr.forEach(function(item) {
        const listItem = document.createElement('li');
        const title = document.createElement('div');
        const due = document.createElement('div');
        listItem.classList.add('task');
        title.textContent = item.title;
        let date = item.dueDate;
        due.textContent = transDate(date);
        listItem.appendChild(title);
        listItem.appendChild(due);
        toDoList.appendChild(listItem);
    })
}

function categoriesMenu() {
    const dropDown = document.getElementById('dropdown');
    const categories = filterCats();
    console.log(filterCats());
    categories.forEach(item => {
        const newCat = document.createElement('li');
        newCat.textContent = item.toUpperCase();
        newCat.setAttribute('data-key', `${item}`);
        newCat.classList.add('cat-select');
        dropDown.appendChild(newCat);
    });
    catSelectBtn();
}

function catSelectBtn() {
    const catBtns = document.querySelectorAll('.cat-select');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => displayAll(byCategories(btn.dataset.key)))
});
}

function showCategories() {
    const dropDown = document.getElementById('dropdown');
    if (dropDown.style.display === 'none') {
        dropDown.style.display = 'block';
    }else {
        dropDown.style.display = 'none';
    }
};


function refresh() {
    toDoList.textContent = '';
}

displayAllBtn.addEventListener('click', () => displayAll(byDate()));
todayBtn.addEventListener('click', () => displayAll(toDoToday()));
weekBtn.addEventListener('click', () => displayAll(thisWeek()));
categoryBtn.addEventListener('click', () => showCategories());


//localStorage.clear();