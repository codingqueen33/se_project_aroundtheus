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

const modalImage = new PopupWithImages({
    popupSelector: "#preview-modal",
});

const handleImageClick = ({ name, link }) => {
    modalImage.open({ name, link });
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

const addCardForms = new PopupWithForm({
    popupSelector: "#add-card-modal",
    handleFormSubmit: function (data) {
        cardSection.addItem(createCard(data));
        Constants.addCardForm.reset();
        addFormValidator.resetValidation();
    },
});

cardSection.renderItems();
addFormValidator.enableValidation();
editFormValidator.enableValidation();
modalImage.setEventListeners();
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
    Constants.profileTitleInput.value = currentUserInfo.title.trim();
    Constants.profileDescriptionInput.value =
        currentUserInfo.description.trim();
}

function openEditCardModal() {
    addCardForms.open();
}

function handleProfileEditSubmit({ title, description }) {
    userInfo.setUserInfo({ title, description });
    profileEditForm.close();
}

Constants.profileEditBtn.addEventListener("click", openEditProfileModal);
Constants.addNewCardBtn.addEventListener("click", openEditCardModal);
