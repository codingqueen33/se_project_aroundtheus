import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
    }

    open({ name, link }) {
        const cardImageEl = this._popupElement.querySelector(".modal__image");
        const cardCaption = this._popupElement.querySelector(".modal__caption");

        if (cardImageEl && cardCaption) {
            cardImageEl.alt = name;
            cardImageEl.src = link;
            cardCaption.textContent = name;
            super.open();
        } else {
            console.error("Image or caption not found:", this._popupElement);
        }
    }
}
