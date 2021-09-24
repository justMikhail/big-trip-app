import Events from '../model/events';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this.getEvents(),
      this.getOffers(),
      this.getDestinations(),
    ])
      .catch(Api.catchError);
  }

  addEvent(event) {
    return this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(Events.adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(Events.adaptToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });
  }

  getEvents() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map(Events.adaptToClient));
  }

  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(Events.adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(Events.adaptToClient);
  }

  getDestinations() {
    return this._load({
      url: 'destinations',
      method: Method.GET,
    })
      .then(Api.toJSON)
      .then((destinations) => [...destinations]);
  }

  getOffers() {
    return this._load({
      url: 'offers',
      method: Method.GET,
    })
      .then(Api.toJSON)
      .then((offers) => [...offers]);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
