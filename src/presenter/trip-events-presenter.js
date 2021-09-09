import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import {render, RenderPosition, updateItem} from '../utils/render';
import EventPresenter from './event-presenter';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/sort';
import {SortType} from '../const/const';

export default class TripEventsPresenter {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._eventsSortComponent = new EventsSortView();
    this._currentSortType = SortType.DEFAULT;
    this._eventsListComponent = new EventsListView();
    this._emptyEventsListComponent = new EmptyEventsListView();
    this._eventItemPresenter = new Map();
    this._handleEventItemChange = this._handleEventItemChange.bind(this);
    this._handleViewModeChange = this._handleViewModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(eventItems) {
    this._eventItems = eventItems.slice();
    this._sourcedEventItems = eventItems.slice();
    this._renderTripEvents();
  }

  _handleEventItemChange(updatedEventItem) {
    this._eventItems = updateItem(this._eventItems, updatedEventItem);
    this._eventItemPresenter.get(updatedEventItem.id).init(updatedEventItem);
  }

  _handleViewModeChange() {
    this._eventItemPresenter.forEach((presenter) => presenter.resetViewMode());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEventItems(sortType);
    this._clearAllEventItems();
    this._renderAllEventItems();
  }

  _renderEmptyEventsList() {
    render(this._tripEventsContainer, this._emptyEventsListComponent, RenderPosition.BEFORE_END);
  }

  _renderEventsSort() {
    render(this._tripEventsContainer, this._eventsSortComponent, RenderPosition.AFTER_BEGIN);
    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortEventItems(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._eventItems.sort(sortByDate);
        break;
      case SortType.DURATION_DOWN:
        this._eventItems.sort(sortByDuration);
        break;
      case SortType.PRICE_DOWN:
        this._eventItems.sort(sortByPrice);
        break;
      default:
        this._eventItems = this._sourcedEventItems.slice();
    }

    this._currentSortType = sortType;
  }

  _renderEventsList() {
    render(this._tripEventsContainer, this._eventsListComponent, RenderPosition.BEFORE_END);
  }

  _clearAllEventItems() {
    this._eventItemPresenter.forEach((presenter) => presenter.destroy());
    this._eventItemPresenter.clear();
  }

  _renderEventItem(event) {
    const eventItemPresenter = new EventPresenter(this._eventsListComponent, this._handleEventItemChange, this._handleViewModeChange);
    eventItemPresenter.init(event);
    this._eventItemPresenter.set(event.id, eventItemPresenter);
  }

  _renderAllEventItems() {
    this._sortEventItems(this._currentSortType);
    this._eventItems.forEach((eventItem) => this._renderEventItem(eventItem));
  }

  _renderTripEvents() {
    if (!this._eventItems.length) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsSort();
    this._renderEventsList();
    this._renderAllEventItems();
  }
}
