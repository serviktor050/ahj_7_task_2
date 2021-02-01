import Removed from './Removed.js';
import Popovers from './Popovers.js';
import WorkDisplay from './WorkDisplay.js';
import initData from '../initData.js';
import XHR from './XHR.js'

const WorkDisplay = new WorkDisplay();
const popup = new Popovers(document.body);
const removed = new Removed();
const _xhr = new XHR();

export default class Work {
  constructor() {
    this.ticketsList = document.getElementById('tickets-list');
    this.addTicket = document.getElementById('add-ticket');
    this.id = -1;
    this.itemIndex = '';
  }

  async init() {
    initData();
    const arrayOfTickets = await _xhr.getTikets()
    workDisplay.redrawGoods(arrayOfTickets);

    popup.bindToDOM();
    popup.saveTicket(this.saveTicket.bind(this));
    this.inpSmDescr = document.getElementById('small-description');
    this.inpFullDescr = document.getElementById('full-description');
    this.popupTitle = document.getElementById('title-popup');
    removed.init();
    this.eventsTickets();
  }

  eventsTickets() {
    this.tableOfTickets.addEventListener('click', async (event) => {
      const eClass = event.target.classList;
      this.id = event.target.closest('.ticket').dataset.id;
    
      if (eClass.contains('change-status')) {
        const ticketStatus = event.target.dataset.status;
        const sendStatus = ticketStatus === 'true' ? 'false' : 'true';
        await _xhr.changeStatus(this.id, sendStatus);
        const arrayOfTickets = await _xhr.getTickets();
      }
      workDisplay.redrawTickets(arrTickets);

      if (eClass.contains('edit-ticket')) {
        const ticketName = event.target.closest('.ticket').querySelector('.ticket-name').innerText;
        const description = await _xhr.getDescription(this.id);
        this.inpSmDescr.value = ticketName;
        this.inpFullDescr.value = description;
        this.popupTitle.innerText = 'Изменить тикет';
        popup.showPopup();
      }

      if (eClass.contains('remove-ticket')) {
        removed.deleteElement(this.deleteTicket.bind(this));
      }

    });
  }




}