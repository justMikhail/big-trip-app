import TripInfoView from './view/trip-info';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition} from '../utils/render';

export default class TripEventsPresenter {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripInfoComponent = new TripInfoView();
    this._eventsSortComponent = new EventsSortView();
    this._eventsListComponent = new EventsListView();
    this._emptyEventsListView = new EmptyEventsListView();
  }

  init(eventItems) {
    this._eventItems = eventItems.slice();
    this.renderTripEvents();
  }

  _renderEmptyEventsList() {
    render(this._tripEventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    // Метод для рендеринга инфо о путешествии (маршрут, даты, стоимость)
  }

  _renderEventsSort() {
    // Метод для рендеринга сортировки эвентов
  }

  _renderEventsList() {
    // Метод для рендеринга списка событий
  }

  _renderEventItem() {
    // Метод для рендеринга события
  }

  _renderEventItems() {
  }

  _renderTripEvents() {
    if (!this._eventItems.length) {
      this._renderEmptyEventsList();
      return;
    }

    this._renderEventsSort();
    this._renderEventsList();
    this._renderEventItem();
  }
}
