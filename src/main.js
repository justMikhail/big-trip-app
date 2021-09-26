import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

import TripRouteInfoPresenter from './presenter/trip-route-info';
import TripEventsPresenter from './presenter/trip-events';
import EventsFilterPresenter from './presenter/events-filter';

import EventsModel from './model/events';
import EventsFilterModel from './model/events-filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import TripNavView from './view/trip-nav';
import TripStatsView from './view/trip-stats';
import NewEventButton from './view/new-event-button';

import {render, remove, RenderPosition} from './utils/render';
import {isOnline} from './utils/utils';
import {toast} from './utils/toast';
import {UpdateType, NavMenuItem, Color} from './const/const';
import {END_POINT, AUTHORIZATION, STORE_NAME} from './const/api-const';

const apiServer = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const api = new Provider(apiServer, store);

const pageHeaderContainer = document.querySelector('.page-header');
const tripMainInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripNavMenuContainer = pageHeaderContainer.querySelector('.trip-controls');
const eventsFilterContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const pageMainContainer = pageMain.querySelector('.page-body__container');

const eventsModel = new EventsModel();
const eventsFilterModel = new EventsFilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const tripRouteInfoPresenter = new TripRouteInfoPresenter(tripMainInfoContainer, eventsModel);
const eventsFilterPresenter = new EventsFilterPresenter(eventsFilterContainer, eventsFilterModel, eventsModel);
const tripEventsPresenter = new TripEventsPresenter(pageMainContainer, eventsModel, eventsFilterModel, offersModel, destinationsModel, api);

const tripNavMenuComponent = new TripNavView();
const newEventButtonComponent = new NewEventButton();
newEventButtonComponent.getElement().disabled = true;

render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
render(tripMainInfoContainer, newEventButtonComponent, RenderPosition.BEFORE_END);

tripRouteInfoPresenter.init();
eventsFilterPresenter.init();
tripEventsPresenter.init();

let tripStatsComponent = null;

const handleEventNewFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  if (!isOnline()) {
    toast('You can\'t create new event for trip while you\'re offline');
    return;
  }
  evt.preventDefault();
  tripEventsPresenter.createNewEvent(handleEventNewFormClose);
  newEventButtonComponent.getElement().disabled = true;
});

const handleNavMenuClick = (menuItem) => {
  switch (menuItem) {
    case NavMenuItem.TABLE:
      tripEventsPresenter.destroy();
      tripEventsPresenter.init();
      remove(tripStatsComponent);
      pageMainContainer.classList.remove('no-after');
      eventsFilterPresenter.removeDisabled();
      newEventButtonComponent.getElement().disabled = false;
      break;
    case NavMenuItem.STATS:
      tripEventsPresenter.destroy();
      tripStatsComponent = new TripStatsView(eventsModel.getEvents());
      render(pageMainContainer, tripStatsComponent, RenderPosition.BEFORE_END);
      pageMainContainer.classList.add('no-after');
      eventsFilterPresenter.setDisabled();
      newEventButtonComponent.getElement().disabled = true;
      break;
  }
};

api.getData()
  .then(([events, offers, destinations]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .then(() => {
    newEventButtonComponent.getElement().disabled = false;
    render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
    tripNavMenuComponent.setNavMenuClickHandler(handleNavMenuClick);
  })
  .catch(() => {
    newEventButtonComponent.getElement().disabled = false;
    render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
    tripNavMenuComponent.setNavMenuClickHandler(handleNavMenuClick);
    eventsModel.setEvents(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  newEventButtonComponent.getElement().disabled = false;
  pageHeaderContainer.style.backgroundColor = `${Color.PRIMARY_COLOR}`;
  pageHeaderContainer.style.backgroundImage = 'url("../img/header-bg.png")';
  toast('ONLINE');
  api.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  pageHeaderContainer.style.backgroundColor = `${Color.SECONDARY_COLOR}`;
  pageHeaderContainer.style.backgroundImage = 'none';
  toast('Connection lost. Please, check your internet connection');
});

