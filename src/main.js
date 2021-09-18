import TripInfoView from './view/trip-info';
import TripControlsView from './view/trip-controls';

import EventsModel from './model/events-model';
import EventsFilterModel from './model/events-filter-model';

import {render, RenderPosition} from './utils/render';

import {mockEventItems} from './mock/mock-event-data';
import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsFilterPresenter from './presenter/events-filter-presenter';

const events = mockEventItems;

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const eventsFilterModel = new EventsFilterModel();

const pageHeaderContainer = document.querySelector('.page-header');
const tripMainInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripNavMenuContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const eventsFilterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
render(tripMainInfoContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
render(tripNavMenuContainer, new TripControlsView(), RenderPosition.BEFORE_END);

const eventsFilterPresenter = new EventsFilterPresenter(eventsFilterContainer, eventsFilterModel, eventsModel);
eventsFilterPresenter.init();

const pageMainContainer = document.querySelector('.page-main');
const eventsContainer = pageMainContainer.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter(eventsContainer, eventsModel, eventsFilterModel);
tripEventsPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  // console.log(evt.target.innerText);
  tripEventsPresenter.createNewEvent();
});
