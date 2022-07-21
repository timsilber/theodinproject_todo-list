import { compareAsc, format } from 'date-fns'
import './index.html'
import './components/reset.css'
import './components/fonts.css'
import './styles.css'
import inboxIcon from './images/inbox.svg'
import trashIcon from './images/delete.svg'

const Actions = {
    //setters
    setTitle(newTitle){this.title = newTitle},
    setdueDate(newDudeDate){this.dueDate = newDudeDate},
    setDescription(newDescription){this.description = newDescription},
    setPriority(newPriority){this.priority = newPriority},
    setDone(newDone){this.done = newDone},
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

const trashList = (()=>{

    const list = []

    const add = (todo) => {
        list.push(todo)
    }

    const writeToLocalStorage = () => {
        localStorage.setItem("trash", JSON.stringify(list));
    }

    return {list, add, writeToLocalStorage}

})();

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
        <div class="title">
            <input type="text" placeholder="New To-Do" ondrop="return false" value="${todo.title}"></input>
            <img src="${trashIcon}" class="delete">
        </div>
        <div class="description"><textarea ondrop="return false" placeholder="Notes">${todo.description}</textarea></div>
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
        item.id = todo.createdAt
        item.classList.add('todo');
        item.setAttribute('draggable', 'true')
        item.innerHTML = toDoDOM
        appendContent(item)

        return item
    }

    const appendContent = (content) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.insertBefore(content, contentContainer.firstChild);
        handleUserInteraction(content);
    }

    const deleteObject = (currentObject, todo) => {
        const index = toDoList.list.findIndex(object => {
            return object === currentObject;
        });

        trashList.add(toDoList.list[index]);
        toDoList.list.splice(index, 1);
        toDoList.writeToLocalStorage();
        trashList.writeToLocalStorage();
        todo.remove();
    }

    const handleUserInteraction= (todo) => {
        const currentObject = toDoList.getObject(todo)
        const deleteIcon = todo.querySelector('.delete')
        
        deleteIcon.addEventListener('click', () => {
            deleteObject(currentObject, todo);
        })

        window.addEventListener('resize', ()=>{
            resizeTextArea(todo);
        });
        todo.addEventListener('input', () => {
            resizeTextArea(todo);
        });

        todo.addEventListener('click', (e) => {
            const checkbox = todo.querySelector('input[type="checkbox"]');
            if (e.target != checkbox && e.target != todo.querySelector('.done')){
                expandToDo(todo, e.target);
            }
            collapseToDo(todo, currentObject);
        });

        todo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    }
    
    const expandToDo = (todo) => {
        const description = todo.querySelector('.description'), meta = todo.querySelector('.meta')
        description.classList.add('show');
        meta.classList.add('show'); 
        resizeTextArea(todo);
    }

    function resizeTextArea(todo){
        const textarea = todo.querySelector('textarea')
        textarea.style.height = '1px'
        textarea.style.height= textarea.scrollHeight+"px"
        if (textarea.value.length == 0){
            textarea.style.height= '3em'
        }
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
                    updateObject(todo, currentObject);
                    toDoList.writeToLocalStorage(toDoList.list);
                };
                },{once: true, capture:true})
        }
    }

    const handleDrop = (() => {
        const trash = document.getElementById('trash')
        trash.addEventListener('drop', (e) => {
            trash.addEventListener('dragenter', ()=>{
                trash.style.background = '#fef6e4'
            })
            trash.addEventListener('dragleave', ()=>{
                trash.style.background = 'none'
            })
            const trashyObject = document.getElementById(e.dataTransfer.getData('text/plain'))
            toDoController.deleteObject(toDoList.getObject(trashyObject), trashyObject)
        })
    })();

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
            toDoList.writeToLocalStorage();
            const item = displayToDo(blankToDo);
            item.click();
        }
    })();

    return {displayToDos, displayToDo, addToDOM, deleteObject}
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
        toDoList.add(stringToObject);
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