import EventsModel from '../model/events';
import {isOnline} from '../utils/utils';
import {SourceURL} from '../const/api-const';

const getSyncedPoints = (items) =>
  items
    .filter(({success}) => success)
    .map(({payload}) => payload.point);

const createStoreStructure = (items, key) =>
  items
    .reduce((acc, current) => ({...acc, [current[key]]: current}), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations, 'name');
          this._store.setStoreItems(items, SourceURL.DESTINATIONS);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getStoreItems(SourceURL.DESTINATIONS));

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, 'type');
          this._store.setStoreItems(items, SourceURL.OFFERS);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getStoreItems(SourceURL.OFFERS));

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(EventsModel.adaptToServer), 'id');
          this._store.setStoreItems(items, SourceURL.POINTS);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getStoreItems(SourceURL.POINTS));

    return Promise.resolve(storePoints.map(EventsModel.adaptToClient));
  }

  getData() {
    return Promise.all([
      this.getOffers(),
      this.getDestinations(),
      this.getPoints(),
    ])
      .catch(this._api.catchError);
  }

  updatePoint(point) {
    const storePoints = this._store.getStoreItems(SourceURL.POINTS);
    storePoints[point.id] = EventsModel.adaptToServer(point);

    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setStoreItems(storePoints, SourceURL.POINTS);
          return updatedPoint;
        });
    }

    this._store.setStoreItems(storePoints, SourceURL.POINTS);

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          const storePoints = this._store.getStoreItems(SourceURL.POINTS);
          storePoints[newPoint.id] = EventsModel.adaptToServer(newPoint);
          this._store.setStoreItems(storePoints, SourceURL.POINTS);

          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => {
          const storePoints = this._store.getStoreItems(SourceURL.POINTS);
          delete storePoints[point.id];
          this._store.setStoreItems(storePoints, SourceURL.POINTS);
        });
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getStoreItems(SourceURL.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);
          const items = createStoreStructure([...createdPoints, ...updatedPoints], 'id');
          this._store.setStoreItems(items, SourceURL.POINTS);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
