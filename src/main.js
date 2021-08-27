import {createTripControlsTemplate} from './view/trip-controls';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripFiltersTemplate} from './view/trip-filters';
import {createEventsSortTemplate} from './view/events-sort';
import {createEventsListTemplate} from './view/events-list';
import {createEventsItemTemplate} from './view/event-item';
import {createEventsItemEditTemplate} from './view/event-item-edit';

import {mockEventsItems} from './mock/mock-event-data';
import {EVENTS_ITEM_COUNT} from './mock/mock-const';

const eventsItems = mockEventsItems;

const render = (container, template, where) => {
  container.insertAdjacentHTML(where, template);
};

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

render(tripMainContainer, createTripInfoTemplate(), 'afterBegin');
render(tripControlsContainer, createTripControlsTemplate(), 'beforeEnd');
render(tripFiltersContainer, createTripFiltersTemplate(), 'beforeEnd');
render(eventsContainer, createEventsSortTemplate(), 'afterBegin');
render(eventsContainer, createEventsListTemplate(), 'beforeEnd');

const eventsListContainer = eventsContainer.querySelector('.trip-events__list');

for (let i = 1; i < EVENTS_ITEM_COUNT; i++) {
  render(eventsListContainer, createEventsItemTemplate(eventsItems[i]), 'beforeEnd');
}

render(eventsListContainer, createEventsItemEditTemplate(eventsItems[0]), 'afterBegin');

