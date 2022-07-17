import { compareAsc, format } from 'date-fns'
import './index.html'
import './components/reset.css'
import './components/fonts.css'
import './styles.css'

const Actions = {
    //setters
    setTitle(newTitle){this.title = newTitle},
    setdueDate(newDudeDate){this.dueDate = newDudeDate},
    setDescription(newDescription){this.description = newDescription},
    setPriority(newPriority){this.priority = newPriority},
    setDone(newDone){this.done = newDone},

    //getters (let's see if we'll use them?)
    getTitle(){return this.title},
    getdueDate(){return this.dueDate},
    getDescription(){return this.description},
    getPriority(){return this.priority},
    getDone(){return this.done},
}

ToDo.prototype = Object.create(Actions)

function ToDo(title, description = null, dueDate = null, priority = null, done=null){

    if (typeof Object.create !== 'function') {
        alert('YOU FORGOT TO USE NEW')
    };

    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.done = done

//if we want to just return new object 
    // if (typeof Object.create !== 'function') {
    //     Object.create = function (o) {
    //         function F() {}
    //         F.prototype = o;
    //         return new F();
    //     };
}

const toDoList = (()=>{

    const list = []

    const getList = () => list

    const add = (todo) => {
        list.push(todo)
    }

    return {add, list}
})();

const displayToDo = (todo) => {
    const toDoDOM = `
    <div class="done"><input type="checkbox"></div>
    <div class="title">${todo.title}</div>
    <div class="description">${todo.description}</div>
    <div class="meta">
        <div class="duedate">${todo.dueDate}</div>
        <div class="priority">${todo.priority}</div>
    </div>
    `
    const item = document.createElement('div')
    item.classList.add('todo');
    item.innerHTML = toDoDOM
    return item
}

function appendContent(content) {
    const contentContainer = document.querySelector('.content')
    contentContainer.append(content)
}


const newToDo = new ToDo('lorem ipsum dolor sit amet', 'yes', 'tomorrow', 'high', 'no')
const newToDo2 = new ToDo('lorem! ipsuom! Dolor!', ' impedit qui facere, sunt, voluptate', 'tomorrow2', 'high2', 'no2')

const newToDo3 = new ToDo('Lorem ipsum', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex illo accusamus at odit dignissimos velit, impedit qui facere, sunt, voluptate id nobis molestiae a est?', 'tomorrow3', 'high3', 'no3')


toDoList.add(newToDo2);


appendContent(displayToDo(newToDo))

const displayToDos = (() => {
    const content = document.querySelector('.content')
    for (let item of toDoList.list){
        content.append(displayToDo(item));
    }
})();

toDoList.add(newToDo3);
console.log(toDoList)


// })(toDoList);

// const Project = (title, description, dueDate, priority, done=null) => {
//     const prototype = Todo(title, description, dueDate, priority, done=null);
    
//     const toDos = []

//     const addToDo = (toDo) => {
//         toDos.push(toDo)
//     }
    
//     return Object.assign({}, prototype, {toDos, addToDo})
// }
// const projectList = (()=>{

//     const list = []

//     const getList = () => list

//     const add = (item) => {
//         list.push(item)
//     }

//     return {add, getList}
// })();



//inbox
//projects

//project
//title, description, dueDate and priority

//todo
//title, description, dueDate and priority
//checklist
//notes

//display todos from local storage (map .write to dom)
//add (push to array, add to dom)
//edit
//update
//delete