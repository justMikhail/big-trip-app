import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import TripFiltersView from './view/trip-filters';
import EventsSortView from './view/events-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';

import EventItemEditView from './view/event-item-edit';


import {render, RenderPosition} from './utils/render';

import {mockEventsItems} from './mock/mock-event-data';
import {EVENTS_ITEM_COUNT} from './mock/mock-const';

const eventsItems = mockEventsItems;

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

render(eventsListContainer, new EventItemEditView(eventsItems[0]).getElement(), RenderPosition.BEFORE_END);

for (let i = 1; i < EVENTS_ITEM_COUNT; i++) {
  render(eventsListContainer, new EventItemView(eventsItems[i]).getElement(), RenderPosition.BEFORE_END);
}

