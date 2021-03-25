const
  competitionForm = document.querySelector('.competition-form'),
  modalWrapper = document.querySelector('.modal__wrapper'),
  modalFormError = document.querySelector('.competition__error'),
  modalFormSuccess = document.querySelector('.competition__success'),
  closeButtons = document.querySelectorAll('.modal__close'),
  submitBtn = document.querySelector('.competition-form__submit-btn');

// ОБработка формы

if (competitionForm) {
  submitBtn.addEventListener('click', tryToSubmit);
}

if (closeButtons) {
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeModal);
  }
}

function tryToSubmit(e) {
  e.preventDefault();

  if (competitionForm.checkValidity()) {
    submitFormData();
  } else {
    showModal(modalFormError);
  }
}

function submitFormData() {
  // Здесь "отправляем данные формы аяксом" и очищаем форму
  competitionForm.reset();

  showModal(modalFormSuccess);
}

// Операции с модальными окнами

function showModal(modal) {
  modalWrapper.classList.add('modal--visible');
  modal.classList.add('modal--visible');
}

function closeModal() {
  const modals = document.querySelectorAll('.modal--visible');

  for (let i = 0; i < modals.length; i++) {
    modals[i].classList.remove('modal--visible');
  }
}