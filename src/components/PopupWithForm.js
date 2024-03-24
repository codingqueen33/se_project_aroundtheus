import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._inputList =
            this._popupElement.querySelectorAll(".modal__form-input");
    }

    _getInputValues() {
        const inputValue = {};
        this._inputList.forEach((input) => {
            inputValue[input.name] = input.value;
        });

        return inputValue;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

            this.close();
        });

        super.setEventListeners();
    }
    reset() {
        this._popupForm.reset();
    }
}
