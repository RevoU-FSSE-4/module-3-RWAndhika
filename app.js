// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// a universal variable taskId to keep track of the task-id so there are no task that has the same id after adding/removing
var taskId = 0;
// generate random task from api fetch from the start
var generateTask = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data, taskData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://module3-api-is2m.onrender.com/random-todos")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                taskData = {
                    data: data
                };
                if (taskData.data.length > 0) {
                    showTaskList(taskData.data);
                }
                return [2 /*return*/];
        }
    });
}); };
// function to add a new task
var addTask = function () {
    var newTask = document.getElementById("newTask");
    var taskList = document.getElementById("taskList");
    var isInput = newTask === null || newTask === void 0 ? void 0 : newTask.value.trim();
    if (isInput) {
        //  .insertAdjacentHTML is used to preserve the event listener 
        //  ref=> https://stackoverflow.com/questions/595808/is-it-possible-to-append-to-innerhtml-without-destroying-descendants-event-list
        taskList.insertAdjacentHTML("beforeend", "<li id='task-".concat(++taskId, "'>").concat(newTask.value, "</li>"));
        newTask.value = '';
        showWarning(isInput);
        addClickListener(taskId);
    }
    else {
        showWarning(isInput);
    }
};
// function to add an eventListener on click to the task
var addClickListener = function (index) {
    var onClickTaskGenerator = onClickTask(index);
    var clickedTask = document.getElementById("task-".concat(index));
    clickedTask.addEventListener("click", function () { return onClickTaskGenerator.next(); });
};
// generator function so the task can be clicked twice, first: after the task complete, second: remove the task
function onClickTask(index) {
    var clickedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clickedTask = document.getElementById("task-".concat(index));
                return [4 /*yield*/, clickedTask.classList.add("task-done")];
            case 1:
                _a.sent();
                clickedTask.remove();
                return [2 /*return*/];
        }
    });
}
// function to show the first generated task from api fetch
var showTaskList = function (taskData) {
    var taskList = document.getElementById("taskList");
    for (var i = 0; i < taskData.length; i++) {
        var task = taskData[i];
        taskId = i;
        taskList.insertAdjacentHTML("beforeend", "<li id='task-".concat(taskId, "'>").concat(task, "</li>"));
        addClickListener(i);
    }
};
// function to show warning text if there is no input
var showWarning = function (valid) {
    if (!valid) {
        warningText.innerHTML = 'Input a Task!';
    }
    else {
        warningText.innerHTML = '';
    }
};
// create a p tag to show warning text if there is no input
var warningText = document.createElement("p");
document.querySelector(".container").appendChild(warningText);
// add an event listener for input button
var taskButton = document.getElementById("addTaskBtn");
taskButton.addEventListener("click", addTask);
// call a function to generate random task for the first time
generateTask();
