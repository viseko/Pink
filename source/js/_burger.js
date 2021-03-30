const burgerBtn = document.querySelector('.burger-btn');
const navPanel = document.querySelector('.main-nav');

burgerBtn.addEventListener('click', function() {
  navPanel.classList.toggle('_active');
});
