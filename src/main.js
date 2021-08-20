import {createTripControls} from './view/trip-controls';
import {createTripInfo} from './view/trip-info';
import {createTripFilters} from './view/trip-filters';
import {createEventsSort} from './view/events-sort';
import {createEventsList} from './view/events-list';
import {createEventsItem} from './view/events-item';
//import {createEditEventsItemForm} from './view/edit-event-item-form';
import {createEventsItemForm} from './view/events-item-form';

import {generateEvent} from './mock/mock-event-data';

const EVENTS_ITEM_COUNT = 5;

const eventsItems = new Array(EVENTS_ITEM_COUNT).fill().map(generateEvent);
console.log(eventsItems);

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
render(EventsContainer, createEventsList(), 'beforeEnd');

const eventsListContainer = EventsContainer.querySelector('.trip-events__list');

for (let i = 0; i < EVENTS_ITEM_COUNT; i++) {
  render(eventsListContainer, createEventsItem(eventsItems[i]), 'beforeEnd');
}

//render(tripEventsList, createEditEventsItemForm(), 'beforeEnd');
render(eventsListContainer, createEventsItemForm(), 'afterBegin');

