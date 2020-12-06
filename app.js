// The point of the app is to provide the user with a cost per day of living analysis.
// The user should be able to input amounts for fixed monthly expenses.
// A function should take the sum of all the expenses and calculate a amt/perday
// The cost per day should live update as the user is inputting expenses.

// instead of rendering a new button just swap the text and class/action of the submit btn.

// When the user clicks 'add a new expense'
// - The expense name input field should appear *
// - The epense amount input field should appear *
// - The 'add a new expense' btn text should say 'save' *
// - A 'cancel button should appear' *

// When the user clicks 'save'
// - The textInput should disappear *
// - The number input should disappear *
// - The textInput should be replaced by the value of the textInput
// - The numberInput should be replaced by the value of the numberInput *
// - There should be a third column item that show that specific item / 30 - cost per day.
// - The 'save' btn should now say 'add' - and should allow use to add another expense *
// - The Cost per day at the top should update *
// - If the user is missing data, dont do anything *

// When the user clicks 'Cancel',
// - the form should be destoryed
// - the submit button should say 'add'
// - the cancel button should hide.

const submitBtn = document.querySelector('.js-submit')
const cancelBtn = document.querySelector('.js-cancel')
const form = document.querySelector('.js-form')
const cpd = document.querySelector('.js-cost-per-day')
submitBtn.addEventListener('click', handleSubmit)
cancelBtn.addEventListener('click', handleCancel)

function handleSubmit (e) {
  if (e.currentTarget.innerHTML == "add") {
    acceptNewInput()
  } else {
    saveNewInput()
  }
}

function handleCancel () {
  destroyTextInput()
  destroyNumberInput()
  updateSubmitBtn('save')
  showCancelBtn(false)
}

function acceptNewInput () {
  renderFormField()
  updateSubmitBtn('add')
  showCancelBtn(true)
}

function saveNewInput () {
  const name = document.querySelector('.form__textInput').value
  const amount = document.querySelector('.form__numberInput').value
  if (name == "" || amount == "") {
    return
  }
  renderSavedInput(name, amount)
  destroyTextInput()
  destroyNumberInput()
  updateSubmitBtn('save')
  showCancelBtn(false)
  updateCostPerDay(calculateTotalExpenses())
}

function updateSubmitBtn (action) {
  if (action == 'add') {
    submitBtn.innerHTML = 'save'
  } else {
    submitBtn.innerHTML = 'add'
  }
}
function showCancelBtn (bool) {
  if (bool) {
    cancelBtn.classList.add('cancelBtn--show')
  } else {
    cancelBtn.classList.remove('cancelBtn--show')
  }
}

function updateCostPerDay (monthlyTotal) {
  let costPerDay = monthlyTotal / 30
  cpd.innerHTML = costPerDay.toFixed(2)
}


function newTextLine (name) {
  const text = document.createElement("div")
  text.innerHTML = name
  return text
}

function newAmountLine (value) {
  const amount = document.createElement("div")
  amount.innerHTML = value
  amount.className = "js-expense-value"
  return amount
}

function renderSavedInput (name, amount) {
  const userInput = document.createElement("div")
  userInput.className = "form__expenseLine"
  userInput.appendChild(newTextLine(name))
  userInput.appendChild(newAmountLine(amount))
  form.appendChild(userInput)
}

function destroyTextInput () {
  let textInput = document.querySelector('.form__textInput')
  textInput.parentNode.removeChild(textInput)
}
function destroyNumberInput () {
  let numberInput = document.querySelector('.form__numberInput')
  numberInput.parentNode.removeChild(numberInput)
}

function newTextInput () {
  const input = document.createElement('input')
  input.type = "text"
  input.className = "form__textInput"
  input.placeholder = "name"
  return input
}
function newNumberInput () {
  const input = document.createElement('input')
  input.type = "number"
  input.className = "form__numberInput"
  input.placeholder = "amount"
  return input
}
function renderFormField () {
  const formField = document.createElement('div')
  formField.appendChild(newTextInput())
  formField.appendChild(newNumberInput())
  form.appendChild(formField)
}

function calculateTotalExpenses () {
  const expenses = Array.from(document.querySelectorAll('.js-expense-value'))
  let total = 0
  expenses.forEach(function(expense) {
    total += parseFloat(expense.textContent)
  })
  return total
}
