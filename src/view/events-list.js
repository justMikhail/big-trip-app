import {createElement} from '../utils/render';

const createEventsListTemplate = () => (
  `<ul class="trip-events__list">
    <!--Events-->
  </ul>`
);

export default class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
