import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import EventsFilterView from './view/events-filter';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';
import EventItemFormView from './view/event-item-form';
import EmptyEventsList from './view/empty-events-list';

import {render, RenderPosition, replace} from './utils/render';

import {mockEventItems} from './mock/mock-event-data';

const eventItems = mockEventItems;

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const eventsFilterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

const renderUI = () => {
  render(tripMainContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
  render(tripControlsContainer, new TripControlsView(), RenderPosition.BEFORE_END);
  render(eventsFilterContainer, new EventsFilterView(), RenderPosition.BEFORE_END);
  render(eventsContainer, new EventsSortView(), RenderPosition.AFTER_BEGIN);
  render(eventsContainer, new EventsListView(), RenderPosition.BEFORE_END);
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

const renderEventsList = () => {
  const eventsListContainer = eventsContainer.querySelector('.trip-events__list');


  if (!eventItems.length) {
    render(eventsListContainer, new EmptyEventsList(), RenderPosition.BEFORE_END);
  } else {
    for (let i = 0; i < eventItems.length; i++) {
      renderEvent(eventsListContainer, eventItems[i]);
    }
  }
};

renderUI();
renderEventsList();


