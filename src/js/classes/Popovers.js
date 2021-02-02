export default class Popovers {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.elementPopup = document.createElement('div');
    this.sTicket = '';
  }

  get htmlElement() {
    return `
          <p id="title-popup">Добавить тикет</p>
          <p>Краткое описание</p>
          <input type="text" id="small-description" class="input" value="">
          <p>Подробное описание</p>
          <input type="text" id="full-description" class="input" value="">
          <div class="buttons">
            <div id="button-save" class="button">Ok</div>
            <div id="button-cancel" class="button">Отмена</div>
          </div>
        `;
  }
/*
  addErrorElement() {
    const error = document.createElement('div');
    error.id = 'form-error';
    error.className = 'form-error hidden';
    error.textContent = 'Error';
    this.parentElement.appendChild(error);
  }
*/
  saveTicket(callback) {
    this.sTicket = callback;
  }

  bindToDOM() {
    this.elementPopup.id = 'popup';
    this.elementPopup.className = 'popup hidden';
    this.elementPopup.innerHTML = this.htmlElement;
    //this.addErrorElement(this.elementPopup);
    this.parentElement.appendChild(this.elementPopup);
    this.constants();
    this.eventsPopup();
  }

  showPopup() {
    this.selectPopup.classList.remove('hidden');
    this.selectPopup.style.top = `${(window.innerHeight - this.selectPopup.offsetHeight) / 2}px`;
    this.selectPopup.style.left = `${(window.innerWidth - this.selectPopup.offsetWidth) / 2}px`;
  }

  constants() {
    this.selectPopup = document.getElementById('popup');
    this.inpSmDescr = document.getElementById('small-description');
    this.inpFullDescr = document.getElementById('full-description');
    this.buttonSave = document.getElementById('button-save');
    this.buttonCancel = document.getElementById('button-cancel');
    this.elementError = document.getElementById('form-error');
  }

  eventsPopup() {
    this.buttonSave.addEventListener('click', () => {
      if (this.inpSmDescr.value === '') {
        this.inpSmDescr.focus();
        this.showError(this.inpSmDescr, 'Краткое описание не заполнено!');
        return;
      }
      if (this.inpFullDescr.value === '') {
        this.inpFullDescr.focus();
        this.showError(this.inpFullDescr, 'Полное описание не заполнено!');
        return;
      }
      this.selectPopup.classList.add('hidden');
      this.sTicket();
      this.clearInput();
    });

    this.buttonCancel.addEventListener('click', () => {
      this.selectPopup.classList.add('hidden');
      this.hidenError();
      this.clearInput();
    });

    this.inpSmDescr.addEventListener('input', () => {
      this.hidenError();
    });

    this.inpFullDescr.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.elementError.classList.contains('hidden')) {
      this.elementError.classList.add('hidden');
    }
  }

  clearInput() {
    this.inpSmDescr.value = '';
    this.inpFullDescr.value = '';
  }

  showError(element, message) {
    this.elementError.textContent = message;
    this.elementError.classList.remove('hidden');
    this.elementError.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.elementError.style.left = `${element.offsetLeft + ((element.offsetWidth - this.elError.offsetWidth) / 2)}px`;
  }
}
