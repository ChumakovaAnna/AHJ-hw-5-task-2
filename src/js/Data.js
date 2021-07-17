import { nanoid } from "nanoid";

export default class Data {
  constructor() {
    this.data = [];
  }

  addItem(name, price) {
    const item = {
      id: nanoid(),
      name,
      price,
    };
    this.data.push(item);
  }

  deleteItem(id) {
    const result = this.data.findIndex((item) => item.id === id);
    if (result !== -1) {
      this.data.splice(result, 1);
    } else {
      console.log("The item was not found");
    }
  }

  changeItem(id, name = "", price = "") {
    const result = this.data.find((item) => item.id === id);
    if (result) {
      if (name) {
        result.name = name;
      }

      if (price) {
        result.price = price;
      }
    }
    console.log("The item was not found");
    return false;
  }

  findItem(id) {
    const result = this.data.find((item) => item.id === id);
    if (result) { return result; }

    return false;
  }

  clearData() {
    this.data.forEach((ele) => {
      console.log(ele);
      this.deleteItem(ele.id);
    });
  }
}
