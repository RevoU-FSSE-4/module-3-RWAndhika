// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment

// a universal variable taskId to keep track of the task-id so there are no task that has the same id after adding/removing
let taskId = 0;

// generate random task from api fetch from the start
const generateTask = async () => {
    const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
    const data = await response.json();
    let taskData = data;

    if (taskData.length > 0) {
        showTaskList(taskData);
    }
};

// function to add a new task
const addTask = () => {
    const newTask = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const isInput = newTask.value.trim();

    if (isInput) {
        //  .insertAdjacentHTML is used to preserve the event listener 
        //  ref=> https://stackoverflow.com/questions/595808/is-it-possible-to-append-to-innerhtml-without-destroying-descendants-event-list
        taskList.insertAdjacentHTML("beforeend", `<li id='task-${++taskId}'>${newTask.value}</li>`);
        newTask.value = '';
        showWarning(isInput);
        addClickListener(taskId);
    } else {
        showWarning(isInput);
    }
};

// function to add an eventListener on click to the task
const addClickListener = (index) => {
    let onClickTaskGenerator = onClickTask(index);
    document.getElementById(`task-${index}`).addEventListener("click", () => onClickTaskGenerator.next());
};

// generator function so the task can be clicked twice, first: after the task complete, second: remove the task
function* onClickTask(index) {
    const clickedTask = document.getElementById(`task-${index}`);
    yield clickedTask.classList.add("task-done");
    
    clickedTask.remove();
}

// function to show the first generated task from api fetch
const showTaskList = (taskData) => {
    const taskList = document.getElementById("taskList");

    for (let i = 0; i < taskData.length; i++) {
        const task = taskData[i];
        taskId = i;
        taskList.insertAdjacentHTML("beforeend", `<li id='task-${taskId}'>${task}</li>`);
        addClickListener(i);
    }
};

// function to show warning text if there is no input
const showWarning = (valid) => {
    if (!valid) {
        warningText.innerHTML = 'Input a Task!';
    } else {
        warningText.innerHTML = '';
    }
}

// create a p tag to show warning text if there is no input
const warningText = document.createElement("p");
document.querySelector(".container").appendChild(warningText);

// add an event listener for input button
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// call a function to generate random task for the first time
generateTask();