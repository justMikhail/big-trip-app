import AbstractView from '../abstract/abstract';

const createFilter =(filter, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input
    id="filter-${filter}"
    class="trip-filters__filter-input visually-hidden"
    type="radio"
    name="trip-filter"
    value="${filter}"
    ${filter === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`
);

const createFiltersTemplate = (filters,  currentFilterType) => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilter(filter, currentFilterType)).join()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
);

export default class EventsFilter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
