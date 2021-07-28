import {createSiteMenuTemplate} from './view/createSiteMenuTemplate';

const render = (container, template, where) => {
  container.insertAdjacentHTML(where, template);
};

const headerTripMain = document.querySelector('.trip-main');

const headerMenuContainer = headerTripMain.querySelector('.trip-controls__navigation');

render(headerMenuContainer, createSiteMenuTemplate(), 'beforeEnd');

