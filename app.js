// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment

const getTask = async () => {
    const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
    const data = await response.json();

    taskData = data;
    // console.log('task data', taskData);

    if (taskData.length > 0) {
        const taskList = document.getElementById("taskList");
        let list = '';
        for (let i = 0; i < taskData.length; i++) {
            list = list + `<li id='list-${i}'>${taskData[i]}</li>`;
            // console.log(list);
        }
        taskList.innerHTML = list;
    }
};

let taskData = [];

getTask();