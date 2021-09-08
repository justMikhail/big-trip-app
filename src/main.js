import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';
import EventsFilterView from './view/events-filter';

import {render, RenderPosition} from './utils/render';

import {mockEventItems} from './mock/mock-event-data';
import TripEventsPresenter from './presenter/trip-events-presenter';

const eventItems = mockEventItems;
console.log(eventItems);

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

const tripEventsPresenter = new TripEventsPresenter(eventsContainer);

renderUI();
tripEventsPresenter.init(eventItems);
