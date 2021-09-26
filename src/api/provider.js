import EventsModel from '../model/events';
import {isOnline} from '../utils/utils';
import {SourceURL} from '../const/api-const';

const getSyncedEvents = (items) =>
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

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(EventsModel.adaptToServer), 'id');
          this._store.setStoreItems(items, SourceURL.POINTS);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getStoreItems(SourceURL.POINTS));

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  getData() {
    return Promise.all([
      this.getEvents(),
      this.getOffers(),
      this.getDestinations(),
    ])
      .catch(this._api.catchError);
  }

  updateEvent(event) {
    const storeEvents = this._store.getStoreItems(SourceURL.POINTS);
    storeEvents[event.id] = EventsModel.adaptToServer(event);

    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._store.setStoreItems(storeEvents, SourceURL.POINTS);
          return updatedEvent;
        });
    }

    this._store.setStoreItems(storeEvents, SourceURL.POINTS);

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          const storeEvents = this._store.getStoreItems(SourceURL.POINTS);
          storeEvents[newEvent.id] = EventsModel.adaptToServer(newEvent);
          this._store.setStoreItems(storeEvents, SourceURL.POINTS);

          return newEvent;
        });
    }

    return Promise.reject(new Error('Add event failed'));
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => {
          const storeEvents = this._store.getStoreItems(SourceURL.POINTS);
          delete storeEvents[event.id];
          this._store.setStoreItems(storeEvents, SourceURL.POINTS);
        });
    }

    return Promise.reject(new Error('Delete event failed'));
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._store.getStoreItems(SourceURL.POINTS));

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const items = createStoreStructure([...createdEvents, ...updatedEvents], 'id');
          this._store.setStoreItems(items, SourceURL.POINTS);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
