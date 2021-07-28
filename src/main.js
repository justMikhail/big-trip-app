import {createSiteMenuTemplate} from './view/createSiteMenuTemplate';
import {createTripInfoTemplate} from './view/createTripInfoTemplate';
import {createTripFilters} from './view/createTripFilters';
import {createTripSort} from './view/createTripSort';
//import {createTripEventsList} from './view/createTripEventsList';
import {createTripEventsItem} from './view/createTripEventsItem';
import {createEditEventsItemForm} from './view/createEditEventsItemForm';
import {createNewEvensItemForm} from './view/createNewEvensItemForm';

const EVENTS_ITEM_COUNT = 3;

const render = (container, template, where) => {
  container.insertAdjacentHTML(where, template);
};

const pageMain = document.querySelector('.page-main');
const headerTripMain = document.querySelector('.trip-main');
const headerMenuContainer = headerTripMain.querySelector('.trip-controls__navigation');
const tripFiltersContainer = headerTripMain.querySelector('.trip-controls__filters');
const tripEventsContainer = pageMain.querySelector('.trip-events');
const tripEventsList = tripEventsContainer.querySelector('.trip-events__list');

render(headerTripMain, createTripInfoTemplate(), 'afterBegin');
render(headerMenuContainer, createSiteMenuTemplate(), 'beforeEnd');
render(tripFiltersContainer, createTripFilters(), 'beforeEnd');
render(tripEventsContainer, createTripSort(), 'afterBegin');
//render(tripEventsContainer, createTripEventsList(), 'beforeEnd');

for (let i = 0; i < EVENTS_ITEM_COUNT; i++) {
  render(tripEventsList, createTripEventsItem(), 'beforeEnd');
}

render(tripEventsList, createEditEventsItemForm(), 'beforeEnd');
render(tripEventsList, createNewEvensItemForm(), 'afterBegin');


