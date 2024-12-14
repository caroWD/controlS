import { Spent } from "./spent_class.js";
import { UI } from "./ui_class.js";

const spent = new Spent();
const ui = new UI();

let startID = 0;
const autoincrementID = () => ++startID;

const hasValue = (input) => input ? true : false;

const actionChoise = (choise, target) => {
  switch (choise) {
    case 'edit':
      editSpent(Number(target.dataset.id));
      break;
    case 'delete':
      deleteSpent(Number(target.dataset.id));
      break;
  }
}

const deleteSpent = (id) => {
  spent.filterBills(id);
  ui.clearBills();
  ui.showBills(spent.updateBills());
  ui.showTotalBills(spent.getSpentValues());
  if (spent.updateBills().length === 0) {
    ui.hideTableHead();
  }
}

const editSpent = (id) => {
  const spentName = document.getElementById('spent-name');
  const spentValue = document.getElementById('spent-value');
  const billsList = spent.updateBills();
  billsList.forEach(spent => {
    if (spent.id === id) {
      spentName.value = spent.name;
      spentValue.value = spent.value;
      spentName.dataset.id = spent.id;
    }
  })
  ui.switchButtons();
}

// Events Listeners

document.querySelector('#spent-form').addEventListener('submit', (e) => {
  e.preventDefault();
})

document.querySelector('#btn-submit-spent').addEventListener('click', (e) => {
  e.preventDefault();
  const nameSpent = document.querySelector('#spent-name').value;
  const valueSpent = document.querySelector('#spent-value').value;
  if (hasValue(nameSpent) && hasValue(valueSpent)) {
    spent.id = autoincrementID(startID);
    spent.name = nameSpent;
    spent.value = valueSpent;
    e.target.parentElement.reset();
    ui.clearBills();
    ui.showTableHead();
    ui.showBills(spent.getBills());
    ui.showTotalBills(spent.getSpentValues());
  }
})

document.querySelector('.footer__table tbody').addEventListener('click', (e) => {
  const target = e.target;
  if (target.dataset.action) {
    actionChoise(target.dataset.action, target)
  } else if (target.parentElement.dataset.action) {
    actionChoise(target.parentElement.dataset.action, target.parentElement)
  }
})

document.querySelector('#btn-update-spent').addEventListener('click', (e) => {
  e.preventDefault();
  const nameSpent = document.querySelector('#spent-name').value;
  const valueSpent = document.querySelector('#spent-value').value;
  if (hasValue(nameSpent) && hasValue(valueSpent)) {
    const dataID = Number(document.querySelector('#spent-name').dataset.id);
    const billsList = spent.updateBills();
    billsList.forEach(spent => {
      if (spent.id === dataID) {
        spent.name = nameSpent;
        spent.value = valueSpent;
      }
    })
    spent.replaceBills(billsList);
    ui.clearBills();
    ui.showBills(spent.updateBills());
    ui.showTotalBills(spent.getSpentValues());
    ui.switchButtons();
    e.target.parentElement.reset();
  }
})