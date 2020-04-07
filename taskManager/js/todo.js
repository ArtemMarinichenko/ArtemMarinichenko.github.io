// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  TASK MANAGER  /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let taskList    = document.querySelector('.task-list');
let wrap        = document.querySelector('.wrap-task');
let form        = document.querySelector('.add-task-block');
let newBoard    = document.getElementById('new');
let actualBoard = document.getElementById('actual');
let doneBoard   = document.getElementById('done');
let sumnew      = document.querySelector('.sumNew');
let sumact      = document.querySelector('.sumAct');
let sumdone     = document.querySelector('.sumDone');
let arrActualTask;

window.onload = function() {
    if(JSON.parse(localStorage.getItem("tasks")) == null) {
        return
    } else {
        let arrTasks = JSON.parse(localStorage.getItem("tasks"));
        let name = JSON.parse(localStorage.getItem("actualAccount")).userMail;
        
        arrActualTask = arrTasks.filter(elem => {   
           return elem.userMail === name;
        })
        
        
        arrActualTask.filter(item, index => {
            
        })

        newBoard.innerHTML = `<div>${arrActualTask[0].taskName}</div>`;
    }
}
console.log(arrActualTask)
setTimeout(()=>(console.log(arrActualTask)), 1000)


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputVal = document.querySelector('.taskInp').value;
    if(inputVal != '') {
        let todotask = document.createElement('div');
        todotask.classList.add('taskItem');
        todotask.setAttribute('draggable', 'true');
        const id = `f${(+new Date).toString(16)}`;
        todotask.setAttribute('id-task', id);                                
        todotask.addEventListener('dragstart', (event) => {
            todotask.id = 'todo';
        } )         
        todotask.innerHTML = `${inputVal}<button class="close"><span></span><span></span></button>`;
        taskList.appendChild(todotask); 
        wrap.addEventListener('dragover', (event) => {
            event.preventDefault();
        })            
        sum();

        let obj_tasks = {
            taskName: inputVal,
            boardName: "new",
            id: id,
            userMail: JSON.parse(localStorage.getItem("actualAccount")).userEmail
        }
        LocalStorage(obj_tasks, addTaskToLocalStorage);
        document.querySelector('.taskInp').value = '';
    }    
}) 

function LocalStorage(obj_tasks, fn, status) {
    let arrTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    fn(arrTasks, obj_tasks, status);
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function addTaskToLocalStorage(arr, obj) {
    arr.push(obj);
}

function removeTaskFromLocalStorage(arr, id) {
    arr.filter((item, index) => {
        if(item.id === id) {
           arr.splice(index, 1); 
        }
    })
    
}
function updeteTaskToLocalStorage(arr, id, status) {
    arr.filter((item, index) => {
        if(item.id === id) {
            item.boardName = status;
        }
    })
}

wrap.addEventListener('drop', (event) => {
    const draggableElement = document.getElementById("todo"); 
    if(event.target.closest('.task-list')) {        
        const dropzone = event.target.closest('.task-list');
        let statusChenge = dropzone.id;
        dropzone.appendChild(draggableElement);
        let id = draggableElement.getAttribute('id-task');
        LocalStorage(id, updeteTaskToLocalStorage, statusChenge);
        sum(); 
    }
    draggableElement.id = "";      
})

function sum() {
    sumnew.innerHTML = document.querySelectorAll("#new .taskItem").length;
    sumact.innerHTML = document.querySelectorAll("#actual .taskItem").length;
    sumdone.innerHTML = document.querySelectorAll("#done .taskItem").length;
}

wrap.addEventListener('click', (event) => {
    if(event.target.closest('.close')) {        
        let list = event.target.closest('.task-list');
        let todotask = event.target.closest(".taskItem");
        list.removeChild(todotask);
        let id = todotask.getAttribute('id-task');
        LocalStorage(id, removeTaskFromLocalStorage);
        sum();
    }
})


/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////  DRAG-N-DROP  //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


