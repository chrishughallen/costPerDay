// The point of the app is to provide the user with a cost per day of living analysis.
// The user should be able to input amounts for fixed monthly expenses.
// A function should take the sum of all the expenses and calculate a amt/perday
// The cost per day should live update as the user is inputting expenses.

const addExpenseBtn = document.querySelector('.js-add-input')
const form = document.querySelector('.js-form')
const cpd = document.querySelector('.js-cost-per-day')
addExpenseBtn.addEventListener('click', renderNewFormField)

// This is what happens when someone saves a new input
function update (e) {
  const value = document.querySelector('.form__input').firstChild.value
  renderNewAmountLine(value)
  hideBtn(e)
  hideInput(e)
  renderNewCostPerDay(calculateMonthlyTotal())
}

function renderNewCostPerDay (monthlyTotal) {
  cpd.innerText = calculateCostPerDay(monthlyTotal)
}

function calculateCostPerDay (total) {
  return total / 30
}

function calculateMonthlyTotal() {
  let total = 0
  const fields = Array.from(document.querySelectorAll('.form__amountLine'))
  fields.forEach(function (field) {
    total += parseFloat(field.innerText)
  })
  return total
}

// These functions render new elements and append them accordingly

function newAmountLine (value) {
  const amountLine = document.createElement('div')
  amountLine.classList.add('form__amountLine')
  amountLine.innerHTML = value
  return amountLine
}

function renderNewAmountLine (value) {
  const amountLine = newAmountLine(value)
  form.appendChild(amountLine)
  toggleNewExpenseBtn(false)
}

function renderNewFormField () {
  toggleNewExpenseBtn(true)
  const field = newField()
  form.appendChild(field)
}

function newInput() {
  const input = document.createElement('div')
  input.classList.add('form__input')
  input.innerHTML = '<input type="number" class="input__number"></input>'
  return input
}

function newSubmit () {
  const btn = document.createElement('button')
  btn.addEventListener('click', update)
  btn.classList.add('form__submit')
  btn.innerHTML = "add"
  return btn
}

function newField () {
  const div = document.createElement('div')
  div.classList.add('form__field')
  div.appendChild(newInput())
  div.appendChild(newSubmit())
  return div
}

function hideBtn(e) {
  e.currentTarget.classList.add('form__submit--hide')
}

function hideInput() {
  const currentInput = document.querySelector('.form__input')
  currentInput.parentNode.removeChild(currentInput);
}

function toggleNewExpenseBtn(val) {
  val ? addExpenseBtn.classList.add('form__newExpense--hide') : addExpenseBtn.classList.remove('form__newExpense--hide')
}
