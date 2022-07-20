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

function ToDo(title, description = '', dueDate = '', priority = '', done='', createdAt=''){

    if (typeof Object.create !== 'function') {
        alert('YOU FORGOT TO USE NEW')
    };

    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.done = done
    this.createdAt = createdAt
}

const toDoList = (()=> {

    const list = []

    const add = (todo) => {
        list.push(todo)
    }

    const getObject = (todo) =>{
        const createdAt = todo.querySelector('input[type|="hidden"]').value
        const todoObject= list.find(obj => (obj.createdAt == createdAt))
            
        return todoObject
    }

    const writeToLocalStorage = () => {
        localStorage.setItem("toDos", JSON.stringify(list));
    }

    const getFromLocalStorage = () => {
        let storedNames = JSON.parse(localStorage.getItem("toDos"));
        return storedNames
    }

    return {add, list, getObject, writeToLocalStorage, getFromLocalStorage}
})();

const toDoController = (()=>{

    const displayToDo = (todo) => {
        const toDoDOM = `
        <div class="done">
            <input type="checkbox">
        </div>
        <div class="title"><input type="text" value="${todo.title}"></input></div>
        <div class="description"><textarea>${todo.description}</textarea></div>
        <div class="meta">
            <input type="date" value="${todo.dueDate}"></input>
            <div class="priority">
                <select class="classic" value='${todo.priority}'>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </div>
            <input type="hidden" value="${todo.createdAt}"></input>
        </div>
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
        const description = todo.querySelector('.description'), meta = todo.querySelector('.meta')

        if (description.classList.contains('show')){
            window.addEventListener('click', (e2) => {
                if (!todo.contains(e2.target)){ 
                    description.classList.remove('show');
                    meta.classList.remove('show');
                    if (currentObject){
                        updateObject(todo, currentObject)
                    }else{
                        currentObject = toDoList.getObject(todo)
                        updateObject(todo, currentObject)
                    }
                    toDoList.writeToLocalStorage(toDoList.list)
                };
                },{once: true, capture:true})
        }
    }

    const displayToDos = () => {
        for (let item of toDoList.list){
            const objectFromString = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            displayToDo(objectFromString);
        }
    }

    const addToDOM = (() => {
        document.getElementById('new').onclick =()=>{
        const blankToDo = new ToDo('')
        blankToDo.createdAt = new Date()
        toDoList.add(blankToDo);
        console.log(toDoList.list)
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

window.onload = () =>{
    let stringList = toDoList.getFromLocalStorage();
    for (let item of stringList){
    const stringToObject = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
        toDoList.add(stringToObject)
    }
    toDoController.displayToDos();

}

setHeader();




// function storageAvailable(type) {
//     let storage;
//     try {
//         storage = window[type];
//         const x = '__storage_test__';
//         storage.setItem(x, x);
//         storage.removeItem(x);
//         return true;
//     }
//     catch(e) {
//         return e instanceof DOMException && (
//             // everything except Firefox
//             e.code === 22 ||
//             // Firefox
//             e.code === 1014 ||
//             // test name field too, because code might not be present
//             // everything except Firefox
//             e.name === 'QuotaExceededError' ||
//             // Firefox
//             e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             (storage && storage.length !== 0);
//     }
// }

// if (storageAvailable('localStorage')) {
//     console.log('yes')  
// }
//   else {
//     console.log('no')
//   }

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