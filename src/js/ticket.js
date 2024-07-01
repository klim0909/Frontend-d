import { fetchTickets, fetchTicketDetails, createTicket, updateTicket, deleteTicket, toggleTicketStatus } from './api';
import { openModal, closeModal } from './modal';

export async function renderTickets() {
  const ticketList = document.getElementById('ticket-list');
  ticketList.innerHTML = 'Загрузка...';

  try {
    const tickets = await fetchTickets();
    ticketList.innerHTML = '';

    tickets.forEach(ticket => {
      const ticketElement = document.createElement('div');
      ticketElement.classList.add('ticket');
      ticketElement.innerHTML = `
        <div class="details">
          <span>${ticket.title}</span>
          <span>${ticket.status ? '✔' : '✖'}</span>
        </div>
        <div>
          <button class="edit-button">✎</button>
          <button class="delete-button">x</button>
        </div>
      `;

      const detailsButton = ticketElement.querySelector('.details');
      detailsButton.addEventListener('click', async () => {
        try {
          const details = await fetchTicketDetails(ticket.id);
          openModal(`
            <h2>${details.title}</h2>
            <p>${details.description}</p>
          `);
        } catch (error) {
          console.error('Ошибка при загрузке деталей тикета:', error);
          alert('Не удалось загрузить детали тикета. Пожалуйста, попробуйте еще раз.');
        }
      });

      const editButton = ticketElement.querySelector('.edit-button');
      editButton.addEventListener('click', () => {
        openModal(`
          <h2>Редактировать тикет</h2>
          <form id="edit-ticket-form">
            <input type="text" name="title" value="${ticket.title}">
            <textarea name="description">${ticket.description}</textarea>
            <button type="submit">Сохранить</button>
          </form>
        `);

        const editForm = document.getElementById('edit-ticket-form');
        editForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(editForm);
          const updatedTicket = {
            title: formData.get('title'),
            description: formData.get('description')
          };

          try {
            await updateTicket(ticket.id, updatedTicket);
            closeModal();
            renderTickets();
          } catch (error) {
            console.error('Ошибка при обновлении тикета:', error);
            alert('Не удалось обновить тикет. Пожалуйста, попробуйте еще раз.');
          }
        });
      });

      const deleteButton = ticketElement.querySelector('.delete-button');
      deleteButton.addEventListener('click', () => {
        openModal(`
          <h2>Удалить тикет</h2>
          <p>Вы уверены, что хотите удалить этот тикет?</p>
          <button id="confirm-delete-button">Удалить</button>
          <button id="cancel-delete-button">Отмена</button>
        `);

        const confirmDeleteButton = document.getElementById('confirm-delete-button');
        confirmDeleteButton.addEventListener('click', async () => {
          try {
            await deleteTicket(ticket.id);
            closeModal();
            renderTickets();
          } catch (error) {
            console.error('Ошибка при удалении тикета:', error);
            alert('Не удалось удалить тикет. Пожалуйста, попробуйте еще раз.');
          }
        });

        const cancelDeleteButton = document.getElementById('cancel-delete-button');
        cancelDeleteButton.addEventListener('click', () => {
          closeModal();
        });
      });

      ticketList.appendChild(ticketElement);
    });
  } catch (error) {
    console.error('Ошибка при загрузке списка тикетов:', error);
    ticketList.innerHTML = '<p>Не удалось загрузить список тикетов. Пожалуйста, обновите страницу.</p>';
  }
}

export function setupEventListeners() {
  const addTicketButton = document.getElementById('add-ticket-button');
  addTicketButton.addEventListener('click', () => {
    openModal(`
      <h2>Добавить тикет</h2>
      <form id="add-ticket-form">
        <input type="text" name="title" placeholder="Заголовок">
        <textarea name="description" placeholder="Описание"></textarea>
        <button type="submit">Добавить</button>
      </form>
    `);

    const addForm = document.getElementById('add-ticket-form');
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(addForm);
      const newTicket = {
        title: formData.get('title'),
        description: formData.get('description')
      };

      try {
        await createTicket(newTicket);
        closeModal();
        renderTickets();
      } catch (error) {
        console.error('Ошибка при создании тикета:', error);
        alert('Не удалось добавить тикет. Пожалуйста, попробуйте еще раз.');
      }
    });
  });
}
