// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment

const getTask = async () => {
    const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
    const data = await response.json();
    taskData = data;

    if (taskData.length > 0) {
        generateTaskList();
    }
};

const addTask = () => {
    const newTask = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");

    //  .insertAdjacentHTML is used to preserve the event listener 
    //  ref=> https://stackoverflow.com/questions/595808/is-it-possible-to-append-to-innerhtml-without-destroying-descendants-event-list
    taskList.insertAdjacentHTML("beforeend", `<li id='list-${++taskId}'>${newTask.value}</li>`);
    addClickListener(taskId);
}

const addClickListener = (index) => {
    let onClickTaskGenerator = onClickTask(index);
    document.getElementById(`list-${index}`).addEventListener("click", () => onClickTaskGenerator.next());
}

function* onClickTask(index) {
    const clickedTask = document.getElementById(`list-${index}`);
    console.log("clicked");
    yield clickedTask.classList.add("task-done");
    
    clickedTask.remove();
}

const generateTaskList = () => {
    const taskList = document.getElementById("taskList");

    for (let i = 0; i < taskData.length; i++) {
        const task = taskData[i];
        taskId = i;
        taskList.insertAdjacentHTML("beforeend", `<li id='list-${taskId}'>${task}</li>`);
        addClickListener(i)
    }
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);

let taskData = [];
let taskId = 0;
getTask();