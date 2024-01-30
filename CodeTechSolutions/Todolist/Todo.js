 
    let addTodo=document.getElementById("addTodo");

    let saveButton=document.getElementById("saveButton");

    addTodo.onclick=function(){
        onTodoAdd()
    }





saveButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(listObj));
}
function getTodoListFromLocalStrorage(){
    let strigfieldTodoList=localStorage.getItem("todoList");
    let parseTodoList=JSON.parse(strigfieldTodoList);

    if (parseTodoList===null){
        return[]
    }
    else{
        return parseTodoList;
    }
}
let listObj=getTodoListFromLocalStrorage()

function onTodoAdd(){
    let todoLength=listObj.length;
    todoLength=todoLength+1;
    let inputTodo=document.getElementById("inputTodo");
    inputValue=inputTodo.value;

    let newTodo={
        text:inputValue,
        uniqueId:todoLength,
        isChecked:false
    }

    if(inputValue===""){
        alert("Enter todo");
        return;
    }
     listObj.push(newTodo);
    createAndAppend(newTodo);
    inputTodo.value="";

    

}
function onTodoStatusChange(checkId,labeId,todoId){
    let checkBoxElement=document.getElementById(checkId);
    let checkStatus=checkBoxElement.checked;

    let labelStatus=document.getElementById(labeId)

   
    labelStatus.classList.toggle("checked")

    let todoObjIndex=listObj.findIndex(function(eachItem){
        let eachTodoId="todo"+eachItem.uniqueId;
        if(eachTodoId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=listObj[todoObjIndex]
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}

function onDelete(todoId){
    let todo=document.getElementById(todoId);
    let todoUnor=document.getElementById("todoUnorderList");
    todoUnor.removeChild(todo);

    let deleteIndex=listObj.findIndex(function(eachTodo){
            let eachTodoId= "todo"+eachTodo.uniqueId;
            if(eachTodoId===todoId){
                return true
            }
            else{
                return false
            }
    });
    listObj.splice(deleteIndex,1)
}
   function createAndAppend(todo){
    let todoLists=document.getElementById("todoLists")

let todoUn=document.getElementById("todoUnorderList");

let checkId="checkbox"+todo.uniqueId;

let labeId="label"+todo.uniqueId;

let todoId="todo"+todo.uniqueId

let list=document.createElement("li");
list.classList.add("todolist");
list.id=todoId

let input=document.createElement("input");
input.id=checkId
input.type="checkbox";
input.classList.add("input");
input.checked=todo.isChecked;
list.appendChild(input);

input.onclick=function(){
    onTodoStatusChange(checkId,labeId,todoId);
}

let labelList=document.createElement("div");
labelList.classList.add("labelList")

let label=document.createElement("label");
label.setAttribute("for",checkId);
label.id=labeId;
label.textContent=todo.text;
if(todo.isChecked===true){
    label.classList.add("checked")
}
labelList.appendChild(label);


let delete_div=document.createElement("div");
delete_div.classList.add("deleteIcon");

let deleteIcon=document.createElement("i");
deleteIcon.classList.add("fa-solid","fa-trash-can","deleteIcon");

deleteIcon.onclick=function(){
    onDelete(todoId)
}

delete_div.appendChild(deleteIcon);

labelList.appendChild(delete_div);

list.appendChild(labelList);

todoUn.appendChild(list);

todoLists.appendChild(todoUn);

   }

   for(let todo of listObj){
    createAndAppend(todo);
   }