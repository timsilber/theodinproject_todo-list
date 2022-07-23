import { compareAsc, format } from 'date-fns'
import './index.html'
import './components/reset.css'
import './components/fonts.css'
import './styles.css'
import inboxIcon from './images/inbox.svg'
import trashIcon from './images/delete.svg'
import completedIcon from './images/check.svg'

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

    const contains = (object) => {
        if (list.indexOf(object) < 0){
            return false
        }
        return true;
    }

    const getFromLocalStorage = () => {
        let storedNames = JSON.parse(localStorage.getItem("trash"));
        return storedNames
    }

    const writeToLocalStorage = () => {
        localStorage.setItem("trash", JSON.stringify(list));
    }

    const loadToDos = () => {
        let stringList = getFromLocalStorage();
        for (let item of stringList){
            const stringToObject = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            trashList.add(stringToObject);
        }
    } 

    const displayToDos = (list) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.innerHTML = ''
        for (let item of list){
            const objectFromString = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            toDoController.toDoDOM(objectFromString);
        }
    
        const trashedToDos = [...document.querySelectorAll('.todo')]
        trashedToDos.forEach((item) => {
            const checkbox = item.querySelector('input[type|="checkbox')
            const done = item.querySelector('.delete')
            const restore = item.querySelector('.restore')


            checkbox.disabled = true
            checkbox.style.opacity = .3

            done.style.display = 'none'
            restore.style.display = 'block'

        });
    }
    
    return {list, add, writeToLocalStorage, loadToDos, displayToDos, contains}

})();

const completedList = (()=> {

    const list = []

    const add = (todo) => {
        list.push(todo)
    }

    const contains = (object) => {
        if (list.indexOf(object) < 0){
            return false
        }
        return true;
    }

    const getObject = (todo) =>{
        const createdAt = todo.querySelector('input[type|="hidden"]').value
        const todoObject= list.find(obj => (obj.createdAt == createdAt))
        return todoObject
    }

    const writeToLocalStorage = () => {
        localStorage.setItem("completed", JSON.stringify(list));
    }

    const getFromLocalStorage = () => {
        let storedNames = JSON.parse(localStorage.getItem("completed"));
        return storedNames
    }

    const loadToDos = () => {
        let stringList = getFromLocalStorage();
        for (let item of stringList){
            const stringToObject = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            add(stringToObject);
            console.log(item)
        }
    } 

    const displayToDos = (list) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.innerHTML = ''
        for (let item of list){
            const objectFromString = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            toDoController.toDoDOM(objectFromString);
        }
        const completedToDos = [...document.querySelectorAll('.todo')]
        completedToDos.forEach((item) => {
            item.querySelector('input[type|="checkbox').checked = true
        });
    }

    return {add, list, getObject, writeToLocalStorage, loadToDos, contains, displayToDos}
})();

const toDoList = (()=> {

    const list = []

    const add = (todo) => {
        list.push(todo)
    }

    const contains = (object) => {
        if (list.indexOf(object) < 0){
            return false
        }
        return true;
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

    const loadToDos = () => {
        let stringList = getFromLocalStorage();
        for (let item of stringList){
            const stringToObject = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            add(stringToObject);
        }
    } 

    const displayToDos = (list) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.innerHTML = ''
        for (let item of list){
            const objectFromString = new ToDo(item.title, item.description, item.dueDate, item.priority, item.done, item.createdAt)
            toDoController.toDoDOM(objectFromString);
        }
    }

    return {add, list, getObject, writeToLocalStorage, loadToDos, displayToDos, contains}
})();

//handles all DOM interactions with individual toDos
const toDoController = (()=>{

    const addToDOM = (() => {
        document.getElementById('new').onclick =()=>{
            const blankToDo = new ToDo('')
            let datetime = new Date() 
            datetime += datetime.getMilliseconds()
            blankToDo.createdAt = datetime

            toDoList.add(blankToDo);
            toDoList.writeToLocalStorage();
            const item = toDoDOM(blankToDo);
            item.click();
        }
    })();

    const toDoDOM = (todo) => {
        const toDoDOM = `
        <div class="done">
            <input type="checkbox">
        </div>
        <div class="title">
            <input type="text" placeholder="New To-Do" ondrop="return false" value="${todo.title}"></input>
            <img src="${trashIcon}" class="delete">
            <button class="restore">Restore</div>
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
        appendContent(item);

        return item
    }

    const appendContent = (content) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.insertBefore(content, contentContainer.firstChild);
        handleUserInteraction(content);
    }

    const deleteToDo = (currentObject, todo) => {
        const index = toDoList.list.findIndex(object => {
            return object === currentObject;
        });

        todo.querySelector('.description').classList.remove('show')
        todo.querySelector('.meta').classList.remove('show')

        trashList.add(toDoList.list[index]);
        toDoList.list.splice(index, 1);
        toDoList.writeToLocalStorage();
        trashList.writeToLocalStorage();

        todo.classList.add('zoom')
        setTimeout(()=>{
            todo.remove(); 
        }, 500)
    }

    const completeToDo = (currentObject, todo) => {
        const index = toDoList.list.findIndex(object => {
            return object === currentObject;
        });

        todo.querySelector('.description').classList.remove('show')
        todo.querySelector('.meta').classList.remove('show')
        
        currentObject.setDone(true);
        completedList.add(toDoList.list[index]);
        toDoList.list.splice(index, 1);
        toDoList.writeToLocalStorage();
        completedList.writeToLocalStorage();

        setTimeout(()=>{
            todo.classList.add('slide-out')
        }, 200)
        setTimeout(()=>{
            todo.remove(); 
        }, 500)
    }

    const handleUserInteraction= (todo) => {
        const currentObject = toDoList.getObject(todo)
        const deleteIcon = todo.querySelector('.delete')
        const checkbox = todo.querySelector('input[type|="checkbox')

        checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            completeToDo(currentObject, todo);       
        } else {
        
        }
        });
        
        deleteIcon.addEventListener('click', () => {
            deleteToDo(currentObject, todo);
        })

        window.addEventListener('resize', ()=>{
            resizeTextArea(todo);
        });
        todo.addEventListener('input', () => {
            resizeTextArea(todo);
        });

        todo.addEventListener('click', (e) => {
            const checkbox = todo.querySelector('input[type="checkbox"]');
            const trashIcon = todo.querySelector('.delete')

            if (e.target != checkbox && e.target != todo.querySelector('.done') && e.target !=trashIcon){
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
            const trashyObject = document.getElementById(e.dataTransfer.getData('text/plain'))
            toDoController.deleteToDo(toDoList.getObject(trashyObject), trashyObject)
        })
    })();

    return {toDoDOM, addToDOM, deleteToDo}
})();


const setHeader = (header) => {
    const currentTab= document.querySelector('.currentTab')

    switch(header){
        case toDoList:
            currentTab.innerHTML= `<img src=${inboxIcon}><h1>Inbox`
            document.getElementById('new').style.display = 'block'
            document.getElementById('new').innerHTML = 'Add to inbox'
            break
        case trashList:
            currentTab.innerHTML= `<img src=${trashIcon}><h1>Trash`
            document.getElementById('new').style.display = 'none'
            break
        case completedList:
            currentTab.innerHTML= `<img src=${completedIcon}><h1>Completed`
            document.getElementById('new').style.display = 'none'
            break
        default:
            break
    }
}

window.onload = () =>{
    try {
        toDoList.loadToDos();
        toDoList.displayToDos(toDoList.list);
        trashList.loadToDos();
        completedList.loadToDos();
        console.log(completedList.list)
    } catch (error) {
        console.log('no todos to load')
    }
    setHeader(toDoList);
}

document.getElementById('inbox').addEventListener('click', ()=> {
    try{
    toDoList.displayToDos(toDoList.list);
}catch(e){}
    setHeader(toDoList);
})

document.getElementById('completed').addEventListener('click', ()=> {
    try{completedList.displayToDos(completedList.list)}catch(e){}
    setHeader(completedList);
})

document.getElementById('trash').addEventListener('click', () => {
    try{
    trashList.displayToDos(trashList.list);}catch(e){}
    setHeader(trashList);
})

