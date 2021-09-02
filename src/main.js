import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import TripFiltersView from './view/trip-filters';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';
import EventItemFormView from './view/event-item-form';
import NoEventView from './view/no-events';

import {render, RenderPosition} from './utils/render';

import {mockEventsItems} from './mock/mock-event-data';

const eventsItems = mockEventsItems;

const renderEvent = (container, event) => {
  const eventComponent = new EventItemView(event);
  const eventEditComponent = new EventItemFormView(event);

  const replaceCardToForm = () => {
    container.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    container.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent
    .setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

  eventEditComponent
    .setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

  render(container, eventComponent.getElement(), RenderPosition.BEFORE_END);
};

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

render(tripMainContainer, new TripInfoView().getElement(), RenderPosition.AFTER_BEGIN);
render(tripControlsContainer, new TripControlsView().getElement(), RenderPosition.BEFORE_END);
render(tripFiltersContainer, new TripFiltersView().getElement(), RenderPosition.BEFORE_END);
render(eventsContainer, new EventsSortView().getElement(), RenderPosition.AFTER_BEGIN);
render(eventsContainer, new EventsListView().getElement(), RenderPosition.BEFORE_END);

const eventsListContainer = eventsContainer.querySelector('.trip-events__list');

if (!eventsItems.length) {
  render(eventsListContainer, new NoEventView().getElement(), RenderPosition.BEFORE_END);
} else {
  for (let i = 0; i < eventsItems.length; i++) {
    renderEvent(eventsListContainer, eventsItems[i]);
  }
}


