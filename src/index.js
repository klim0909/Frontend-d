import './css/styles.css';
import { renderTickets, setupEventListeners } from './js/ticket';

document.addEventListener('DOMContentLoaded', () => {
  renderTickets();
  setupEventListeners();
});
