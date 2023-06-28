
// State of the app
const todos = ["Walk the dog", "Water the plants", "Sand the chairs"]

// HTML element references
const addTodoInput = document.getElementById("todo-input")
const addTodoButton = document.getElementById("add-todo-btn")
const todosList = document.getElementById("todos-list")

// Initialize the view
for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener("input", () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener("keydown", ({ key }) => {
    if (key === "Enter" && addTodoInput.value.length >= 3) {
        addTodo()
    }
})


// Functions
function renderTodoInReadMode(todo) {
    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = todo
    span.addEventListener("dblclick", () => {
        const idx = todos.indexOf(todo)

        todosList.replaceChild(
            renderTodoInEditMode(todo),
            todosList.childNodes[idx]
        )
    })
    li.append(span)

    const button = document.createElement("button")
    button.textContent = "Done"
    button.addEventListener("click", () => {
        const idx = todos.indexOf(todo)
        removeTodo(idx)
    })
    li.append(button)

    return li
}

function renderTodoInEditMode(todo) {
    const li = document.createElement("li")

    const input = document.createElement("input")
    input.type = "text"
    input.value = todo
    li.append(input)

    const saveButton = document.createElement("button")
    button.textContent = "Save"
    button.addEventListener("click", () => {
        const idx = todos.indexOf(todo)
        updateTodo(idx, input.value)
    })
    li.append(saveButton)

    const cancelButton = document.createElement("button")
    button.textContent = "Cancel"
    button.addEventListener("click", () => {
        const idx = todos.indexOf(todo)
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[idx]
        )
    })
    li.append(cancelButton)

    return li
}

function removeTodo(index) {
    todos.splice(index, 1)
    todosList.childNodes[index].remove()
}

function addTodo() {
    const description = addTodoInput.value

    todos.push(description)
    const todo = renderTodoInReadMode(description)
    todosList.append(todo)

    addTodoInput.value = ""
    addTodoButton.disabled = true
}

function updateTodo(index, description) {
    todos[index] = description
    const todo = renderTodoInReadMode(description)
    todosList.replaceChild(todo, todosList.childNodes[index])
}
