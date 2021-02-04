export default class WorkDisplay {
  constructor() {
    this.tableOfTickets = document.getElementById('tickets-list');
  }

  redrawTickets(arrayOfTickets) {
    this.tableOfTickets.innerHTML = '';

    for (const item of arrayOfTickets) {
      const ticket = document.createElement('div');
      const generalDate = new Date(item.created);
      const date = this.convert(generalDate.getDate());
      const month = this.convert(generalDate.getMonth());
      const year = this.convert(generalDate.getFullYear());
      const hours = this.convert(generalDate.getHours());
      const minutes = this.convert(generalDate.getMinutes());
      const ticketCreated = `${date}.${month}.${year} ${hours}:${minutes}`;
      ticket.className = 'ticket';
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
            <div class="status">
            <span class="change-status" data-status="${item.status}"></span>
            </div>
            <div class="ticket-name">${item.name}</div>
            <div class="ticket-created">${ticketCreated}</div>
            <div class="edit-or-remove">
              <span class="edit-ticket">&#9998;</span>
              <span class="remove-ticket">&#10006;</span>
            </div>
            `;
      this.tableOfTickets.appendChild(ticket);
    }
  }

  convert(value) {
    const newValue = value < 10 ? `0${value}` : value;
    return newValue;
  }
}
