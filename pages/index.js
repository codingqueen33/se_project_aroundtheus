import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
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

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
);
const profileForm = document.forms["modal-form"];

//** Card Elements */

const addCardModal = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#url-input");
const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
const cardsWrap = document.querySelector(".cards__list");

//** Preview */

const previewModal = document.querySelector("#preview-modal");
const modalPreviewContainer = document.querySelector(
    ".modal__preview-container"
);
const modalImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

//** Buttons */

const cardSubmitBtn = addCardModal.querySelector("#card-save-button");
const addNewCardBtn = document.querySelector("#add-card-button");
const closeBtns = document.querySelectorAll(".modal__close-button");

closeBtns.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closePopup(popup));
});

//** Functions */

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleImageClick);
    return card.getView();
}

function getCard(cardData) {
    const cardElement = createCard(cardData);
    cardList.prepend(cardElement);
}

function openPopup(popup) {
    popup.classList.add("modal_opened");
    document.addEventListener("keydown", closeOnEscape);
}

function closePopup(popup) {
    popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeOnEscape);
}

function closeOnEscape(e) {
    if (e.key === "Escape") {
        const openedModal = document.querySelector(".modal_opened");
        closePopup(openedModal);
    }
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value.trim();
    profileDescription.textContent = profileDescriptionInput.value.trim();
    closePopup(profileEditModal);
}

function handleImageClick(cardData) {
    openPopup(modalPreviewContainer);
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
}

function handleCardSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value.trim();
    const link = cardUrlInput.value.trim();
    const cardElement = createCard({ name, link }); // Use createCard instead of getView
    cardsWrap.prepend(cardElement);
    closePopup(addCardModal);
    e.target.reset();
}

function renderCard(cardData, cardsWrap) {
    const cardElement = createCard(cardData);
    cardsWrap.prepend(cardElement);
}

//** */ Validation //

const validationSettings = {
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
    validationSettings,
    editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// function getCardElement(cardData) {
//     const cardElement = cardTemplate.cloneNode(true);
//     const cardImageEl = cardElement.querySelector(".card__image");
//     const cardTitleEl = cardElement.querySelector(".card__description-text");
//     const modalImage = previewModal.querySelector(".modal__image");
//     const previewCaption = previewModal.querySelector(".modal__caption");

//     cardTitleEl.textContent = cardData.name;
//     cardImageEl.src = cardData.link;
//     cardImageEl.alt = cardData.name + " Photo";

//     const likeBtn = cardElement.querySelector(".card__like-button");
//     likeBtn.addEventListener("click", () => {
//         likeBtn.classList.toggle("card__like-button_active");
//     });

//     const cardTrashBtn = cardElement.querySelector(".card__trash-button");
//     cardTrashBtn.addEventListener("click", (e) => {
//         cardElement.remove();
//     });

//     cardImageEl.addEventListener("click", () => {
//         modalImage.src = cardData.link;
//         modalImage.alt = cardData.name;
//         previewCaption.textContent = cardData.name;
//         openPopup(previewModal);
//     });

//     return cardElement;
// }

//** Events */

addCardModal.addEventListener("submit", handleCardSubmit);

profileEditBtn.addEventListener("click", () => {
    fillProfileForm(
        profileTitle.textContent.trim(),
        profileDescription.textContent.trim()
    );
    openPopup(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

addNewCardBtn.addEventListener("click", () => {
    openPopup(addCardModal);
});

function fillProfileForm(title, description) {
    profileTitleInput.value = title;
    profileDescriptionInput.value = description;
}

const modalList = document.querySelectorAll(".modal");

modalList.forEach((modal) => {
    modal.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("modal")) {
            closePopup(modal);
        }
    });
});
