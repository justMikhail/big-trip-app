import AbstractObserver from '../abstract/abstract-observer';

export default class OffersModel extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = [...offers];
    this._notify();
  }

  getOffers() {
    return this._offers;
  }
}
