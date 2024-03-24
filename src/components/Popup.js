export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupCloseButton = this._popupElement.querySelector(
            ".modal__close-button"
        );
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        if (this._popupElement) {
            this._popupElement.classList.add("modal_opened");
            document.addEventListener("keydown", this._handleEscClose);
        } else {
            console.error("Popup element not found:", this._popupElement);
        }
    }

    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    _handleClickOut(evt) {
        if (evt.target.classList.contains("modal")) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("modal_opened")) {
                this.close();
            }
        });
        if (this._popupCloseButton) {
            this._popupCloseButton.addEventListener("click", () => {
                this.close();
            });
        }
    }
}
