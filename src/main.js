import TripInfoView from './view/trip-info';
import TripNavView from './view/trip-nav';

import EventsModel from './model/events-model';
import EventsFilterModel from './model/events-filter-model';

import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsFilterPresenter from './presenter/events-filter-presenter';
import {render, RenderPosition} from './utils/render';
import {NavMenuItem} from './const/const';

import {mockEventItems} from './mock/mock-event-data';
const events = mockEventItems;

const eventsModel = new EventsModel();
eventsModel.setEvents(events);
const eventsFilterModel = new EventsFilterModel();

const pageHeaderContainer = document.querySelector('.page-header');
const tripMainInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripNavMenuContainer = pageHeaderContainer.querySelector('.trip-controls__navigation');
const eventsFilterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const tripNavMenu = new TripNavView();
render(tripMainInfoContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
render(tripNavMenuContainer, tripNavMenu, RenderPosition.BEFORE_END);

const eventsFilterPresenter = new EventsFilterPresenter(eventsFilterContainer, eventsFilterModel, eventsModel);
eventsFilterPresenter.init();

const pageMainContainer = document.querySelector('.page-main');
const eventsContainer = pageMainContainer.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter(eventsContainer, eventsModel, eventsFilterModel);
tripEventsPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripEventsPresenter.createNewEvent();
});

const handleAppMenuClick = (menuItem) => {
  switch (menuItem) {
    case NavMenuItem.TABLE:
      tripEventsPresenter.init();
      // Скрыть статистику
      break;
    case NavMenuItem.STATS:
      tripEventsPresenter.destroy();
      // Показать статистику
      break;
  }
};

tripNavMenu.setNavMenuClickHandler(handleAppMenuClick);
