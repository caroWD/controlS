const getDate = () => {
  const date = new Date();
  return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
}

let bills = [];

let listSpentValue = [];

export class Spent {
  #id;
  #name;
  #value;
  #date;
  constructor(id, name, value) {
    this.#id = id;
    this.#name = name;
    this.#value = value;
    this.#date = getDate();
  }
  get id() {
    return this.#id;
  }
  set id(newID) {
    this.#id = newID;
  }
  get name() {
    return this.#name;
  }
  set name(newName) {
    this.#name = newName;
  }
  get value() { 
    return this.#value;
  }
  set value(newValue) {
    this.#value = newValue;
  }
  get date() {
    return this.#date;
  }
  set date(newDate) {
    this.#date = newDate;
  }
  getBills() {
    bills.push({id: this.#id, name: this.#name, value: this.#value, date: this.#date});
    return bills;
  }
  getSpentValues() {
    const value = bills.map(spent => Number(spent.value));
    listSpentValue = value;
    return listSpentValue;
  }
  filterBills(id) {
    bills = bills.filter(spent => spent.id != id);
    return bills;
  }
  updateBills() {
    return bills;
  }
  replaceBills(newBills) {
    bills = newBills;
  }
}