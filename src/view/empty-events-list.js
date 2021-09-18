import AbstractView from '../abstract/abstract';
import {FilterType} from '../const/const';

const NoPointsTextType = {
  [FilterType.ALL]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyEventsListTemplate = (filterType) => {
  const emptyListMessage = NoPointsTextType[filterType];

  return `<p class="trip-events__msg">${emptyListMessage}</p>`;
};

export default class EmptyEventsList extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  getTemplate() {
    return createEmptyEventsListTemplate(this._state);
  }
}

