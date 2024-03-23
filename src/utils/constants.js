export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
];

//** Profile Elements */

export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
    "#profile-description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
);

export const profileForm = document.forms["modal-form"];

//** Card Elements */

export const addCardModal = document.querySelector("#add-card-modal");
export const cardTitleInput = document.querySelector("#card-title-input");
export const addCardForm = document.querySelector("#add-card-form");
export const cardUrlInput = document.querySelector("#url-input");
export const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
export const cardsWrap = document.querySelector(".cards__list");

//** Preview */

export const previewModal = document.querySelector("#preview-modal");
export const modalImage = previewModal.querySelector(".modal__image");
export const previewCaption = previewModal.querySelector(".modal__caption");

//** Buttons */

export const cardSubmitBtn = addCardModal.querySelector("#card-save-button");
export const addNewCardBtn = document.querySelector("#add-card-button");
export const closeBtns = document.querySelectorAll(".modal__close-button");

export const validationSettings = {
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};
