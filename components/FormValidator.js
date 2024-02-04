export default class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError(inputElement) {
        this._errorMessageElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );

        inputElement.classList.add(this._inputErrorClass);
        this._errorMessageElement.textContent = inputElement.validationMessage;
        this._errorMessageElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        this._errorMessageElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );

        inputElement.classList.remove(this._inputErrorClass);
        this._errorMessageElement.textContent = " ";
        this._errorMessageElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            return this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return !this._inputElements.every(
            (inputElement) => !inputElement.validity.valid
        );
    }

    _disableButton() {
        this._submitButtonSelector.classList.add(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = true;
    }

    _enableButton() {
        this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = false;
    }

    _setEventListeners() {
        this._inputElements = [
            ...this._form.querySelectorAll(this._inputSelector),
        ];
        this._submitButtonSelector = this._form.querySelector(
            this._submitButtonSelector
        );

        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButton();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        this._setEventListeners();
    }

    resetValidation() {
        this.toggleButton();

        this._inputElements.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _toggleButton(inputElement) {
        let foundInvalid = false;
        this._inputElements.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                foundInvalid = true;
            }
        });
        if (foundInvalid) {
            this._submitButtonSelector.classList.add(this._inactiveButtonClass);
            return (this._submitButtonSelector.disabled = true);
        }
        this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
        this._submitButtonSelector.disabled = false;
    }
}
