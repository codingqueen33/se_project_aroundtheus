export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(classSelector);
        this._items = items;
    }

    renderItems(item) {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(cardData) {
        this._container.prepend(cardData);
    }
}
