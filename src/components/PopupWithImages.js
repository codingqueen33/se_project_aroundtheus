import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
    }

    open({ name, link }) {
        const cardImageEl = this._popupElement.querySelector(".modal__image");
        if (cardImageEl) {
            const cardCaption =
                this._popupElement.querySelector(".modal__caption");
            cardImageEl.src = link;
            cardImageEl.alt = name; // Use name for alt text instead of link
            cardCaption.textContent = name;
            super.open();
        } else {
            console.error(
                "Image element not found in popup:",
                this._popupElement
            );
        }
    }
}
