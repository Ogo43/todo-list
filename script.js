const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const recentTask = todoInput.value;

  if (recentTask === "") {
    alert("Please enter a task");
    return;
  }
  todoInput.value = "";
  addTask(recentTask);
});

const addTask = (task) => {
  const listItem = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  listItem.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  listItem.appendChild(editButton);

  todoList.appendChild(listItem);

  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem);
  });

  editButton.addEventListener("click", () => {
    toggleEditTaskState();
  });

  const toggleEditTaskState = () => {
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
      // Switch to view mode
      taskText.textContent = this.previousSibling.value;
      listItem.classList.removeChild("editing");
      editButton.textContent = "Edit";
    } else {
      //Switch to edit mode
      const input = document.createElement("Input");
      input.type = "text";
      input.value = taskText.textContent;
      listItem.insertBefore(input, taskText);
      listItem.removeChild(taskText);
      listItem.classList.add("editing");
      editButton.textContent = "Save";
    }
  };

  saveTasksToLocalStorage();
};

const saveTasksToLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((task) => {
    const taskText = task.querySelector("span").textContent;
    const isCompleted = task.classList.contains("completed");
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  savedTasks.forEach((task) => {
    addTask(task.text);
  });
});
