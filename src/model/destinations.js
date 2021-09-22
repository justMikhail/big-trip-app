import AbstractObserver from '../abstract/abstract-observer';

export default class DestinationsModel extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = [...destinations];
    this._notify();
  }

  getDestinations() {
    return this._destinations;
  }
}

