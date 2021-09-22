import Api from './api/api';
import TripInfoView from './view/trip-info';
import TripNavView from './view/trip-nav';
import TripStatsView from './view/trip-stats';
import NewEventButton from './view/new-event-button';

import EventsModel from './model/events-model';
import EventsFilterModel from './model/events-filter-model';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import TripEventsPresenter from './presenter/trip-events-presenter';
import EventsFilterPresenter from './presenter/events-filter-presenter';

import {render, remove, RenderPosition} from './utils/render';
import {UpdateType, NavMenuItem} from './const/const';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip/';
const AUTHORIZATION = 'Basic 4upMo2jqcHn3jgN9g9aX8';
const api = new Api(END_POINT, AUTHORIZATION);

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

const eventsFilterPresenter = new EventsFilterPresenter(eventsFilterContainer, eventsFilterModel, eventsModel);
const tripEventsPresenter = new TripEventsPresenter(pageMainContainer, eventsModel, eventsFilterModel, offersModel, destinationsModel, api);

const tripNavMenuComponent = new TripNavView();
const newEventButtonComponent = new NewEventButton();
newEventButtonComponent.getElement().disabled = true;

render(tripMainInfoContainer, new TripInfoView, RenderPosition.AFTER_BEGIN);
render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
render(tripMainInfoContainer, newEventButtonComponent, RenderPosition.BEFORE_END);

eventsFilterPresenter.init();
tripEventsPresenter.init();

let tripStatsComponent = null;

const handleEventNewFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
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
    eventsModel.setEvents(UpdateType.INIT, events);
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    console.log(eventsModel.getEvents());
    console.log(offersModel.getOffers());
    console.log(destinationsModel.getDestinations());
  })
  .then(() => {
    newEventButtonComponent.getElement().disabled = false;
    render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
    tripNavMenuComponent.setNavMenuClickHandler(handleNavMenuClick);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    newEventButtonComponent.getElement().disabled = false;
    render(tripNavMenuContainer, tripNavMenuComponent, RenderPosition.AFTER_BEGIN);
    tripNavMenuComponent.setNavMenuClickHandler(handleNavMenuClick);
  });
