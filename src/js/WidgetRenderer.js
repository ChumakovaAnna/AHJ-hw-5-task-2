export default class WidgetRenderer {
  constructor(data) {
    this.container = null;
    this.popup = null;
    this.data = data;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
  }

  renderPopup(id = "") {
    this.popup = document.createElement("div");
    this.popup.classList.add("popup");
    this.popup.innerHTML = `
    <form class="form">
      <div class="containerInput">
        <input class="input" data-name="name" name="name"  placeholder="название">
      </div>  
      <div class="containerInput">
        <input class="input" data-name="price" name="price"  placeholder="стоимость">
      </div>  
      <div class="buttons">
        <button type="submit" class="btn_form submit">
          <img src="src/img/submit.png" data-btn="submit" alt="save">
        </button>
        <button class="btn_form cancel">
          <img src="src/img/cancel.png" data-btn="cancel" alt="cancel">
        </button>
      </div>
    </form>
    `;
    this.container.insertAdjacentElement("afterend", this.popup);

    let name = "";
    let price = "";

    const inputName = document.querySelector("[data-name=name]");
    const inputPrice = document.querySelector("[data-name=price]");

    if (id) {
      const item = this.data.findItem(id);
      name = item.name;
      price = item.price;

      inputName.value = name;
      inputPrice.value = price;
    }

    this.popup.addEventListener("change", (event) => {
      const { target } = event;

      if (target.dataset.name === "name") {
        name = target.value;
      }

      if (target.dataset.name === "price") {
        price = target.value;
      }
    });

    this.popup.addEventListener("click", (event) => {
      event.preventDefault();
      const { target } = event;

      if (target.dataset.btn === "submit") {
        if (inputName.value) {
          if (inputPrice.value && Number(inputPrice.value) && inputPrice.value > 0) {
            if (name && price && !id) {
              this.data.addItem(name, price);
            }

            if (name && price && id) {
              this.data.changeItem(id, name, price);
            }
            this.deletePopup();
            this.renderData();
          } else {
            WidgetRenderer.renderError(inputPrice, "Цена может быть только числом больше 0");
          }
        } else {
          WidgetRenderer.renderError(inputName, "Заполните это поле");
        }
      }

      if (target.dataset.btn === "cancel") {
        this.deletePopup();
      }
    });

    this.popup.addEventListener("input", () => {
      const allError = this.popup.querySelectorAll(".error");
      if (allError) {
        allError.forEach((element) => {
          element.remove();
        });
      }
    });
  }

  deletePopup() {
    this.popup.remove();
  }

  static renderItem(id, name, price) {
    const renderer = document.createElement("div");
    renderer.classList.add("grid");
    renderer.dataset.id = id;
    renderer.innerHTML = `
    <div class="col-7">
      ${name}
    </div>
    <div class="col align">
      ${price}
    </div>
    <div class="col align">
      <button class="edit">
        <img src="src/img/edit.png" data-btn="edit" alt="add">
      </button>
      <button class="delete">
        <img src="src/img/delete.png" data-btn="delete" alt="add">
      </button>
    </div>
    `;
    return renderer;
  }

  renderData() {
    this.clearContainer();
    this.data.data.forEach((item) => {
      const itemHTML = WidgetRenderer.renderItem(item.id, item.name, item.price);
      this.container.insertAdjacentElement("beforeend", itemHTML);
    });
  }

  clearContainer() {
    const allItem = this.container.querySelectorAll(".grid");
    allItem.forEach((item) => {
      item.remove();
    });
  }

  static renderError(input, text) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerText = text;

    const parent = input.parentElement;
    parent.insertAdjacentElement("beforeend", error);
  }
}
