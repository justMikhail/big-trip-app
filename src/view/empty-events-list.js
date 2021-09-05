import AbstractView from './abstract';

const createEmptyEventsListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyEventsList extends AbstractView {

  getTemplate() {
    return createEmptyEventsListTemplate();
  }
}

