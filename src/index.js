import { compareAsc, format } from 'date-fns'
import './index.html'
import './components/reset.css'
import './components/fonts.css'
import './styles.css'
import inboxIcon from './images/inbox.svg'

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

function ToDo(title, description = '', dueDate = '', priority = '', done=''){

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

    const getObject = (todo) =>{
        const title = todo.querySelector('input[type|="text"]').value, description = todo.querySelector('textarea').value
        const todoObject= list.find(obj => (obj.title == title && obj.description == description))
            
        return todoObject
    }

    return {add, list, getObject}
})();



const toDoController = (()=>{

    const displayToDo = (todo) => {
        const toDoDOM = `
        <div class="done"><input type="checkbox"></div>
        <div class="title"><input type="text" value="${todo.title}"></input></div>
        <div class="description"><textarea>${todo.description}</textarea></div>
        <div class="meta">
            <input type="date" value="${todo.dueDate}"></input>
            <div class="priority">${todo.priority}</div>
        `
        const item = document.createElement('div')
        item.classList.add('todo');
        item.innerHTML = toDoDOM
        appendContent(item)
    }

    const appendContent = (content) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.insertBefore(content, contentContainer.firstChild);
        handleUserInteraction(content);
    }

    const handleUserInteraction= (todo) => {
        const currentObject = toDoList.getObject(todo)
        window.addEventListener('resize', ()=>{
            resizeTextArea(todo);
        });
        todo.addEventListener('input', () => {
            resizeTextArea(todo);
        });
        todo.addEventListener('click', (e) => {
            console.log(currentObject)
            if (e.target.classList.contains('done')|| e.target.type=='checkbox'){return}
            expandToDo(todo, e.target); 
            collapseToDo(todo, currentObject);
        });
    }

    const expandToDo = (todo, target) => {
        const description = todo.querySelector('.description'), meta = todo.querySelector('.meta')
        description.classList.add('show');
        meta.classList.add('show'); 
        resizeTextArea(todo);
    }

    function resizeTextArea(todo){
        const textarea = todo.querySelector('textarea')
        textarea.style.height = '5px'
        textarea.style.height= textarea.scrollHeight+"px"
    }

    const updateObject = (todo, currentObject) => {
        const title = todo.querySelector('input[type|="text"]').value, description = todo.querySelector('textarea').value, dueDate = todo.querySelector('input[type|="date"]').value
        currentObject.setTitle(title)
        currentObject.setDescription(description)
        currentObject.setdueDate(dueDate)
    }

    const collapseToDo = (todo, currentObject) =>{
        const title = todo.querySelector('.title'), description = todo.querySelector('.description'), meta = todo.querySelector('.meta')

        if (description.classList.contains('show')){
            window.addEventListener('click', (e2) => {
                if (!todo.contains(e2.target)){ 
                    updateObject(todo, currentObject);
                    description.classList.remove('show');
                    meta.classList.remove('show');
                };
                },{once: true, capture:true})
        }
    }

    const displayToDos = () => {
        for (let item of toDoList.list){
            console.log(item)
            displayToDo(item)
        }
    }

    const addToDOM = (() => {
        document.getElementById('new').onclick =()=>{
        const blankToDo = new ToDo('')
        displayToDo(blankToDo);
        }
    })();

    return {displayToDos, displayToDo, addToDOM}
})();


const setHeader = () => {
    const currentTab= document.querySelector('.currentTab')

    currentTab.innerHTML= `<img src=${inboxIcon}><h1>Inbox`
    document.getElementById('new').innerHTML = 'Add to inbox'
}

setHeader();

const newToDo = new ToDo('lorem ipsum dolor sit amet', 'yes', 'tomorrow', 'high', 'no')
const newToDo2 = new ToDo('lorem! ipsuom! Dolor!', ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex illo accusamus at odit dignissimos velit, impedit qui facere, sunt, voluptate id nobis molestiae a est?', 'tomorrow2', 'high2', 'no2')

const newToDo3 = new ToDo('Lorem ipsum', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex illo accusamus at odit dignissimos velit, impedit qui facere, sunt, voluptate id nobis molestiae a est?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex illo accusamus at odit dignissimos velit, impedit qui facere, sunt, voluptate id nobis molestiae a est?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex illo accusamus at odit dignissimos velit, impedit qui facere, sunt, voluptate id nobis molestiae a est?', 'tomorrow3', 'high3', 'no3')

toDoList.add(newToDo)
toDoList.add(newToDo2);
toDoList.add(newToDo3);


toDoController.displayToDos();




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