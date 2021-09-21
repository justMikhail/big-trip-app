import Abstract from '../abstract/abstract';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButton extends Abstract {
  getTemplate() {
    return createNewEventButtonTemplate();
  }
}
