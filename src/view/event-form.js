import {nanoid} from 'nanoid';
import {capitalizeString, replaceSpaceToUnderscore, getOffersByType} from '../utils/utils';
import {formatDate, getRecentDate} from '../utils/date';
import {Types, dateFormat} from '../const/const';
import AbstractView from './abstract';

import {MOCK_OFFERS} from '../mock/mock-const';

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
  } = event;

  const arrayOfTypes = Object.values(Types);

  const eventTypesList = createEventTypesList(type, arrayOfTypes);
  const offersList = createOffersList(type, MOCK_OFFERS, offers);
  const photosList = createPhotosList(destination);

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
            value="${destination.place}"
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
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${destination.description}
          </p>
          ${photosList}
        </section>
      </section>
    </form>
  </li>`;
};

export default class EventForm extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEventFormTemplate(this._event);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }
}
