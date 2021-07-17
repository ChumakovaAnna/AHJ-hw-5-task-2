import addListeners from "./addListeners";
import WidgetRenderer from "./WidgetRenderer";
import Data from "./Data";

console.log("Started");

const data = new Data();
// data.addItem("pen", 2);
// data.addItem("pencil", 3);

const container = document.querySelector(".table");
const widget = new WidgetRenderer(data);
widget.bindToDOM(container);
widget.renderData();

const allDocument = document.querySelector("[data-container=document]");
allDocument.addEventListener("click", (event) => {
  addListeners(event, data, widget);
});
