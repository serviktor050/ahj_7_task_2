import Removed from './Removed.js';
import Popovers from './Popovers.js';
import WorkDisplay from './WorkDisplay.js';
import initData from '../initData.js';
import XHR from './XHR.js';

const workDisplay = new WorkDisplay();
const popup = new Popovers(document.body);
const removed = new Removed();
const xhrFromClass = new XHR();

export default class Work {
  constructor() {
    this.ticketsList = document.querySelector('#tickets-list');
    this.addTicket = document.querySelector('#add-ticket');
    this.id = null;
    this.itemIndex = null;
  }

  async init() {
    initData();
    const arrayOfTickets = await xhrFromClass.getTikets();
    workDisplay.redrawTickets(arrayOfTickets);

    popup.bindToDOM();
    popup.saveTicket(this.saveTicket.bind(this));
    this.inpSmDescr = document.querySelector('#small-description');
    this.inpFullDescr = document.querySelector('#full-description');
    this.popupTitle = document.querySelector('#title-popup');
    removed.init();
    this.eventsTickets();
  }

  eventsTickets() {
    this.ticketsList.addEventListener('click', async (event) => {
      const eClass = event.target.classList;

      console.log(eClass)
      this.id = event.target.closest('.ticket').dataset.id;

      if (eClass.contains('change-status')) {
        const ticketStatus = event.target.dataset.status;
        const sendStatus = ticketStatus === 'true' ? 'false' : 'true';
        await xhrFromClass.changeStatus(this.id, sendStatus);
        const arrayOfTickets = await xhrFromClass.getTickets();
        workDisplay.redrawTickets(arrayOfTickets);
      }

      if (eClass.contains('edit-ticket')) {
        const ticketName = event.target.closest('.ticket').querySelector('.ticket-name').innerText;
        const description = await xhrFromClass.getDescription(this.id);
        this.inpSmDescr.value = ticketName;
        this.inpFullDescr.value = description;
        this.popupTitle.innerText = 'Изменить тикет';
        popup.showPopup();
      }

      if (eClass.contains('remove-ticket')) {
        removed.deleteElement(this.deleteTicket.bind(this));
      }

      if (eClass.contains('ticket-name')) {
        const ticketFullDescr = event.target.parentNode.querySelector('.full-description');
        if (!ticketFullDescr) {
          const newDescr = await xhrFromClass.getDescription(this.id);
          const elementDescr = document.createElement('did');
          elementDescr.className = 'full-description';
          elementDescr.innerHTML = `
          <p>${newDescr}</p>
          `;
          event.target.parentNode.appendChild(elementDescr);
        } else {
          ticketFullDescr.classList.toggle('hidden');
        }
      }
    });

    this.addTicket.addEventListener('click', () => {
      this.id = null;
      this.popupTitle.innerText = 'Добавить тикет';
      popup.showPopup();
    });
  }

  async deleteTicket() {
    await xhrFromClass.removeTicket(this.id);
    const arrayOfTickets = await xhrFromClass.getTikets();
    workDisplay.redrawTickets(arrayOfTickets);
  }

  async saveTicket() {
    if (this.id !== null) {
      await xhrFromClass.changeTickets(this.id, this.inpSmDescr.value, this.inpFullDescr.value);
    } else {
      await xhrFromClass.addTicket(this.id, this.inpSmDescr.value, this.inpFullDescr.value);
    }
    const arrayOfTickets = await xhrFromClass.getTikets();
    workDisplay.redrawTickets(arrayOfTickets);
  }
}
