import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {formatDate} from '../utils/utils';
import {dateFormat} from '../const/const';
dayjs.extend(duration);

const getEventDuration = (dateStart, dateEnd) => {
  const eventDuration = dayjs(dateStart) - dayjs(dateEnd);
  // todo Нужно еще вернуться к этой логике
  let days = dayjs.duration(eventDuration).days();
  days = days < 10
    ? days.toString().padStart(2, '0')
    : days;
  let hours = dayjs.duration(eventDuration).hours();
  hours = hours < 10
    ? hours.toString().padStart(2, '0')
    : hours;
  let minutes = dayjs.duration(eventDuration).minutes();
  minutes = minutes < 10
    ? minutes.toString().padStart(2, '0')
    : minutes;

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

export const createEventsItemTemplate = (event) => {

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
