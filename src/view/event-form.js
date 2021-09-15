import {nanoid} from 'nanoid';
import {capitalizeString, replaceSpaceToUnderscore, getOffersByType, getDestination, getIsDescription, getIsPictures} from '../utils/utils';
import {formatDate, getRecentDate} from '../utils/date';
import {Types, dateFormat} from '../const/const';
import SmartView from './smart';

import {MOCK_OFFERS} from '../mock/mock-const';
import {allDestinationInfo} from '../mock/mock-event-data';

const createOffersList = (currentType, allOffers, checkedOffers) => {
  const offersByCurrentType = getOffersByType(currentType, allOffers);

  return offersByCurrentType.map((offerByCurrentType, index) => {
    const isOfferSelected = checkedOffers.some((checkedOffer) => offerByCurrentType.title === checkedOffer.title);
    const offerTitleWithoutSpace = replaceSpaceToUnderscore(offerByCurrentType.title);

    return `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offerTitleWithoutSpace}-${index}"
        type="checkbox"
        name="event-offer-${offerTitleWithoutSpace}"
        ${isOfferSelected ? 'checked' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offerTitleWithoutSpace}-${index}">
        <span class="event__offer-title">${offerByCurrentType.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offerByCurrentType.price}</span>
      </label>
    </div>`;
  });
};

const createOffers = (currentType, allOffers, checkedOffers, isOffers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers ${isOffers ? '' : 'visually-hidden'}">Offers</h3>
    <div class="event__available-offers">
      ${createOffersList(currentType, allOffers, checkedOffers)}
    </div>
  </section>`
);

const createPhotosList = (destination) => {
  const photosCount = destination.pictures.length;
  const photosArray = destination.pictures;
  let photosTemplate = '';

  photosArray.forEach((photo) => {
    photosTemplate +=
      `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
  });

  return photosCount
    ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosTemplate}
          </div>
        </div>`
    : '';
};

const createDestinationInfo = (destination, isDescription, isPhotos) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination ${isDescription || isPhotos ? '' : 'visually-hidden'}">Destination</h3>
      <p class="event__destination-description">
        ${isDescription ? destination.description : ''}
      </p>
      ${isPhotos ? createPhotosList(destination) : ''}
  </section>`
);

const createEventTypesList = (currentType, allTypes) => {
  let eventTypesTemplate = '';

  allTypes.map((type) => {
    eventTypesTemplate +=
      `<div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${currentType === type ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
          ${capitalizeString(type)}
        </label>
      </div>`;
  });

  return eventTypesTemplate;
};

const BLANK_EVENT = {
  type: Types.TAXI,
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: [],
  dateFrom: getRecentDate(),
  dateTo: getRecentDate(),
  basePrice: 0,
  isFavorite: false,
  id: nanoid(),
};

const createEventFormTemplate = (event) => {

  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    //id,
    offers,
    isOffers,
    isDescription,
    isPhotos,
  } = event;

  const arrayOfTypes = Object.values(Types);

  const eventTypesList = createEventTypesList(type, arrayOfTypes);
  const offersForCurrentEventType = createOffers(type, MOCK_OFFERS, offers, true);
  const infoAboutCurrentDestination = createDestinationInfo(destination, true, true);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesList}
              </fieldset>
            </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination.name}"
            list="destination-list-1"
          >
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                 value="${formatDate(dateFrom, dateFormat.FULL)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                   value="${formatDate(dateTo, dateFormat.FULL)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offersForCurrentEventType}
        ${infoAboutCurrentDestination}
      </section>
    </form>
  </li>`;
};

export default class EventForm extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();
    this._state = EventForm.parsEventToState(event);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventFormTemplate(this._state);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._formSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._changeTypeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._changeDestinationHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._changePriceHandler);
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateState({
      type: evt.target.value,
      offers: [],
      isOffers: Boolean(getOffersByType(evt.target.value, MOCK_OFFERS).length),
    });
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    this.updateState({
      destination: getDestination(evt.target.value, allDestinationInfo),
      isDescription: getIsDescription(evt.target.value, allDestinationInfo),
      isPhotos: getIsPictures(evt.target.value, allDestinationInfo),
    });
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    this.updateState({basePrice: evt.target.value}, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventForm.parseStateToEvent(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parsEventToState(event) {
    return {
      ...event,
      isOffers: Boolean(event.offers.length),
      isPhotos: Boolean(event.destination.pictures.length),
      isDescription: Boolean(event.destination.description),
    };
  }

  static parseStateToEvent(state) {
    state = {...state};
    delete state.isOffers;
    delete state.isPhotos;
    delete state.isDescription;

    return state;
  }
}

