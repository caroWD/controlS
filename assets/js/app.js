import { Spent } from "./spent_class.js";
import { UI } from "./ui_class.js";
import { Storage } from "./storage_class.js";

const spent = new Spent();
const ui = new UI();
const storage = new Storage();

let startID = (storage.getStorage('id') === null) ? 0 : storage.getStorage('id');

if (JSON.parse(storage.getStorage('bills')).length !== 0) {
  ui.clearBills();
  ui.showTableHead();
  ui.showBills(JSON.parse(storage.getStorage('bills')));
  ui.showTotalBills(JSON.parse(storage.getStorage('bills')));
}

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
  storage.removeSpent('bills', id);
  ui.clearBills();
  ui.showBills(JSON.parse(storage.getStorage('bills')));
  ui.showTotalBills(JSON.parse(storage.getStorage('bills')));
  if (JSON.parse(storage.getStorage('bills')).length === 0) {
    ui.hideTableHead();
  }
}

const editSpent = (id) => {
  const spentName = document.getElementById('spent-name');
  const spentValue = document.getElementById('spent-value');
  const bills = [...JSON.parse(storage.getStorage('bills'))];
  bills.forEach(spent => {
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
    storage.setStorage('bills', spent.getSpent());
    storage.setStorage('id', startID);
    ui.clearBills();
    ui.showTableHead();
    ui.showBills(JSON.parse(storage.getStorage('bills')));
    ui.showTotalBills(JSON.parse(storage.getStorage('bills')));
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
    const id = Number(document.querySelector('#spent-name').dataset.id);
    storage.updateSpent('bills', id, nameSpent, valueSpent);
    ui.clearBills();
    ui.showBills(JSON.parse(storage.getStorage('bills')));
    ui.showTotalBills(JSON.parse(storage.getStorage('bills')));
    ui.switchButtons();
    e.target.parentElement.reset();
  }
})