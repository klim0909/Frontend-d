export function openModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        ${content}
      </div>
    `;
    document.body.appendChild(modal);
  
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      modal.remove();
    });
  
    return modal;
  }
  
  export function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  }
  