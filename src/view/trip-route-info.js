import AbstractView from '../abstract/abstract';
import dayjs from 'dayjs';

const calculateTripCost = (events) => {
  const baseEventsPrices = events.map((event) => event.basePrice);
  const sumBaseEventsPrices = baseEventsPrices.reduce((a, b) => a + b);

  const extraOffers = events.map((event) => event.offers).flat();
  const extraOffersPrices = extraOffers.map((offer) => offer.price);
  const sumExtraOffersPrices = extraOffersPrices.reduce((a, b) => a + b, 0);

  return sumBaseEventsPrices + sumExtraOffersPrices;
};

const createTripCost = (events) => {
  const calculatedTripCost = calculateTripCost(events);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculatedTripCost}</span>
    </p>`
  );
};

const getTripRoute = (events) => {
  const destinations = events.map((event) => event.destination.name);
  const uniqueDestinations = [...new Set(destinations)];
  let tripRoute;

  switch (uniqueDestinations.length) {
    case 0:
      tripRoute = '';
      break;
    case 1:
      tripRoute = `<h1 class="trip-info__title">${uniqueDestinations[0]}</h1>`;
      break;
    case 2:
      tripRoute = `<h1 class="trip-info__title">${uniqueDestinations[0]} &mdash; ${uniqueDestinations[1]}</h1>`;
      break;
    case 3:
      tripRoute = `<h1 class="trip-info__title">${uniqueDestinations[0]} &mdash; ${uniqueDestinations[1]} &mdash; ${uniqueDestinations[2]}</h1>`;
      break;
    default:
      tripRoute = `<h1 class="trip-info__title">${uniqueDestinations[0]} &mdash; ... &mdash; ${uniqueDestinations[uniqueDestinations.length - 1]}</h1>`;
      break;
  }

  return tripRoute;
};

const getTripStartAndFinishDates = (events) => {
  let startDates = events[0].dateFrom;
  let finishDates = events[events.length-1].dateTo;
  startDates = dayjs(startDates).format('MMM DD');
  finishDates = dayjs(finishDates).format('DD');

  return `<p class="trip-info__dates">${startDates}&nbsp;&mdash;&nbsp;${finishDates}</p>`;
};

const createTripRouteInfoTemplate = (events) => {
  const tripRoute = getTripRoute(events);
  const tripStartAndFinishDates = getTripStartAndFinishDates(events);
  const tripCost = createTripCost(events);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${tripRoute}
      ${tripStartAndFinishDates}
    </div>
    ${tripCost}
  </section>
  `;
};

export default class TripRouteInfo extends AbstractView{
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripRouteInfoTemplate(this._event);
  }
}
