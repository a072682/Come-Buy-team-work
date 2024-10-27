import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Modal } from 'bootstrap';

const modal1 = new Modal(document.getElementById('exampleModal'));
document.getElementById('submitBtn').addEventListener('click', () => {
  modal1.show();
});

const modal2 = new Modal(document.getElementById('bb'));
document.getElementById('aa').addEventListener('click', () => {
  modal2.show();
});