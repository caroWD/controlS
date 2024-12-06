const hasValue = (value) => value ? true : false;

const showRequired = (item) => item.classList.add('required');

const hideRequired = (item) => item.classList.remove('required');

const inputsValidate = (name, value) => {
  if (hasValue(name) === false && hasValue(value) === false) {
    return 0;
  } else if (hasValue(name) && hasValue(value) === false) {
    return 1;
  } else if (hasValue(name) === false && hasValue(value)) {
    return 2;
  } else {
    return 3;
  }
}

const getData = (name, value) => new Map([['name', name],['value', Number(value)]]);

const resetInputs = (name, value) => {
  name.value = '';
  value.value = '';
}

const removeElement = (domElement) => {
  domElement.classList.remove('d-block');
  domElement.classList.add('d-none')
}

const showElement = (domElement) => {
  domElement.classList.remove('d-none')
  domElement.classList.add('d-block');
}

const showTableRowsGroup = () => {
  showElement(tableHead);
  showElement(tableBody);
}
const removeTableRowsGroup = () => {
  removeElement(tableHead);
  removeElement(tableBody);
}

const showBills = (list) => {
  clearBills();
  list.forEach((spent, i, list) => {
    tableBody.innerHTML += `
      <tr class="d-flex fd-row">
        <th>${i + 1}</th>
        <td>${spent.get('name')}</td>
        <td>$${spent.get('value')}</td>
        <td class="d-none">
          <button type="button" onclick="editSpent(${i})"><span>Editar</span><img src="assets/img/edit.svg" alt="Editar" width="20"></button>
          <button type="button" onclick="deleteSpent(${i})"><span>Eliminar</span><img src="assets/img/delete.svg" alt="Eliminar" width="20"></button>
        </td>`;
  });
}

const addBills = (list) => {
  let addition = 0;
  list.forEach((value) => addition += Number(value.get('value')));
  return addition;
}

const showTotal = (total) => {
  const totalSpent = document.getElementById('total-spent');
  totalSpent.textContent = `$${total}`;
}

const deleteSpent = (index) => {
  billsList.splice(index, 1);
  showBills(billsList);
  const addTotal = addBills(billsList);
  showTotal(addTotal);
  if (billsList.length === 0) {
    removeTableRowsGroup();
  }
}

const editSpent = (index) => {
  const spentName = document.getElementById('spent-name');
  const spentValue = document.getElementById('spent-value');
  spentName.value = billsList[index].get('name');
  spentValue.value = billsList[index].get('value');
  spentName.dataset.id = index;
  spentValue.dataset.id = index;
  removeElement(btnSubmitSpent);
  showElement(btnUpdateSpent);
}

const clearBills = () => tableBody.innerHTML = '';

const billsList = [];

const btnSubmitSpent = document.getElementById('btn-submit-spent');
const btnUpdateSpent = document.getElementById('btn-update-spent');
const tableHead = document.querySelector('.footer__table thead');
const tableBody = document.querySelector('.footer__table tbody');

btnSubmitSpent.addEventListener('click', (e) => {
  const spentName = document.getElementById('spent-name');
  const spentValue = document.getElementById('spent-value');
  let validate = inputsValidate(spentName.value, spentValue.value);
  switch (validate) {
    case 0:
      showRequired(spentName);
      showRequired(spentValue);
      break;
    case 1:
      hideRequired(spentName);
      showRequired(spentValue);
      break;
    case 2:
      hideRequired(spentValue);
      showRequired(spentName);
      break;
    case 3:
      billsList.push(getData(spentName.value, spentValue.value));
      hideRequired(spentName);
      hideRequired(spentValue);
      resetInputs(spentName, spentValue);
      showTableRowsGroup();
      showBills(billsList);
      const addTotal = addBills(billsList);
      showTotal(addTotal);
  }
});

btnUpdateSpent.addEventListener('click', (e) => {
  const spentName = document.getElementById('spent-name');
  const spentValue = document.getElementById('spent-value');
  index = Number(spentName.dataset.id);
  billsList[index].set('name', spentName.value);
  billsList[index].set('value', spentValue.value);
  resetInputs(spentName, spentValue);
  showBills(billsList);
  const addTotal = addBills(billsList);
  showTotal(addTotal);
  removeElement(btnUpdateSpent);
  showElement(btnSubmitSpent);
})