let toDoArr = [];

const createToDo = (title, description, dueDate, project, priority, color) => {
    return {
        title: title,
        description: description,
        dueDate: dueDate,  
        priority: priority,
        color: color,
        project: project,
        addToArr: function() {
        toDoArr.push(this);
        }
    }
};

/*const emptyTrash = createToDo('Empty trash', 'Empty the kitchen and bathroom trashes into the trash outside', 
'11/30/20', 5,'blue', 'chores');
const walkDog = createToDo('Walk Dog', 'Walk the dog around the block', '12/1/20', 3, 'green', 'chores');
const laundry = createToDo('Do Laundry', 'Do three loads of laundry', '12/2/20', 2, 'red', 'chores');
const dentist = createToDo('Dentist appointment', 'go to dentist appointment', '11/28/20', 1, 'grey', 
'Appointments')
const waterPlants = createToDo('Water plants', 'Water all the plants in the garden', '11/27/20', 2, 'grey', 'chores')

emptyTrash.addToArr();
walkDog.addToArr();
laundry.addToArr();
dentist.addToArr();
waterPlants.addToArr();*/

//Sorting functions
const priority = () => {
  return toDoArr.sort((a, b) => b.priority - a.priority);
}

const byProject = function(project) {
  const projectArr = toDoArr.filter(obj => obj.project == project)
  return projectArr.sort((a, b) => {
    let da = new Date(a.dueDate),
        db = new Date(b.dueDate);
    return da - db;
  })
}

const byDate = () => toDoArr.sort((a, b) => {
  let da = new Date(a.dueDate);
  let db = new Date(b.dueDate);
  return da - db;
})

const toDoToday = () => toDoArr.filter(obj => obj.dueDate === new Date());

const thisWeek = () => {
    const myDate = new Date();
    let dateTime = myDate.getTime();
    let weekday = myDate.getDay() + 1;
    let weekstart = dateTime - (86400000 * weekday);
    let weekend = dateTime + ((7 - weekday) * 86400000);
    return toDoArr.filter(obj => {
        let a = new Date(obj.dueDate)
        let ab = a.getTime();
        return a > weekstart && a < weekend;
    })
};

const byCategories = (category) => {
    let dateSorted = byDate();
    return dateSorted.filter(obj => obj.project === category);
}

const filterCats = () => {
    const cats = [];
    toDoArr.forEach(obj => {
        cats.push(obj.project)
    });
    let x = (cats) => cats.filter((g,z) => cats.indexOf(g) === z)
    return x(cats);
}

//Store and retrieve items in localStorage
function toLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < toDoArr.length; i++) {
        window.localStorage.setItem(`${i}`, JSON.stringify(toDoArr[i]));
    }
}

function fromLocalStorage() {
    for (let i = 0; i < window.localStorage.length; i++) {
        toDoArr.push(JSON.parse(window.localStorage.getItem(`${i}`)));
    }
    localStorage.clear();
}



export {toDoArr, createToDo, priority, byProject, byDate, toLocalStorage, fromLocalStorage, toDoToday, thisWeek, 
    byCategories, filterCats} 