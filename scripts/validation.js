// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (input, formEl, { errorClass }) => {
    const errorSpan = formEl.querySelector("#" + input.id + "-error");
    //add error message/class
    errorSpan.textContent = input.validationMessage;
    input.classList.add(errorClass);
};

const hideInputError = (input, formEl, { errorClass }) => {
    const errorSpan = formEl.querySelector("#" + input.id + "-error");
    //add error message/class
    errorSpan.textContent = "";
    input.classList.remove(errorClass);
};

const checkInputValidity = (formEl, input, settings) => {
    if (input.validity.valid) {
        hideInputError(input, formEl, settings);
    } else {
        showInputError(input, formEl, settings);
    }
};

const hasValidInputs = (inputList) =>
    inputList.every((input) => input.validity.valid === true);

const toggleButton = (inputList, button, settings) => {
    if (hasValidInputs(inputList)) {
        button.disabled = false;
        button.classList.remove(settings.inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formEl, settings) => {
    const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
    const submitButton = formEl.querySelector(settings.submitButtonSelector);
    inputList.forEach((input) => {
        input.addEventListener("input", (e) => {
            checkInputValidity(formEl, input, settings);
            toggleButton(inputList, submitButton, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formElements = [...document.querySelectorAll(settings.formSelector)];
    formElements.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => e.preventDefault());
        setEventListeners(formEl, settings);
    });
};

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
});
