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

function addTextToList() {
    var displayedInput = document.querySelector(".displayed-input");
    var trimmed = displayedInput.value.trim();
    if (displayedInput.value.trim().length > 0) {
        var parentHrEl = document.querySelector("#group-item-" + getElementHrNum(displayedInput));
        var hrNum = getElementHrNum(parentHrEl);
        scheduleObj[hrNum].push(displayedInput.value);
        localStorage.setItem("schedule", JSON.stringify(scheduleObj));
        var taskList = parentHrEl.querySelector(".task-list");
        var taskItem = document.createElement("li");
        taskItem.id = "item-" + scheduleObj[hrNum].length + "-hr-" + hrNum;
        taskItem.textContent = displayedInput.value;
        taskList.appendChild(taskItem);
        displayedInput.value = "";
        displayedInput.classList.remove("displayed-input");
    } else {
        displayedInput.classList.remove("displayed-input");
    }
}

function getElementHrNum(element) {
    return element.id.split("-").at(-1);
}

hourList.addEventListener("click", function(event) {
    var element = event.target;
    var displayedInput = document.querySelector(".displayed-input");
    if (displayedInput && element !== displayedInput) {
        // displayedInput.classList.add("hidden");
        var inputArea = element.querySelector("#input-area-" + getElementHrNum(element));
        inputArea.classList.add("hidden");
        addTextToList();
    } else {
        event.stopPropagation();
        var textId = "#text-input-" + getElementHrNum(element);
        var textAreaEl = document.querySelector(textId);
        // textAreaEl.classList.remove("hidden");
        var inputArea = element.querySelector("#input-area-" + getElementHrNum(element));
        inputArea.classList.remove("hidden");
        textAreaEl.classList.add("displayed-input");
    }
});

document.addEventListener("click", function(event) {
    var displayedInput = document.querySelector(".displayed-input");
    if (displayedInput) {
        var element = event.target;
        if (element !== displayedInput) {
            // displayedInput.classList.add("hidden");
            displayedInput.parentElement.classList.add("hidden");
            addTextToList();
        }
    }
});

hourList.addEventListener("keydown", function(event) {
    var element = event.target;
    if (element.matches(".task-input") && event.key === "Enter") {
        addTextToList();
    }
});