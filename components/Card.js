export default class Card {
    constructor(cardData, cardSelector, handleImageClick) {
        this._handleImageClick = handleImageClick;
        this._cardData = cardData;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._cardElement
            .querySelector(".card__like-button")
            .addEventListener("click", () => {
                this._handleLikeIcon();
            });

        this._cardElement
            .querySelector(".card__trash-button")
            .addEventListener("click", () => {
                this._handleDeleteCard();
            });

        this._cardImage.addEventListener("click", () => {
            this._handleImageClick(this);
        });
    }

    _handleLikeIcon() {
        this._cardElement
            .querySelector(".card__like-button")
            .classList.toggle("card__like-button_active");
    }

    _handleDeleteCard() {
        this._cardElement.remove();
    }

    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        this._setEventListeners();
    }
}
