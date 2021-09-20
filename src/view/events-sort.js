import AbstractView from '../abstract/abstract';
import {SortType} from '../const/const';

const createEventSortItem = (type, currentSortType) => (
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      data-sort-type="${SortType[type.toUpperCase()]}"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      ${SortType[type.toUpperCase()] === currentSortType  ? 'checked' : ''}
    >
    <label
      class="trip-sort__btn"
      for="sort-${type}"
    >
      ${type}
    </label>
  </div>`
);

const createEventsSortTemplate = (currentSortType = SortType.DEFAULT) => {
  const sortTypes = Object.values((SortType));
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTypes.map((type) => createEventSortItem(type, currentSortType)).join('')}
  </form>`;
};

export default class EventsSort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createEventsSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL' || evt.target.control.disabled) {
      return;
    }

    evt.target.control.checked = true;
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
