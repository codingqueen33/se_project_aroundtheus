// Card.js

export default class Card {
    constructor(cardData, cardSelector, handleImageClick) {
        this.name = cardData.name;
        this.link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", () => {
            this._handleLikeIcon();
        });

        this._cardElement
            .querySelector(".card__trash-button")
            .addEventListener("click", () => {
                this._cardElement.remove();
            });

        this._cardImage.addEventListener("click", () => {
            this._handleImageClick(this);
        });
    }

    getView() {
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        this._cardImage = this._cardElement.querySelector(".card__image");
        this._cardTitle = this._cardElement.querySelector(
            ".card__description-text"
        );
        this._cardLikeButton =
            this._cardElement.querySelector(".card__like-button");

        this._cardImage.src = this.link;
        this._cardImage.alt = this.name;
        this._cardTitle.textContent = this.name;

        this._setEventListeners();

        return this._cardElement;
    }
}
