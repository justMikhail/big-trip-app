import AbstractView from '../abstract/abstract';

const createEventsListTemplate = () => (
  `<ul class="trip-events__list">
    <!--Events-->
  </ul>`
);

export default class EventsList extends AbstractView {

  getTemplate() {
    return createEventsListTemplate();
  }
}
