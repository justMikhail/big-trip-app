import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {humanizeDateToType1, humanizeDateToType2, humanizeDateToType3} from '../utils/utils';
dayjs.extend(duration);

const getEventDuration = (dateStart, dateEnd) => {
  const eventDuration = dayjs(dateStart) - dayjs(dateEnd);

  let days = dayjs.duration(eventDuration).days();
  days = days < 10
    ? `0${days}`
    : days;
  let hours = dayjs.duration(eventDuration).hours();
  hours = hours < 10
    ? `0${hours}`
    : hours;
  let minutes = dayjs.duration(eventDuration).minutes();
  minutes = minutes < 10
    ? `0${minutes}`
    : minutes;

  // todo возможно можно прописать данную логику лаконичней?
  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

export const createEventsItem = (event) => {

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

  const generateOffers = () => {
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

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">
        ${humanizeDateToType2(dateFrom)}
      </time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.place}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${humanizeDateToType3(dateFrom)}">
            ${humanizeDateToType1(dateFrom)}
          </time>
          &mdash;
          <time class="event__end-time" datetime="${humanizeDateToType3(dateTo)}">
            ${humanizeDateToType1(dateTo)}
          </time>
        </p>
        <p class="event__duration">${getEventDuration(dateTo, dateFrom)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffers()}
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
