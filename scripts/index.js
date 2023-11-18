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

const addCardForm = document.querySelector("#add-card-modal");
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

//** Buttons */

const cardSubmitBtn = addCardForm.querySelector("#card-save-button");
const addNewCardBtn = document.querySelector("#add-card-button");
const closeBtns = document.querySelectorAll(".modal__close-button");

closeBtns.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closePopup(popup));
});

//** Functions */

function openPopup(popup) {
    popup.classList.add("modal_opened");
}

function closePopup(popup) {
    popup.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value.trim();
    profileDescription.textContent = profileDescriptionInput.value.trim();
    closePopup(profileEditModal);
}

function handleCardSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value.trim();
    const link = cardUrlInput.value.trim();
    const cardElement = getCardElement({
        name,
        link,
    });
    cardsWrap.prepend(cardElement);
    closePopup(addCardForm);
    e.target.reset();
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__description-text");
    const modalImage = previewModal.querySelector(".modal__image");
    const previewCaption = previewModal.querySelector(".modal__caption");

    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name + " Photo";

    const likeBtn = cardElement.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("card__like-button_active");
    });

    const cardTrashBtn = cardElement.querySelector(".card__trash-button");
    cardTrashBtn.addEventListener("click", (e) => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        modalImage.src = cardData.link;
        modalImage.alt = cardData.name;
        previewCaption.textContent = cardData.name;
        openPopup(previewModal);
    });

    return cardElement;
}

//** Events */

addCardForm.addEventListener("submit", handleCardSubmit);

profileEditBtn.addEventListener("click", () => {
    fillProfileForm(
        profileTitle.textContent.trim(),
        profileDescription.textContent.trim()
    );
    openPopup(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsWrap.append(cardElement);
});

addNewCardBtn.addEventListener("click", () => {
    openPopup(addCardForm);
});

function fillProfileForm(title, description) {
    profileTitleInput.value = title;
    profileDescriptionInput.value = description;
}
