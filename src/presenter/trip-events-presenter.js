import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import {render, RenderPosition} from '../utils/render';
import EventPresenter from './event-presenter';

export default class TripEventsPresenter {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._eventsSortComponent = new EventsSortView();
    this._eventsListComponent = new EventsListView();
    this._emptyEventsListComponent = new EmptyEventsListView();
  }

  init(eventItems) {
    this._eventItems = eventItems.slice();
    this._renderTripEvents();
  }

  _renderEmptyEventsList() {
    render(this._tripEventsContainer, this._emptyEventsListComponent, RenderPosition.BEFORE_END);
  }

  _renderEventsSort() {
    render(this._tripEventsContainer, this._eventsSortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderEventsList() {
    render(this._tripEventsContainer, this._eventsListComponent, RenderPosition.BEFORE_END);
  }

  _renderEventItem(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent);
    eventPresenter.init(event);
  }

  _renderEventItems() {
    this._eventItems.forEach((eventItem) => this._renderEventItem(eventItem));
  }

  _renderTripEvents() {
    if (!this._eventItems.length) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsSort();
    this._renderEventsList();
    this._renderEventItems();
  }
}
