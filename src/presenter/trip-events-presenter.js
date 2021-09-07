import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition, replace} from '../utils/render';

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
    const eventComponent = new EventItemView(event);
    const eventEditComponent = new EventItemFormView(event);

    const replaceItemToItemForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceItemFormToItem = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceItemFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent
      .setEditClickHandler(() => {
        replaceItemToItemForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    eventEditComponent
      .setFormSubmitHandler(() => {
        replaceItemFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    render(this._eventsListComponent, eventComponent, RenderPosition.BEFORE_END);
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
