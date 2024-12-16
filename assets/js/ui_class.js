export class UI {
  showBills(bills) {
    const tableBody = document.querySelector('.footer__table tbody');
    bills.forEach((spent, i) => {
      tableBody.innerHTML += `
        <tr class="d-flex fd-row">
        <th>${i + 1}</th>
        <td>${spent.name}</td>
        <td data-spent="value">$${spent.value}</td>
        <td class="d-none">
          <button type="button" data-action="edit" data-id="${spent.id}" ><span>Editar</span><img src="assets/img/edit.svg" alt="Editar" width="20"></button>
          <button type="button" data-action="delete" data-id="${spent.id}"><span>Eliminar</span><img src="assets/img/delete.svg" alt="Eliminar" width="20"></button>
        </td>`;
    })
  }
  clearBills() {
    const tableBody = document.querySelector('.footer__table tbody');
    tableBody.innerHTML = '';
  }
  showTableHead() {
    const tableHead = document.querySelector('.footer__table thead');
    tableHead.classList.remove('d-none');
  }
  hideTableHead() {
    const tableHead = document.querySelector('.footer__table thead');
    tableHead.classList.add('d-none');
  }
  showTotalBills(billsList) {
    const totalBills = document.querySelector('#total-spent');
    let total = 0;
    billsList.forEach(spent => total += Number(spent.value));
    totalBills.textContent = `$${total}`;
  }
  switchButtons() {
    const addBtn = document.querySelector('#btn-submit-spent');
    const updateBtn = document.querySelector('#btn-update-spent');
    addBtn.classList.toggle('d-none');
    updateBtn.classList.toggle('d-none');
  }
}
