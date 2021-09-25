import TripRouteInfoView from '../view/trip-route-info';
import {render, replace, remove, RenderPosition} from '../utils/render';

const compareByStartTime = (eventA, eventB) => eventA.dateFrom - eventB.dateFrom;

export default class TripRouteInfoPresenter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._tripRouteInfoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const events = this._getSortedEvents();

    if (events.length === 0) {
      return '';
    }

    const prevTripRouteInfoComponent = this._tripRouteInfoComponent;

    this._tripRouteInfoComponent = new TripRouteInfoView(events);

    if (prevTripRouteInfoComponent === null) {
      render(this._container, this._tripRouteInfoComponent, RenderPosition.AFTER_BEGIN);
      return;
    }

    replace(this._tripRouteInfoComponent, prevTripRouteInfoComponent);
    remove(prevTripRouteInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getSortedEvents() {
    return this._eventsModel.getEvents().slice().sort(compareByStartTime);
  }
}
