import {createTripControls} from './view/trip-controls';
import {createTripInfo} from './view/trip-info';
import {createTripFilters} from './view/trip-filters';
import {createEventsSort} from './view/events-sort';
import {createTripEventsList} from './view/events-list';
import {createTripEventsItem} from './view/events-item';
//import {createEditEventsItemForm} from './view/edit-event-item-form';
import {createEventsItemForm} from './view/events-item-form';

const EVENTS_ITEM_COUNT = 3;

const render = (container, template, where) => {
  container.insertAdjacentHTML(where, template);
};

const pageMain = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const EventsContainer = pageMain.querySelector('.trip-events');

render(tripMainContainer, createTripInfo(), 'afterBegin');
render(tripControlsContainer, createTripControls(), 'beforeEnd');
render(tripFiltersContainer, createTripFilters(), 'beforeEnd');
render(EventsContainer, createEventsSort(), 'afterBegin');
render(EventsContainer, createTripEventsList(), 'beforeEnd');

const tripEventsList = EventsContainer.querySelector('.trip-events__list');

for (let i = 0; i < EVENTS_ITEM_COUNT; i++) {
  render(tripEventsList, createTripEventsItem(), 'beforeEnd');
}

//render(tripEventsList, createEditEventsItemForm(), 'beforeEnd');
render(tripEventsList, createEventsItemForm(), 'afterBegin');

