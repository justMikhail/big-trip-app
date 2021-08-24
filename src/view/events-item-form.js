import {humanizeDateToType3, ucFirst} from '../utils/utils';
import {TYPES} from '../const/const';

const offersList = (offers, id) => {
  let offerTemplate = '';

  offers.forEach((offer) => {
    offerTemplate +=
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${id}" type="checkbox" name="event-offer-${offer.type}">
          <label class="event__offer-label" for="event-offer-${offer.type}-${id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
       </div>`;
  });

  return offerTemplate;
};

const photoListContainer = (destination) => {
  const photosCount = destination.pictures.length;

  const photosList = () => {
    let photosTemplate = '';
    const photosArray = destination.pictures;

    if (photosCount) {
      photosArray.forEach((photo) => {
        photosTemplate +=
          `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
      });
    }

    return photosTemplate;
  };

  return photosCount
    ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosList(destination)}
          </div>
        </div>`
    : '';
};

const eventTypes = (currentType, allTypes) => {
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
          ${ucFirst(type)}
        </label>
      </div>`;
  });

  return eventTypesTemplate;
};

export const createEventsItemForm = (event) => {

  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
  } = event;

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
                ${eventTypes(type, TYPES)}
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
                 value="${humanizeDateToType3(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                   value="${humanizeDateToType3(dateTo)}">
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
            ${offersList(offers, id)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${destination.description}
          </p>
          ${photoListContainer(destination)}
        </section>
      </section>
    </form>
  </li>`;
};
