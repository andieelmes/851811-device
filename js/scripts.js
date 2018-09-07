var storage = '';
var isStorageSupport = true;

function openPopup(openBtn, modal, className) {
  var btn = document.querySelector(openBtn)
  var popup = document.querySelector(modal)
  var closeBtn = document.querySelector(modal + ' .js-close')

  btn.addEventListener('click', function (e) {
    e.preventDefault()
    popup.classList.add(className)
    if (modal == '.js-feedback-container') insertFromLocalStorage()
  })

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault()
    popup.classList.remove(className)
    clearErrors('.js-feedback-form', 'error')
  })

  var keyCodeEsc = 27;
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === keyCodeEsc) {
      e.preventDefault();
      popup.classList.remove(className)
      clearErrors('.js-feedback-form', 'error')
    }
  });
}

openPopup('.js-map-btn', '.js-map-container', 'active')
openPopup('.js-feedback-btn', '.js-feedback-container', 'active')

function insertFromLocalStorage() {
  var name = document.querySelector('.js-feedback-name')
  var email = document.querySelector('.js-feedback-email')
  var text = document.querySelector('.js-feedback-text')
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
    email.value = localStorage.getItem('email');
    text.focus();
  } else {
    name.focus();
  }
}

function clearErrors(block, className) {
  var block = document.querySelector(block)
  block.classList.remove(className);
}

function validateForm() {
  var form = document.querySelector('.js-feedback-form')
  var inputs = document.querySelectorAll('.js-feedback-form input, .js-feedback-form textarea')
  var name = document.querySelector('.js-feedback-name')
  var email = document.querySelector('.js-feedback-email')
  var text = document.querySelector('.js-feedback-text')

  try {
    storage = localStorage.getItem('name');
  } catch (err) {
    isStorageSupport = false;
  }

  form.addEventListener('submit', function (e) {
    if (!name.value || !email.value || !text.value) {
      e.preventDefault();
      form.classList.add('error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
      }
    }
  });
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function () {
      form.classList.remove('error')
    })
  }
}
validateForm()
