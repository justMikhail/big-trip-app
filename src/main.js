import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import TripFiltersView from './view/trip-filters';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';
import EventItemFormView from './view/event-item-form';
import NoEventView from './view/no-events';

import {render, RenderPosition, replace} from './utils/render';

import {mockEventsItems} from './mock/mock-event-data';

const eventItems = mockEventsItems;

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

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

render(tripMainContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
render(tripControlsContainer, new TripControlsView().getElement(), RenderPosition.BEFORE_END);
render(tripFiltersContainer, new TripFiltersView().getElement(), RenderPosition.BEFORE_END);
render(eventsContainer, new EventsSortView().getElement(), RenderPosition.AFTER_BEGIN);
render(eventsContainer, new EventsListView().getElement(), RenderPosition.BEFORE_END);

// todo Как можно решить проблему с возможностью объявление(точнее обращения к) "eventsListContainer"
// todo только после рендера компонента с разметкой с необходимым селектором "trip-events__list"?
const eventsListContainer = eventsContainer.querySelector('.trip-events__list');

if (!eventItems.length) {
  render(eventsListContainer, new NoEventView().getElement(), RenderPosition.BEFORE_END);
} else {
  for (let i = 0; i < eventItems.length; i++) {
    renderEvent(eventsListContainer, eventItems[i]);
  }
}


