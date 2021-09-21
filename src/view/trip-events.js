import AbstractView from '../abstract/abstract';

const tripEventsTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

export default class TripEvents extends AbstractView {
  getTemplate() {
    return tripEventsTemplate();
  }
}
