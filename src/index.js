import { compareAsc, format, formatDistance, subDays, parseISO, isFuture, isThisWeek} from 'date-fns'
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

function ToDo(title, description = '', dueDate = null, priority = '', done='', createdAt=''){

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

    const contains = (object) => {
        if (list.indexOf(object) < 0){
            return false
        }
        return true;
    }

   const sortList = () => {
        
        list.sort((a,b)=>{
            console.log(a.dueDate, b.dueDate)
            return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
        })
        list.reverse()
    }

    const sortListCreated = () => {
        list.sort((a,b)=>{
            console.log(a.createdAt, b.createdAt)
            return a.createdAt - b.createdAt
        })
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

        if (!stringList){
            console.log('inbox is empty')
            return
        }

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

    return {add, list, getObject, writeToLocalStorage, loadToDos, displayToDos, contains, sortList, sortListCreated}
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

    const sortList = () => {
        
        list.sort((a,b)=>{
            console.log(a.dueDate, b.dueDate)
            return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
        })
        list.reverse()
    }

    const sortListCreated = () => {
        list.sort((a,b)=>{
            console.log(a.createdAt, b.createdAt)
            return a.createdAt - b.createdAt
        })
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

        if (!stringList){
            console.log('completed list is empty')
            return
        }

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

        const completedToDos = [...document.querySelectorAll('.todo')]
        completedToDos.forEach((todo) => {
            todo.querySelector('input[type|="checkbox"').checked = true
            todo.querySelector('.description-text').readOnly = true
            todo.querySelector('.title-text').readOnly = true
            todo.querySelector('input[type|="date"').disabled = true
            todo.querySelector('.delete').style.display = 'none'

            todo.classList.add('completed')

        });
    }

    return {add, list, getObject, writeToLocalStorage, loadToDos, contains, displayToDos, sortList, sortListCreated}
})();

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

    const sortList = () => {
        
        list.sort((a,b)=>{
            console.log(a.dueDate, b.dueDate)
            return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
        })
        list.reverse()
    }

    const sortListCreated = () => {
        list.sort((a,b)=>{
            console.log(a.createdAt, b.createdAt)
            return a.createdAt - b.createdAt
        })
    }


    const getObject = (todo) =>{
        const createdAt = todo.querySelector('input[type|="hidden"]').value
        const todoObject= list.find(obj => (obj.createdAt == createdAt))
        return todoObject
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

        if (!stringList){
            console.log('trash is empty')
            return
        }
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
        trashedToDos.forEach((todo) => {
            const checkbox = todo.querySelector('input[type|="checkbox')
            const done = todo.querySelector('.delete')
            const restore = todo.querySelector('.restore')

            todo.querySelector('.description-text').readOnly = true
            todo.querySelector('.title-text').readOnly = true
            todo.querySelector('input[type|="date"').disabled = true
            todo.querySelector('.delete').style.display = 'none'
            todo.querySelector('.days-left').style.display = 'none'
            
            checkbox.disabled = true
            checkbox.style.opacity = .3

            done.style.display = 'none'
            restore.style.display = 'block'

            todo.classList.add('trashed');
        });
    }
    
    return {list, add, writeToLocalStorage, loadToDos, displayToDos, contains, getObject, sortList, sortListCreated}

})();


//handles all DOM interactions with individual toDos
const toDoController = (()=>{

    const addToDOM = (() => {
        document.getElementById('new').onclick =()=>{
            const blankToDo = new ToDo('')
            const date = new Date() 
            const datetime = date.getTime()
            blankToDo.createdAt = datetime

            toDoList.add(blankToDo);
            toDoList.writeToLocalStorage();
            const item = toDoDOM(blankToDo);
            item.click();
        }
    })();

    const toDoDOM = (todo) => {
        let daysLeft= ''
        if(todo.dueDate){
            daysLeft = formatDistance(parseISO(todo.dueDate), new Date(), { addSuffix: true })
        }

        const toDoDOM = `
        <div class="done">
            <input type="checkbox">
        </div>
        <div class="title">
            <textarea rows="1" class="title-text nowrap" placeholder="New To-Do" ondrop="return false">${todo.title}</textarea>
            <img src="${trashIcon}" class="delete">
        </div>
        <div class="days-left">${daysLeft}</div>
        <button class="restore">Restore</button>
        <div class="description">
            <textarea rows="1" class="description-text" ondrop="return false" placeholder="Notes">${todo.description}</textarea>
        </div>
        <div class="meta">
            <input type="date" value="${todo.dueDate}"></input>
            <div class="priorityContainer">
                <select class="priority" value='${todo.priority}'>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="low">Low</option>
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
        for (let option of item.querySelector('.priority').options){
            if (todo.priority == option.value){
                option.setAttribute('selected', true)
            }
        }
        appendContent(item);

        return item
    }

    const appendContent = (todo) => {
        const contentContainer = document.querySelector('.content')
        contentContainer.insertBefore(todo, contentContainer.firstChild);
        handleUserInteraction(todo);
        setColor(todo)
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

    const unDeleteToDo = (todo) => {
        const currentObject = trashList.getObject(todo)
        const index = trashList.list.indexOf(trashList.getObject(todo))

        todo.querySelector('.description').classList.remove('show')
        todo.querySelector('.meta').classList.remove('show')
        
        toDoList.add(trashList.list[index]);
        trashList.list.splice(index, 1);
        trashList.writeToLocalStorage();
        toDoList.writeToLocalStorage();

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
        currentObject.completedAt = new Date()
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

    const unCompleteToDo = (todo) => {
        const currentObject = completedList.getObject(todo)
        const index = completedList.list.indexOf(completedList.getObject(todo))

        todo.querySelector('.description').classList.remove('show')
        todo.querySelector('.meta').classList.remove('show')
        
        currentObject.setDone(false);
        toDoList.add(completedList.list[index]);
        completedList.list.splice(index, 1);
        completedList.writeToLocalStorage();
        toDoList.writeToLocalStorage();

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
        const restore = todo.querySelector('.restore')

        checkbox.addEventListener('change', (e) => {
        if (e.currentTarget.checked) {
            completeToDo(currentObject, todo);       
        } else {
            unCompleteToDo(todo);
        }
        });

        restore.addEventListener('click', (e)=>{
            unDeleteToDo(todo);
        });
        
        deleteIcon.addEventListener('click', () => {
            deleteToDo(currentObject, todo);
        })

        todo.addEventListener('click', (e) => {
            const checkbox = todo.querySelector('input[type="checkbox"]');
            const trashIcon = todo.querySelector('.delete')
            const restore = todo.querySelector('.restore')
            const noExpand = [checkbox, trashIcon, restore]

            if (noExpand.every((item) => e.target != item)){
                expandToDo(todo, e.target);

            }
            todo.addEventListener('keyup', ()=>{
                    updateObject(todo, currentObject)
                    setTimeout(toDoList.writeToLocalStorage(), 1000)
                })
            collapseToDo(todo, currentObject);
        });

        todo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    }
    
    const expandToDo = (todo) => {
        const description = todo.querySelector('.description'), meta = todo.querySelector('.meta')
        const daysLeft = todo.querySelector('.days-left')
        description.classList.add('show');
        meta.classList.add('show'); 
        daysLeft.style.display = 'none'
        resizeTextAreaInput(todo);
        
    }

    const resizeTextAreaInput = (todo) => {
       const titleArea = todo.querySelector('.title-text')
       const descriptionArea = todo.querySelector('.description-text')
       descriptionArea.style.height = '1px'
       titleArea.style.height = '1px'

       titleArea.classList.remove('nowrap')
       console.log(titleArea.scrollHeight)
       titleArea.setAttribute("style", "height:" + (titleArea.scrollHeight) + "px");
       titleArea.addEventListener("input", onTitleInput, false);
       window.addEventListener("resize", onTitleInput, false);

       function onTitleInput(e) {
           titleArea.style.height = "auto";
           titleArea.style.height = (titleArea.scrollHeight) + "px";
       }

        descriptionArea.setAttribute("style", "height:" + (descriptionArea.scrollHeight) + "px;overflow-y:hidden;");
        descriptionArea.addEventListener("input", onDescriptionInput, false);
        window.addEventListener("resize", onDescriptionInput, false);

        function onDescriptionInput(e) {
            descriptionArea.style.height = "auto";
            descriptionArea.style.height = (descriptionArea.scrollHeight) + "px";
        }
    }

    const updateObject = (todo, currentObject) => {
        const title = todo.querySelector('.title-text').value
        const description = todo.querySelector('.description-text').value, 
        dueDate = todo.querySelector('input[type|="date"]').value, 
        priorityDropdown = todo.querySelector('.priority'),
        priority = priorityDropdown.options[priorityDropdown.selectedIndex].value

        currentObject.setTitle(title)
        currentObject.setDescription(description)
        currentObject.setdueDate(dueDate)
        currentObject.setPriority(priority)
        
        if (currentObject.dueDate){
            const daysLeft = formatDistance(parseISO(currentObject.dueDate), new Date(), { addSuffix: true })
            todo.querySelector('.days-left').innerHTML = daysLeft
            setColor(todo);
        }
    }

    const setColor = (todo) =>{
        // const date = parseISO(todo.querySelector('input[type|="date"').value)
        const daysColor = todo.querySelector('.days-left')
        const daysText = daysColor.innerHTML
        // const inAWeek = new Date(new Date().setDate(new Date().getDate() + 7)).getDate()

        switch (true){
            case (daysText.includes('ago') && daysText.includes('days')):
                daysColor.style.color = '#e16162ff'
                break
        }
    }

    const collapseToDo = (todo, currentObject) =>{
        const description = todo.querySelector('.description'), meta = todo.querySelector('.meta')
        const titleArea = todo.querySelector('.title-text')
        const daysLeft = todo.querySelector('.days-left')

        if (description.classList.contains('show')){
            window.addEventListener('click', (e2) => {
                if (!todo.contains(e2.target)){ 
                    titleArea.classList.add('nowrap')
                    description.classList.remove('show');
                    meta.classList.remove('show');
                    daysLeft.style.display = 'block'
                    updateObject(todo, currentObject);
                    toDoList.writeToLocalStorage(toDoList.list);
                };
                },{once: true, capture:true})
        }
    }

    return {toDoDOM, addToDOM, deleteToDo, unDeleteToDo, unCompleteToDo, completeToDo}
})();

const viewController = (() => {

const setHeader = (header) => {
    const currentTab= document.querySelector('.currentTab')
    const trash = document.getElementById('trash')
    const inbox = document.getElementById('inbox')
    const completed = document.getElementById('completed')

    switch(header){
        case toDoList:
            currentTab.innerHTML= `<img src=${inboxIcon}><h1>Inbox`
            document.getElementById('new').style.display = 'block'
            document.getElementById('new').innerHTML = 'Add to inbox'
            // document.getElementById('sort').innerHTML = 'Sort'

            
            inbox.setAttribute('ondragover', '')
            completed.setAttribute('ondragover', 'return false')
            trash.setAttribute('ondragover', 'return false')
            
            inbox.classList.remove('droppable');
            trash.classList.add('droppable');
            completed.classList.add('droppable');


            break
        case trashList:
            currentTab.innerHTML= `<img src=${trashIcon}><h1>Trash`
            document.getElementById('new').style.display = 'none'

            inbox.setAttribute('ondragover', 'return false')
            completed.setAttribute('ondragover', '')
            trash.setAttribute('ondragover', '')

            inbox.classList.add('droppable');
            trash.classList.remove('droppable');
            completed.classList.remove('droppable');

            break
        case completedList:
            currentTab.innerHTML= `<img src=${completedIcon}><h1>Completed`
            document.getElementById('new').style.display = 'none'
            
            inbox.setAttribute('ondragover', 'return false')
            completed.setAttribute('ondragover', '')
            trash.setAttribute('ondragover', '')  
            
            inbox.classList.add('droppable');
            trash.classList.remove('droppable');
            completed.classList.remove('droppable');

            break

        default:
            break
    }
}

const handleDrop = (() => {

    const trash = document.getElementById('trash')
    const inbox = document.getElementById('inbox')
    const completed = document.getElementById('completed')

    trash.addEventListener('drop', (e) => {
        const trashyObject = document.getElementById(e.dataTransfer.getData('text/plain'))
        toDoController.deleteToDo(toDoList.getObject(trashyObject), trashyObject)
    });

    inbox.addEventListener('drop', (e) => {
        const trashyObject = document.getElementById(e.dataTransfer.getData('text/plain'))

        if (trashList.getObject(trashyObject)){
            toDoController.unDeleteToDo(trashyObject);
        } else {
            toDoController.unCompleteToDo(trashyObject)
        }
    })

    completed.addEventListener('drop', (e) => {
        const trashyObject = document.getElementById(e.dataTransfer.getData('text/plain'))
        toDoController.completeToDo(toDoList.getObject(trashyObject), trashyObject)
    })

})();

const replaceSort = (listType) =>{
    const due = document.getElementById('sort-due')
    const created = document.getElementById('sort-created')


    due.addEventListener('click', ()=>{
        listType.sortList()
        // console.table(toDoList.list)
        listType.displayToDos(listType.list)
    });

    created.addEventListener('click', ()=>{
        listType.sortListCreated()
        console.table(listType.list)
        listType.displayToDos(listType.list)
    });
} 

document.getElementById('inbox').addEventListener('click', ()=> {
    toDoList.displayToDos(toDoList.list);
    setHeader(toDoList);
    replaceSort(toDoList);
})

document.getElementById('completed').addEventListener('click', ()=> {
    completedList.displayToDos(completedList.list)
    setHeader(completedList);
    replaceSort(completedList);
})

document.getElementById('trash').addEventListener('click', () => {
    trashList.displayToDos(trashList.list);
    setHeader(trashList);
    replaceSort(trashList);
})


const navListener = () => {
    const navItems = [...document.querySelectorAll('.sidebar ul div')]
   
    navItems.forEach((item) => {

        item.addEventListener('dragenter', () =>{
            if (item.classList.contains('droppable')){
                item.classList.add('drop')
            }
            item.addEventListener('dragleave', ()=>{
                item.classList.remove('drop')
            })
            item.addEventListener('mouseup', (e)=>{
                item.classList.remove('drop')
            })
            item.addEventListener('mouseleave', (e)=>{
                item.classList.remove('drop')
            });
        });
})};

return {setHeader, navListener, replaceSort}
})();

window.onload = () =>{
    viewController.setHeader(toDoList);
    viewController.navListener();
    viewController.replaceSort(toDoList)

    toDoList.loadToDos();
    toDoList.displayToDos(toDoList.list);
    trashList.loadToDos();
    completedList.loadToDos();
}

