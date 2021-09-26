import he from 'he';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {capitalizeString, replaceSpaceToUnderscore, getOffersByType, findDestination, checkDescriptionExist, checkPhotosExist} from '../utils/utils';
import {formatDate, getToDayDate} from '../utils/date';
import {EventType, dateFormat, CALENDAR_SETTINGS} from '../const/const';
import SmartView from '../abstract/abstract-smart';

const BLANK_EVENT = {
  type: EventType.TAXI,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  offers: [],
  dateFrom: getToDayDate(),
  dateTo: getToDayDate(),
  basePrice: 0,
  isFavorite: false,
};

const createOffersList = (offersByCurrentType, checkedOffers, isDisabled) => offersByCurrentType.map((offerByCurrentType, index) => {
  const isOfferChecked = checkedOffers.some((checkedOffer) => offerByCurrentType.title === checkedOffer.title);
  const underscoredOfferTitle = replaceSpaceToUnderscore(offerByCurrentType.title);

  return `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${underscoredOfferTitle}-${index}"
      type="checkbox"
      name="event-offer-${underscoredOfferTitle}"
      data-title = "${offerByCurrentType.title}"
      data-price = "${offerByCurrentType.price}"
      ${isOfferChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label class="event__offer-label" for="event-offer-${underscoredOfferTitle}-${index}">
      <span class="event__offer-title">${offerByCurrentType.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerByCurrentType.price}</span>
    </label>
    </div>`;
});

const createOffers = (currentType, allOffers, checkedOffers, isDisabled) => {
  const offersByCurrentType = getOffersByType(currentType, allOffers);
  const offersByCurrentTypeTemplate = createOffersList(offersByCurrentType, checkedOffers, isDisabled);

  return offersByCurrentType
    ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersByCurrentTypeTemplate.join('')}
      </div>
    </section>`
    : '';
};

const createPhotosList = (destination) => {
  const photos = destination.pictures;
  const photosCount = photos.length;

  let photosTemplate = '';

  photos.forEach((photo) => {
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

const createEventTypesList = (currentType, allTypes, isDisabled) => {
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
          ${isDisabled ? 'disabled' : ''}
        >
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
          ${capitalizeString(type)}
        </label>
      </div>`;
  });

  return eventTypesTemplate;
};

const createDestination = (destinationItem) =>  `<option value="${destinationItem}"></option>`;

const createDestinationsList = (destinations) => destinations.map((destination) => destination.name).map(createDestination).join('');

const createHideEventFormButton = (isDisabled) => (
  `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createEventTypeIcon = (type) => `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">`;

const createEventFormTemplate = (allOffers, allDestinations, isEditEvent, event) => {

  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    isDescription,
    isPhotos,
    isDisabled,
    isSaving,
    isDeleting,
  } = event;

  const EventTypes = Object.values(EventType);

  const eventTypesList = createEventTypesList(type, EventTypes, isDisabled);
  const destinationsList = createDestinationsList(allDestinations);
  const offersForCurrentEventType = createOffers(type, allOffers, offers);
  const infoAboutCurrentDestination = createDestinationInfo(destination, isDescription, isPhotos);
  const hideEventFormButton = createHideEventFormButton();
  const getDeleteButtonStatus = (boolean) => boolean ? 'Deleting' : 'Delete';
  const eventTypeIcon = createEventTypeIcon(type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${eventTypeIcon}
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"  ${isDisabled ? 'disabled' : ''}>
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
            value="${he.encode(destination.name)}"
            list="destination-list-1"
            ${isDisabled ? 'disabled' : ''}
            required
          >
            <datalist id="destination-list-1">
              ${destinationsList}
            </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formatDate(dateFrom, dateFormat.FULL)}"
            ${isDisabled ? 'disabled' : ''}
          >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${formatDate(dateTo, dateFormat.FULL)}"
              ${isDisabled ? 'disabled' : ''}
            >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="number"
            min="1"
            step="1"
            name="event-price"
            value="${basePrice}"
            ${isDisabled ? 'disabled' : ''}
            required>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
          ${isEditEvent ? getDeleteButtonStatus(isDeleting) : 'Cancel'}
        </button>
        ${isEditEvent ? hideEventFormButton : ''}
      </header>
      <section class="event__details">
        ${offersForCurrentEventType}
        ${infoAboutCurrentDestination}
      </section>
    </form>
  </li>`;
};

export default class EventForm extends SmartView {
  constructor(allOffers, allDestinations, isEditEvent, event = BLANK_EVENT) {
    super();
    this._state = EventForm.parsEventToState(event);
    this._allOffers = allOffers;
    this._allDestinations = allDestinations;
    this._isEditEvent = isEditEvent;

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._hideFormClickHandler = this._hideFormClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._focusOnDestinationChangeHandler = this._focusOnDestinationChangeHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);

    this._timeFromHandler = this._timeFromHandler.bind(this);
    this._timeToHandler = this._timeToHandler.bind(this);
    this._setDatePicker = this._setDatePicker.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventFormTemplate(this._allOffers, this._allDestinations, this._isEditEvent, this._state);
  }

  reset(event) {
    this.updateState(EventForm.parsEventToState(event));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    if (this._isEditEvent) {
      this.setHideFormClickHandler(this._callback.hideFormClick);
    }
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  setHideFormClickHandler(callback) {
    this._callback.hideFormClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._hideFormClickHandler);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._changeTypeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._changeDestinationHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('focus', this._focusOnDestinationChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._changePriceHandler);
    this.getElement()
      .querySelector('.event__section--offers')
      .addEventListener('change', this._changeOffersHandler);
    this._setDatePicker();
  }

  _setDatePicker() {
    this._checkResetDatePicker();

    this._datepickerStart = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        ...CALENDAR_SETTINGS,
        onChange: this._timeFromHandler,
      },
    ),
    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        ...CALENDAR_SETTINGS,
        minDate: this._datepickerStart.input.value,
        onChange: this._timeToHandler,
      },
    );
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateState({
      type: evt.target.value,
      offers: [],
    }, false);
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    this.updateState({
      destination: findDestination(evt.target.value, this._allDestinations),
      isDescription: checkDescriptionExist(evt.target.value, this._allDestinations),
      isPhotos: checkPhotosExist(evt.target.value, this._allDestinations),
    }, false);
  }

  _changeOffersHandler(evt) {
    const {price, title} = evt.target.dataset;
    this.updateState({
      offers: evt.target.checked
        ? [...this._state.offers, {title, price: Number(price)}]
        : [...this._state.offers.filter((offer) => offer.title !== title)],
    });
  }

  _checkResetDatePicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _focusOnDestinationChangeHandler(evt) {
    evt.preventDefault();
    evt.target.value = '';
    this.getElement().querySelector('.event__section--destination').innerHTML = '';
  }

  _timeFromHandler([userDate]) {
    this.updateState({
      dateFrom: userDate,
    });
  }

  _timeToHandler([userDate]) {
    this.updateState({
      dateTo: userDate,
    });
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    this.updateState({basePrice: Number(evt.target.value)}, true);
  }

  _hideFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.hideFormClick();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventForm.parseStateToEvent(this._state));
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventForm.parseStateToEvent(this._state));
  }

  static parsEventToState(event) {
    return {
      ...event,
      isDescription: Boolean(event.destination.description),
      isPhotos: Boolean(event.destination.pictures.length),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    state = {...state};
    delete state.isDescription;
    delete state.isPhotos;
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;
    return state;
  }
}

