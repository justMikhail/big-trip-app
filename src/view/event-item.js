import AbstractView from './abstract';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {formatDate, getDateDuration} from '../utils/date';
import {dateFormat} from '../const/const';

dayjs.extend(duration);

const getEventDuration = (dateStart, dateEnd) => {
  const eventDuration = getDateDuration(dateStart, dateEnd);

  const days = dayjs.duration(eventDuration).days().toString().padStart(2, '0');
  const hours = dayjs.duration(eventDuration).hours().toString().padStart(2, '0');
  const minutes = dayjs.duration(eventDuration).minutes().toString().padStart(2, '0');

  let dateString = `${minutes}M`;
  if (days > 0) {
    dateString = `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    dateString = `${hours}H ${minutes}M`;
  }

  return dateString;
};

const generateOffers = (offers) => {
  let offersMarkup = '';

  offers.forEach((offer) => {
    offersMarkup += `<li class="event__offer">
         <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.price}</span>
         </li>`;
  });
  return offersMarkup;
};

const createEventItemTemplate = (event) => {

  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type,
  } = event;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn  event__favorite-btn--active'
    : 'event__favorite-btn';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">
        ${formatDate(dateFrom, dateFormat.MONTH_DAY)}
      </time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.place}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatDate(dateFrom, dateFormat.FULL)}">
            ${formatDate(dateFrom, dateFormat.HOURS_MINUTES)}
          </time>
          &mdash;
          <time class="event__end-time" datetime="${formatDate(dateTo, dateFormat.FULL)}">
            ${formatDate(dateTo, dateFormat.HOURS_MINUTES)}
          </time>
        </p>
        <p class="event__duration">${getEventDuration(dateTo, dateFrom)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffers(offers)}
      </ul>
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path
            d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class EventItem extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._showFormClickHandler = this._showFormClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _showFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setShowFormClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._showFormClickHandler);
  }
}
