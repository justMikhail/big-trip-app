import {createTripControlsTemplate} from './view/trip-controls';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripFiltersTemplate} from './view/trip-filters';
import {createEventsSortTemplate} from './view/events-sort';
import {createEventsListTemplate} from './view/events-list';
import {createEventsItemTemplate} from './view/event-item';
import {createEventsItemEditTemplate} from './view/event-item-edit';

import {renderTemplate} from './utils/render';

import {mockEventsItems} from './mock/mock-event-data';
import {EVENTS_ITEM_COUNT} from './mock/mock-const';

const eventsItems = mockEventsItems;

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

renderTemplate(tripMainContainer, createTripInfoTemplate(), 'afterBegin');
renderTemplate(tripControlsContainer, createTripControlsTemplate(), 'beforeEnd');
renderTemplate(tripFiltersContainer, createTripFiltersTemplate(), 'beforeEnd');
renderTemplate(eventsContainer, createEventsSortTemplate(), 'afterBegin');
renderTemplate(eventsContainer, createEventsListTemplate(), 'beforeEnd');

const eventsListContainer = eventsContainer.querySelector('.trip-events__list');

for (let i = 1; i < EVENTS_ITEM_COUNT; i++) {
  renderTemplate(eventsListContainer, createEventsItemTemplate(eventsItems[i]), 'beforeEnd');
}

renderTemplate(eventsListContainer, createEventsItemEditTemplate(eventsItems[0]), 'afterBegin');

