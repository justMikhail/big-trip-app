import dayjs from 'dayjs';
import {getRandomElFromArray, getRandomInteger, getShuffleArray, randomizeArray} from '../utils/utils';
import {
  PLACES,
  OFFERS,
  EVENT_MAX_PRICE,
  EVENT_MIN_PRICE,
  MAX_PHOTOS_COUNT
} from './mock-const';

import {
  TYPES,
  MAX_MINUTES_GAP,
  MIN_EVENT_DURATION,
  DATE_FORMAT
} from '../const/const';

const getRandomDescription = (placeName) => {
  const MIN_FRAGMENTS_COUNT = 1;
  const MAX_FRAGMENTS_COUNT = 5;

  const randomFragmentsCount = getRandomInteger(MIN_FRAGMENTS_COUNT, MAX_FRAGMENTS_COUNT);

  const fragments = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const generateTextFromFragments = () => getShuffleArray(fragments).slice(0, randomFragmentsCount).join();
  const description = `${placeName} ${generateTextFromFragments()}`;

  return description;
};

const getRandomPlaceName = (places) => {
  const randomPlace = places[getRandomInteger(0, places.length - 1)];
  return randomPlace;
};

const getRandomPhotos = () => new Array(getRandomInteger(0, MAX_PHOTOS_COUNT)).fill(null).map(() => ({
  src: `https://picsum.photos/300/200?r=${Math.random()}`,
  description: 'Photo description',
}));


const getDate = (from, gap) => dayjs(from).add (gap, 'minute');

const getRandomPrice = (min, max) => Math.round((getRandomInteger(min, max) / 10) * 10);

let eventIndex = 0;

const getMockEvents = () => {

  const randomBasePrice = getRandomPrice(EVENT_MIN_PRICE, EVENT_MAX_PRICE);
  const randomDateFrom = getDate(dayjs(), getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP));
  const randomDateTo = getDate(randomDateFrom, getRandomInteger(MIN_EVENT_DURATION, MAX_MINUTES_GAP));
  const randomPlace = getRandomPlaceName(PLACES);
  const randomDescription = getRandomDescription(randomPlace);
  const randomPictures = getRandomPhotos();
  const randomIndex = eventIndex++;
  const randomOffers = randomizeArray(OFFERS);
  const randomType = getRandomElFromArray(TYPES);

  return {
    basePrice: randomBasePrice,
    dateFrom: randomDateFrom.format(DATE_FORMAT),
    dateTo: randomDateTo.format(DATE_FORMAT),
    destination: {
      place: randomPlace,
      description: randomDescription,
      pictures: randomPictures,
    },
    id: randomIndex,
    isFavorite: Boolean(getRandomInteger()),
    offers: randomOffers,
    type: randomType,
  };
};

export {getMockEvents};
