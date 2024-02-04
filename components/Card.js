export default class Card {
    constructor(cardData, cardSelector, handleImageClick) {
        this._handleImageClick = handleImageClick;
        this._cardData = cardData;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._cardElement.addEventListener("click", () => {
            this.handleImageClick(this._name, this._link);
        });

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

        this._cardImageEl.addEventListener("click", () => {
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

    generateCard() {
        this._cardElement = this._getView();
        this._cardImageEl = this._cardElement.querySelector(".card__image");
        this._likeBtn = this._cardElement.querySelector(".card__like-button");
        this._cardTrashBtn = this._element.querySelector(".card__trash-button");
        this._setEventListeners();
        this._cardImageEl.setAttribute("src", this._link);
        this._cardImageEl.setAttribute("alt", this._name);
        this._cardElement.querySelector(".card__title").textContent =
            this._name;

        return this._cardElement;
    }
}
