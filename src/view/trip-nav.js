import AbstractView from '../abstract/abstract';
import {NavMenuItem} from '../const/const';

const createTripNavTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${NavMenuItem.TABLE}">${NavMenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-value="${NavMenuItem.STATS}">${NavMenuItem.STATS}</a>
    </nav>
  </div>`
);

export default class TripNav extends AbstractView {
  constructor() {
    super();
    this._navMenuClickHandler = this._navMenuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripNavTemplate();
  }

  _navMenuClickHandler(evt) {
    evt.preventDefault();
    this._setActiveNavMenuItem(evt.target);
    this._callback.navMenuClick(evt.target.dataset.value);
  }

  setNavMenuClickHandler(callback) {
    this._callback.navMenuClick = callback;
    this.getElement().addEventListener('click', this._navMenuClickHandler);
  }

  _setActiveNavMenuItem(activeMenuItem) {
    const menuItems = this.getElement().querySelectorAll('.trip-tabs__btn');
    menuItems.forEach((item) => item.classList.remove('trip-tabs__btn--active'));
    activeMenuItem.classList.add('trip-tabs__btn--active');
  }
}

