// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment

// a universal variable taskId to keep track of the task-id so there are no task that has the same id after adding/removing
interface TaskList {
    data: string[];
    count: number;
}

type Id = number;

let taskId: Id = 0;

// generate random task from api fetch from the start
const generateTask = async (): Promise<void> => {
    const response: Response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
    const data: string[] = await response.json();
    let myTask: TaskList = {
        data: data,
        count: data.length
    }

    if (myTask.count > 0) {
        showTaskList(myTask);
    }
};

// function to add a new task
const addTask = (): void => {
    const newTask = document.getElementById("newTask") as HTMLInputElement;
    const taskList = document.getElementById("taskList") as HTMLElement;
    const isInput: string = newTask?.value.trim();

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
const addClickListener = (index: number): void => {
    let onClickTaskGenerator: Generator<void> = onClickTask(index);
    const clickedTask = document.getElementById(`task-${index}`) as HTMLElement;
    clickedTask.addEventListener("click", () => onClickTaskGenerator.next());
};

// generator function so the task can be clicked twice, first: after the task complete, second: remove the task
function* onClickTask(index: number): Generator<void> {
    const clickedTask = document.getElementById(`task-${index}`) as HTMLElement;
    yield clickedTask.classList.add("task-done");
    
    clickedTask.remove();
}

// function to show the first generated task from api fetch
const showTaskList = (myTask: TaskList): void => {
    const taskList = document.getElementById("taskList") as HTMLElement;

    for (let i: number = 0; i < myTask.count; i++) {
        const task: string = myTask.data[i];
        taskId = i;
        taskList.insertAdjacentHTML("beforeend", `<li id='task-${taskId}'>${task}</li>`);
        addClickListener(i);
    }
};

// function to show warning text if there is no input
const showWarning = (valid: string): void => {
    if (!valid) {
        warningText.innerHTML = 'Input a Task!';
    } else {
        warningText.innerHTML = '';
    }
}

// create a p tag to show warning text if there is no input
const warningText = document.createElement("p") as HTMLParagraphElement;
document.querySelector(".container").appendChild(warningText);

// add an event listener for input button
const taskButton = document.getElementById("addTaskBtn") as HTMLInputElement;
taskButton.addEventListener("click", addTask);

// call a function to generate random task for the first time
generateTask();