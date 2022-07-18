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

    return {add, list}
})();

const toDoController = (()=>{


    const displayToDo = (todo) => {
        const toDoDOM = `
        <div class="done"><input type="checkbox"></div>
        <div class="title"><p>${todo.title}</div>
        <div class="description"><p>${todo.description}</div>
        <div class="meta">
            <div class="duedate"><p>${todo.dueDate}</div>
            <div class="priority"><p>${todo.priority}</div>
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
        handleUserClick(content);
    }

    const interactionTracker = () =>{
        first = true
    }

    const handleUserClick = (content) => {
        content.addEventListener('click', (e) => {

            const todo = e.currentTarget

            if (e.target.classList.contains('done')||e.target.type=='checkbox'){return}

            expandToDo(todo);
        
            todo.addEventListener('click', (e)=>{
                console.log(e.target)
                 e.target.focus()
            })
   
           collapseToDo(todo);
           handleUserClick(todo)

            
        },{once:true});
    }

    const expandToDo = (todo) => {
        const title = todo.querySelector('.title')
        const description = todo.querySelector('.description')
        const meta = todo.querySelector('.meta')

        description.classList.add('show');
        meta.classList.add('show');

        title.setAttribute('contenteditable', 'true');
        title.focus()
        description.setAttribute('contenteditable', 'true');
        
    }

    const collapseToDo = (todo) =>{
        const title = todo.querySelector('.title')
        const description = todo.querySelector('.description')
        const meta = todo.querySelector('.meta')

        if (description.classList.contains('show')){
            window.addEventListener('click', (e2) => {
                if (e2.target.parentNode !== todo || e2.target.parentNode.parentNode !== todo){ 
                    description.classList.remove('show');
                    meta.classList.remove('show');
                    title.setAttribute('contenteditable', 'false');
                    description.setAttribute('contenteditable', 'false');
                    };
                },{ capture:true})
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