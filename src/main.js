import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import TripFiltersView from './view/trip-filters';
import EventsSortView from './view/events-sort';
//import {createEventsListTemplate} from './view/events-list';
import EventsListView from './view/events-list';
import {createEventsItemTemplate} from './view/event-item';
import {createEventsItemEditTemplate} from './view/event-item-edit';

import {renderTemplate, renderElement, RenderPosition} from './utils/render';

import {mockEventsItems} from './mock/mock-event-data';
import {EVENTS_ITEM_COUNT} from './mock/mock-const';

const eventsItems = mockEventsItems;

const pageMainContainer = document.querySelector('.page-main');
const pageHeaderContainer = document.querySelector('.page-header');
const tripMainContainer = pageHeaderContainer.querySelector('.trip-main');
const tripControlsContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const eventsContainer = pageMainContainer.querySelector('.trip-events');

renderElement(tripMainContainer, new TripInfoView().getElement(), RenderPosition.AFTER_BEGIN);
renderElement(tripControlsContainer, new TripControlsView().getElement(), RenderPosition.BEFORE_END);
renderElement(tripFiltersContainer, new TripFiltersView().getElement(), RenderPosition.BEFORE_END);
renderElement(eventsContainer, new EventsSortView().getElement(), RenderPosition.AFTER_BEGIN);
renderElement(eventsContainer, new EventsListView().getElement(), RenderPosition.BEFORE_END);

const eventsListContainer = eventsContainer.querySelector('.trip-events__list');

for (let i = 1; i < EVENTS_ITEM_COUNT; i++) {
  renderTemplate(eventsListContainer, createEventsItemTemplate(eventsItems[i]), 'beforeEnd');
}

renderTemplate(eventsListContainer, createEventsItemEditTemplate(eventsItems[0]), 'afterBegin');

