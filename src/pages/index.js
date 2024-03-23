import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as Constants from "../utils/Constants.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";

const editFormValidator = new FormValidator(
    Constants.validationSettings,
    Constants.profileEditModal
);
const addFormValidator = new FormValidator(
    Constants.validationSettings,
    Constants.addCardForm
);

const popupImage = new PopupWithImages({
    popupSelector: ".modal__image",
});

const handleImageClick = ({ name, link }) => {
    popupImage.open({ name, link });
};

const userInfo = new UserInfo({
    profileTitleSelector: ".profile__title",
    profileDescriptionSelector: ".profile__description",
});

userInfo.getUserInfo();

const profileEditForm = new PopupWithForm({
    popupSelector: "#profile-edit-modal",
    handleFormSubmit: (data) => {
        handleProfileEditSubmit(data);
    },
});

const addCardForms = new PopupWithForm({
    popupSelector: "#add-card-modal",
    handleFormSubmit: (data) => {
        console.trace(data);
        cardSection.addItem(createCard(data));
        Constants.addCardForm.reset();
        addFormValidator.resetValidation();
    },
});

const cardSection = new Section(
    {
        items: Constants.initialCards,
        renderer: (data) => {
            const card = createCard(data);
            cardSection.addItem(card);
        },
    },
    ".cards__list"
);

cardSection.renderItems();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
popupImage.setEventListeners();
profileEditForm.setEventListeners();
addCardForms.setEventListeners();

function createCard({ name, link }) {
    const card = new Card({ name, link }, "#card-template", handleImageClick);
    const cardElement = card.getView();
    return cardElement;
}

function openEditProfileModal() {
    profileEditForm.open();
    const currentUserInfo = userInfo.getUserInfo();
    Constants.profileTitleInput.value = currentUserInfo.title.trim(); // Trim the text value
    Constants.profileDescriptionInput.value =
        currentUserInfo.description.trim(); // Trim the text value
}

function openEditCardModal() {
    addCardForms.open();
}

function handleProfileEditSubmit({ title, description }) {
    userInfo.setUserInfo({ title, description });
    profileEditModal.close();
}

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);
Constants.addNewCardBtn.addEventListener("click", openEditCardModal);
