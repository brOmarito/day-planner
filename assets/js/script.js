var hourList = document.querySelector('.hour-list');
var dateEl = document.querySelector('#currentDay');
var hourSlots = document.querySelectorAll('.hour-slot');

var todayDate = moment().format("[Today is] M[/]D[/]YYYY");
var scheduleObj = {
    "7":[],
    "8":[],
    "9":[],
    "10":[],
    "11":[],
    "12":[],
    "13":[],
    "14":[],
    "15":[],
    "16":[],
    "17":[],
    "18":[],
}

dateEl.textContent = todayDate;

var hr = moment().format('k');
formatHrSlots();
getLocalStorage();

var timer = setInterval(function(){
    var prevHr = hr;
    hr = moment().format('k');
    if (prevHr !== hr) {
        formatHrSlots();
    }
}, 1000);

function formatHrSlots() {
    var hrNum = parseInt(hr);
    hourSlots.forEach(element => {
        var id = parseInt(getElementHrNum(element));
        if (id < hrNum) {
            element.classList.add("past");
        } else if (id === hrNum) {
            element.classList.add("present");
        } else {
            element.classList.add("future");
        }
    });
}

function getLocalStorage() {
    var localSched = JSON.parse(localStorage.getItem("schedule"));
    if (localSched) {
        scheduleObj = localSched;
    }
    Object.keys(scheduleObj).forEach(key => {
        var taskList = scheduleObj[key];
        var taskListVar = document.querySelector("#task-list-" + key);
        taskList.forEach((task, index) => {
            taskListVar.appendChild(createTaskListItem(index, key, task));
        });
    });
}

function addTextToList() {
    var displayedInput = document.querySelector(".displayed-input");
    if (displayedInput.value.trim().length > 0) {
        var parentHrEl = document.querySelector("#group-item-" + getElementHrNum(displayedInput));
        var hrNum = getElementHrNum(parentHrEl);
        scheduleObj[hrNum].push(displayedInput.value);
        localStorage.setItem("schedule", JSON.stringify(scheduleObj));
        var taskList = parentHrEl.querySelector(".task-list");
        taskList.appendChild(createTaskListItem(scheduleObj[hrNum].length, hrNum, displayedInput.value));
        displayedInput.value = "";
        displayedInput.classList.remove("displayed-input");
        displayedInput.setAttribute("placeholder", "");
    } else {
        displayedInput.classList.remove("displayed-input");
    }
}

function getElementHrNum(element) {
    return element.id.split("-").at(-1);
}

function createTaskIcons(taskItemId) {
    var iconDiv = document.createElement("div");
    // iconDiv.innerHTML = '<i id="edit-icon-' + taskItemId + '" class="far fa-edit edit-icon"></i>'
    iconDiv.innerHTML += '<i id="delete-icon-' + taskItemId + '" class="fas fa-times delete-icon"></i>';
    iconDiv.classList.add("task-item-icon-container")
    return iconDiv;
}

function createTaskListItem(index, key, task) {
    var li = document.createElement("li");
    var id = "item-" + index + "-hr-" + key;
    li.id = id;
    li.classList.add("task-item");
    li.textContent = task;
    li.appendChild(createTaskIcons(id));
    return li;
}

function updateLocalSched(hrTaskList) {
    var taskArray = [];
    for(listItem of hrTaskList.children) {
        taskArray.push(listItem.textContent);
    };
    scheduleObj[getElementHrNum(hrTaskList)] = taskArray;
    localStorage.setItem("schedule", JSON.stringify(scheduleObj));
}

function removeTaskItem(element) {
    var targettedLi = document.querySelector(element.id.replace("delete-icon-", "#"));
    var taskListArea = document.querySelector("#task-list-" + getElementHrNum(targettedLi));
    taskListArea.removeChild(targettedLi);
    updateLocalSched(taskListArea);
}

// Future function for editing task items
// function editTaskItem(element) {
//     var targettedLi = document.querySelector(element.id.replace("edit-icon-", "#"));
//     // var taskListArea = document.querySelector("#task-list-" + getElementHrNum(targettedLi));
//     // taskListArea.removeChild(targettedLi);
//     var textArea = document.createElement("textarea");
//     textArea.value = targettedLi.textContent;
//     targettedLi.innerHTML = textArea;

//     updateLocalSched(taskListArea);
// }

function buttonActions(element, textAreaEl, inputArea) {
    if(element.id.includes("clear")) {
        var taskListEl = document.querySelector(element.id.replace("clear-", "#"));
        taskListEl.innerHTML = "";
        updateLocalSched(taskListEl);
        inputArea.classList.add("hidden");
    } else if(element.id.includes("save")) {
        var inputtedTask = textAreaEl.value.trim();
        if (inputtedTask.length === 0) {
            textAreaEl.value = "";
            textAreaEl.setAttribute("placeholder", "Please provide a value");
        } else {
            addTextToList();
        }
        inputArea.classList.add("hidden");
    } else {
        inputArea.classList.add("hidden");
        textAreaEl.value = "";
        textAreaEl.setAttribute("placeholder", "");
    }
}

hourList.addEventListener("click", function(event) {
    var element = event.target;
    var displayedInput = document.querySelector(".displayed-input");
    var inputArea = document.querySelector("#input-area-" + getElementHrNum(element));
    var textAreaEl = document.querySelector("#text-input-" + getElementHrNum(element));
    if (element.matches(".delete-icon")) {
        event.stopPropagation();
        removeTaskItem(element)
    } else if (element.matches(".btn")) {
        event.stopPropagation();
        buttonActions(element, textAreaEl, inputArea);
    } else if (displayedInput && element !== displayedInput) {
        inputArea.classList.add("hidden");
        addTextToList();
    } else {
        event.stopPropagation();
        textAreaEl.setAttribute("placeholder", "");
        inputArea.classList.remove("hidden");
        textAreaEl.classList.add("displayed-input");
    }
});

document.addEventListener("click", function(event) {
    var displayedInput = document.querySelector(".displayed-input");
    if (displayedInput) {
        var element = event.target;
        if (element !== displayedInput) {
            displayedInput.parentElement.classList.add("hidden");
            addTextToList();
        }
    }
});

hourList.addEventListener("keydown", function(event) {
    var element = event.target;
    if (element.matches(".task-input") && event.key === "Enter") {
        event.preventDefault();
        var inputArea = document.querySelector("#input-area-" + getElementHrNum(element));
        addTextToList();
        inputArea.classList.add("hidden");
        element.value = "";
    }
});