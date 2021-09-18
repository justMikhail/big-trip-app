import AbstractView from '../abstract/abstract';

const createEventsFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
             value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
             value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
             value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>
  </form>`
);

export default class EventsFilter extends AbstractView {

  getTemplate() {
    return createEventsFilterTemplate();
  }
}
