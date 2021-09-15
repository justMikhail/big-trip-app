import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import EventPresenter from './event-presenter';
import {render, RenderPosition, updateItem} from '../utils/render';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/sort';
import {SortType} from '../const/const';

export default class TripEventsPresenter {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._eventsSortComponent = new EventsSortView();
    this._eventsListComponent = new EventsListView();
    this._emptyEventsListComponent = new EmptyEventsListView();
    this._eventPresenters = new Map();
    this._currentSortType = SortType.DEFAULT;
    this._handleEventPointChange = this._handleEventPointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewModeChange = this._handleViewModeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();
    this._renderTripEvents();
  }

  _handleEventPointChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  _handleViewModeChange() {
    this._eventPresenters.forEach((presenter) => presenter.resetViewMode());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
    this._clearAllEvents();
    this._renderAllEvents();
  }

  _renderEmptyEventsList() {
    render(this._tripEventsContainer, this._emptyEventsListComponent, RenderPosition.BEFORE_END);
  }

  _renderEventsSort() {
    render(this._tripEventsContainer, this._eventsSortComponent, RenderPosition.AFTER_BEGIN);
    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._events.sort(sortByDate);
        break;
      case SortType.DURATION_DOWN:
        this._events.sort(sortByDuration);
        break;
      case SortType.PRICE_DOWN:
        this._events.sort(sortByPrice);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _renderEventsList() {
    render(this._tripEventsContainer, this._eventsListComponent, RenderPosition.BEFORE_END);
  }

  _clearAllEvents() {
    this._eventPresenters.forEach((presenter) => presenter.destroy());
    this._eventPresenters.clear();
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventPointChange, this._handleViewModeChange);
    eventPresenter.init(event);
    this._eventPresenters.set(event.id, eventPresenter);
  }

  _renderAllEvents() {
    this._sortEvents(this._currentSortType);
    this._events.forEach((eventItem) => this._renderEvent(eventItem));
  }

  _renderTripEvents() {
    if (!this._events.length) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsSort();
    this._renderEventsList();
    this._renderAllEvents();
  }
}
