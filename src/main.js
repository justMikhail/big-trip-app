import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import EventsFilterView from './view/events-filter';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';
import EventItemFormView from './view/event-item-form';
import EmptyEventsListView from './view/empty-events-list';

import {render, RenderPosition, replace} from './utils/render';

import {mockEventItems} from './mock/mock-event-data';

const eventItems = mockEventItems;

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const eventsFilterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

const renderUI = () => {
  render(tripMainInfoContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
  render(tripControlsContainer, new TripControlsView(), RenderPosition.BEFORE_END);
  render(eventsFilterContainer, new EventsFilterView(), RenderPosition.BEFORE_END);
};

const renderEvent = (container, event) => {
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

  render(container, eventComponent, RenderPosition.BEFORE_END);
};

const renderTripEvents = (container, eventsList) => {
  const eventsListComponent = new EventsListView();
  const emptyEventsListComponent = new EmptyEventsListView();

  render(container, eventsListComponent, RenderPosition.BEFORE_END);

  if (!eventItems.length) {
    render(eventsListComponent, emptyEventsListComponent, RenderPosition.BEFORE_END);
    return;
  }

  render(container, new EventsSortView(), RenderPosition.AFTER_BEGIN);

  eventsList.forEach((event) => renderEvent(eventsListComponent, event));
};

renderUI();
renderTripEvents(eventsContainer, eventItems);
