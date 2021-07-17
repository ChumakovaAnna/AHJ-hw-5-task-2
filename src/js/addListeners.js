export default function addListeners(event, data, widget) {
  const { target } = event;

  if (target.dataset) {
    if (target.dataset.btn === "delete") {
      widget.clearContainer();
      const parentEl = target.closest("[data-id]");
      const { id } = parentEl.dataset;
      data.deleteItem(id);
      widget.renderData();
    }

    if (target.dataset.btn === "add") {
      widget.renderPopup();
    }

    if (target.dataset.btn === "edit") {
      const parentEl = target.closest("[data-id]");
      const { id } = parentEl.dataset;
      widget.renderPopup(id);
    }
  }
}
