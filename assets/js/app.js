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

const showTableRowsGroup = () => {
  tableHead.classList.remove('d-none');
  tableHead.classList.add('d-block');
  tableBody.classList.remove('d-none');
  tableBody.classList.add('d-block');
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
          <button type="button" id="btn-edit-spent"><span>Editar</span><img src="assets/img/edit.svg" alt="Editar" width="20"></button>
          <button type="button" id="btn-delete-spent"><span>Eliminar</span><img src="assets/img/delete.svg" alt="Eliminar" width="20"></button>
        </td>`;
  });
}

const clearBills = () => tableBody.innerHTML = '';

const billsList = [];

const btnSubmitSpent = document.getElementById('btn-submit-spent');
const tableHead = document.querySelector('.footer__table thead');
const tableBody = document.querySelector('.footer__table tbody');

btnSubmitSpent.addEventListener('click', () => {
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
  }
});