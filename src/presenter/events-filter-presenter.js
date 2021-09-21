import EventsFilterView from '../view/events-filter';
import {render, RenderPosition, replace, remove } from '../utils/render';
import {FilterType, UpdateType} from '../const/const';

export default class EventsFilterPresenter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFiltersType();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new EventsFilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFiltersType() {
    return Object.values(FilterType);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  setDisabled() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((item) => item.setAttribute('disabled', 'disabled'));
  }

  removeDisabled() {
    const filters = document.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((item) => item.removeAttribute('disabled'));
  }
}
