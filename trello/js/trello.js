
let addCol    = document.querySelector('.add-col');
let board     = document.querySelector('.trello-board');
let wrapper   = document.querySelector('.wrap-bg');
let del       = document.querySelector('.dell');
let modal     = document.querySelector('.basket'); 
let closeMode = document.querySelector('.close-mod');
let carpet    = document.querySelector('.carpet');
let deleteAll = document.querySelector('.delete-all');
let img       = document.querySelector('#image');

function createColumn() {
    let column = document.createElement('div');
    column.classList.add('column');
    column.setAttribute('draggable', 'true');
    column.setAttribute('id', Number(new Date()));
    column.innerHTML = `<div class="col-header">В плане</div>
                        <div class="task-group"></div>
                        <div class="add-task">+ Добавить задачу</div>`
    return column;
}

addCol.addEventListener('click', (event) => {
    board.appendChild(createColumn());
    toLocalStorage();
})

board.addEventListener('click', (event) => {
    if(event.target.closest('.add-task')) {
        let column    = event.target.closest('.column');
        let taskGroup = column.querySelector('.task-group');
        let task      = document.createElement('div');
        task.classList.add('task');
        task.setAttribute('draggable', 'true');
        task.setAttribute('id', Number(new Date()));
        taskGroup.appendChild(task);
        toLocalStorage();
    }
})

board.addEventListener('dblclick', (event) => {
    let colHeader = event.target.closest('.col-header');
    if(colHeader) {
        addDelAttr(colHeader);

    }   
    let edTask = event.target.closest('.task');
    if(edTask) {
        addDelAttr(edTask);
    }
})

function addDelAttr(el) {
    el.setAttribute('contenteditable', 'true');
    el.focus();
    el.addEventListener('blur', (event) => {
        el.removeAttribute('contenteditable');
        toLocalStorage();
    })
}

wrapper.addEventListener('dragstart', (event) => {
    let task = event.target.closest('.task');
    let col  = event.target.closest('.column');
    if(task) {
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.setData("Text", event.target.getAttribute('id'));
        task.classList.add('dragged');
        task.addEventListener('dragend', (event) => {
            task.classList.remove('dragged');
        })
    }
    if(col) {
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.setData("Text", event.target.getAttribute('id'));
        col.classList.add('dragged');
        col.addEventListener('dragend', (event) => {
            col.classList.remove('dragged');
        })
    }
    return true;
})

wrapper.addEventListener('dragenter', (event) => {
    event.preventDefault();
    event.stopPropagation();
    return true;
})
wrapper.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
    return true;
})
wrapper.addEventListener('dragleave', (event) => {
    event.preventDefault();
    event.stopPropagation();
})
wrapper.addEventListener('drop', (event) => {   
    let idTask = event.dataTransfer.getData("Text");
    let col    = event.target.closest('.column');
    let del    = event.target.closest('.dell');
    if(col) {
        let dropzone = col.querySelector('.task-group');
        let d        = document.getElementById(idTask);        
        let elemId   = event.target;
        if(event.target.parentElement === d.parentElement) {
            const note   = Array.from(event.target.parentElement.querySelectorAll('.task'));
            const indexA = note.indexOf(event.target);
            const indexB = note.indexOf(d);
            if(indexA < indexB) {
                event.target.parentElement.insertBefore(d, event.target);
            } else {
                event.target.parentElement.insertBefore(d, event.target.nextElementSibling);
            }
        } else  if(elemId.classList.contains("task")) {
            elemId.insertAdjacentElement('beforebegin', d);
        } else {
            dropzone.appendChild(d);
        }
        event.stopPropagation();
        toLocalStorage();
    }
    if(del) {
        let t     = document.getElementById(idTask);
        let modal = carpet.querySelector('.basket');  
        t.style.margin = '15px 20px 15px 0';      
        modal.appendChild(t);
        img.src = 'img/fill-basket.png';
        event.stopPropagation();
        toLocalStorage();
    }
})

del.addEventListener('dblclick', (event) => {
    modal.style.display = 'flex';
    carpet.style.opacity = '1';
    carpet.style.visibility = 'visible';
})

closeMode.addEventListener('click', (event) => {
    modal.style.display = 'none';
    carpet.style.opacity = '0';
    carpet.style.visibility = 'hidden';
})

deleteAll.addEventListener('click', (event) => {
    deleteAll.classList.add('anime'); 
    modal.innerHTML = ''; 
    img.src = 'img/basket.png';              
})

deleteAll.addEventListener('animationend', (event) => {
    if(event.target.closest('.delete-all')) {
        deleteAll.classList.remove('anime');
    }
})

modal.addEventListener('dblclick', (event) => {   
    let col  = event.target.closest('.column');
    let task = event.target.closest('.task');

    if(!task && col) {
        col.parentNode.removeChild(col);
        col.style.margin = '0 0 0 20px';
        board.appendChild(col);
        if(modal.innerHTML === '' ) {
            img.src = 'img/basket.png';
        }
        toLocalStorage();
        return;
    }

    if(task) {
        task.parentNode.removeChild(task);
        let column = board.querySelector('.column');
        if(column) {
            column.querySelector(".task-group").appendChild(task);
        } else {
            let column = createColumn();
            column.querySelector('.task-group').appendChild(task);
            board.appendChild(column);
        } 
        if(modal.innerHTML === '' ) {
            img.src = 'img/basket.png';
        }
        toLocalStorage();
        return;      
    }   
})

function toLocalStorage() {    
    let array = [];
    let allColumns = board.querySelectorAll('.column');
    allColumns.forEach(column => {
        let object = {};        
        object.colName = column.querySelector('.col-header').textContent;
        object.colId = column.getAttribute('id');
        let allTasks = column.querySelectorAll('.task');
        object.taskName = [];
        allTasks.forEach(task => {
            
            let obj = {};
                obj.name = task.textContent;
                obj.id   = task.getAttribute('id');
            object.taskName.push(obj);
        })
        array.push(object);
    });
    let LocalStorage = JSON.parse(localStorage.getItem("actualAccount"));   
    localStorage.setItem(LocalStorage.userEmail, JSON.stringify(array));
}

function fromLocalStorage() {
    let Storage = JSON.parse(localStorage.getItem("actualAccount"));
    let userStor = localStorage.getItem(Storage.userEmail);
    if(userStor) {
        userStor = JSON.parse(userStor);        
        for(let i = 0; i < userStor.length; i++) {
            board.innerHTML += `<div class="column" draggable="true" id="${userStor[i].colId}">
                                    <div class="col-header">${userStor[i].colName}</div>
                                    <div class="task-group">                           
                                        ${addTask(userStor[i].taskName)}
                                    </div>
                                    <div class="add-task">+ Добавить задачу</div>
                                </div>
                                `
        }
    } 
}

function addTask(arr) {
    return arr.map((obj)=>`<div class="task" draggable="true" id="${obj.id}">${obj.name}</div>`).join("");
}

fromLocalStorage();

