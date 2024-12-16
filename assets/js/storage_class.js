export class Storage {
  getStorage(key) {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return null;
    }
    return item;
  }
  setStorage(key, value) {
    switch (key) {
      case 'id':
        window.localStorage.setItem(key, value);
        break;
      case 'bills':
        const bills = (this.getStorage(key) === null) ? [] : [...JSON.parse(this.getStorage(key))];
        bills.push(value);
        window.localStorage.setItem(key, JSON.stringify(bills));
    }
  }
  updateSpent(key, id, newName, newValue) {
    const bills = [...JSON.parse(this.getStorage(key))];
    bills.forEach(spent => {
      if (spent.id === id) {
        spent.name = newName;
        spent.value = newValue;
      }
    })
    window.localStorage.setItem(key, JSON.stringify(bills));
  }
  removeSpent(key, id) {
    const bills = [...JSON.parse(this.getStorage(key))];
    const filterBills = bills.filter(spent => spent.id != id);
    window.localStorage.setItem(key, JSON.stringify(filterBills));
  }
}