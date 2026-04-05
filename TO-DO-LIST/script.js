
checkLogin();

// DOM elements
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const taskDate = document.getElementById("taskDate");
const taskStatus = document.getElementById("taskStatus");

const taskList = document.getElementById("taskList");
const newTasks = document.getElementById("newTasks");
const pendingTasks = document.getElementById("pendingTasks");
const oldTasks = document.getElementById("oldTasks");

// Logged-in user
let username = localStorage.getItem("loggedInUser");

// Load tasks
let tasks = JSON.parse(localStorage.getItem(username + "_tasks")) || [];

displayTasks();


// ADD TASK
function addTask(){

let text = taskInput.value.trim();
let priority = priorityInput.value;
let date = taskDate.value;
let status = taskStatus.value;

if(text === "" || date === ""){
alert("Enter task and date");
return;
}

tasks.push({text, priority, date, status});

localStorage.setItem(username + "_tasks", JSON.stringify(tasks));

taskInput.value="";
taskDate.value="";

displayTasks();
}



// DISPLAY TASKS
function displayTasks(){

taskList.innerHTML="";
newTasks.innerHTML="";
pendingTasks.innerHTML="";
oldTasks.innerHTML="";

tasks.forEach((task,index)=>{

let taskText = `${task.text} (${task.priority}) - ${task.date}`;

/* View by date */
let taskItem = createTaskElement(taskText,index);
taskList.appendChild(taskItem);

/* Status containers */

let statusItem = createTaskElement(taskText,index);

if(task.status === "new"){
newTasks.appendChild(statusItem);
}
else if(task.status === "pending"){
pendingTasks.appendChild(statusItem);
}
else if(task.status === "old"){
oldTasks.appendChild(statusItem);
}

});

}



// CREATE TASK ELEMENT (Buttons outside box)
function createTaskElement(taskText,index){

let wrapper = document.createElement("div");
wrapper.className = "task-wrapper";

let li = document.createElement("li");
li.innerHTML = `<span>${taskText}</span>`;

/* Edit Button */
let editBtn = document.createElement("button");
editBtn.innerText = "Edit";
editBtn.className = "edit";

/* Delete Button */
let deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.className = "delete";

editBtn.onclick = function(){
editTask(index);
};

deleteBtn.onclick = function(){
deleteTask(index);
};

wrapper.appendChild(li);
wrapper.appendChild(editBtn);
wrapper.appendChild(deleteBtn);

return wrapper;

}



// DELETE TASK
function deleteTask(index){

tasks.splice(index,1);

localStorage.setItem(username + "_tasks", JSON.stringify(tasks));

displayTasks();

}



// EDIT TASK
function editTask(index){

let newText = prompt("Edit task", tasks[index].text);

if(newText !== null && newText.trim() !== ""){

tasks[index].text = newText;

localStorage.setItem(username + "_tasks", JSON.stringify(tasks));

displayTasks();

}

}



// FILTER BY DATE
function filterTasks(){

let selectedDate = document.getElementById("filterDate").value;

taskList.innerHTML="";

if(selectedDate === ""){
displayTasks();
return;
}

tasks.forEach((task,index)=>{

if(task.date === selectedDate){

let taskText = `${task.text} (${task.priority}) - ${task.date}`;

let li = createTaskElement(taskText,index);

taskList.appendChild(li);

}

});

}



// USER INFO
if(username){
document.getElementById("welcomeText").innerText = username;
}

let profile = localStorage.getItem("profilePic");

document.getElementById("profilePic").src =
profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

document.getElementById("reminder").innerText = "NS Task Reminder";



// CHECK LOGIN
function checkLogin(){

let user = localStorage.getItem("loggedInUser");

if(!user){
alert("Please login first");
window.location.href="login.html";
}

}

