import Removed from './Removed.js';
import Popovers from './Popovers.js';
import WorkDisplay from './WorkDisplay.js';
import XHR from './XHR.js';

const workDisplay = new WorkDisplay();
const popup = new Popovers(document.body);
const removed = new Removed();
const xhrFromClass = new XHR();

export default class Work {
  constructor() {
    this.ticketsList = document.getElementById('tickets-list');
    this.addTicket = document.getElementById('add-ticket');
    this.id = null;
    this.itemIndex = null;
    this.status = "false";
  }

  async init() {
    const arrayOfTickets = await xhrFromClass.getTickets();
    workDisplay.redrawTickets(arrayOfTickets);

    popup.bindToDOM();
    popup.saveTicket(this.saveTicket.bind(this));
    this.inpSmDescr = document.getElementById('small-description');
    this.inpFullDescr = document.getElementById('full-description');
    this.popupTitle = document.getElementById('title-popup');
    removed.init();
    this.eventsTickets();
  }

  eventsTickets() {
    this.ticketsList.addEventListener('click', async (event) => {
      const eClass = event.target.classList;
      this.id = event.target.closest('.ticket').dataset.id;

      if (eClass.contains('status')) {
        const ticketStatus = event.target.querySelector('.change-status');
        const sendStatus = ticketStatus.getAttribute('data-status') === 'true' ? 'false' : 'true';

        console.log(sendStatus)
        if (sendStatus === 'true') {
          event.target.innerText = '✔'
          console.log('✔')
        }
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
        const ticketFullDescr = event.target.closest('.ticket').querySelector('.full-description');
        if (!ticketFullDescr) {
          const newDescr = await xhrFromClass.getDescription(this.id);
          const elementDescr = document.createElement('div');
          elementDescr.className = 'full-description';
          elementDescr.innerHTML = `${newDescr}`;
          event.target.parentNode.appendChild(elementDescr);
          event.target.closest('.ticket').classList.toggle('big-ticket');
        } else {
          ticketFullDescr.classList.toggle('hidden');
          event.target.closest('.ticket').classList.toggle('big-ticket');
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
    const arrayOfTickets = await xhrFromClass.getTickets();
    workDisplay.redrawTickets(arrayOfTickets);
  }

  async saveTicket() {
    if (this.id !== null) {
      await xhrFromClass.changeTickets(this.id, this.inpSmDescr.value, this.inpFullDescr.value);
    } else {
      await xhrFromClass.addTicket(this.inpSmDescr.value, this.inpFullDescr.value);
    }
    const arrayOfTickets = await xhrFromClass.getTickets();
    workDisplay.redrawTickets(arrayOfTickets);
  }
}
