import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomElementFromArray, getRandomInteger, getShuffleArray, randomizeArray, getOffersByType} from '../utils/utils';
import {
  EVENTS_ITEM_COUNT,
  PLACES,
  MOCK_OFFERS,
  EVENT_MAX_PRICE,
  EVENT_MIN_PRICE,
  MAX_PHOTOS_COUNT,
  MAX_MINUTES_GAP,
  DATE_FORMAT,
  FRAGMENTS,
  MIN_FRAGMENTS_COUNT,
  MAX_FRAGMENTS_COUNT
} from './mock-const';

import {Types, MIN_EVENT_DURATION} from '../const/const';

const getRandomDescription = (placeName) => {
  const randomFragmentsCount = getRandomInteger(MIN_FRAGMENTS_COUNT, MAX_FRAGMENTS_COUNT);
  const generateTextFromFragments = () => getShuffleArray(FRAGMENTS).slice(0, randomFragmentsCount).join();
  const description = `${placeName} ${generateTextFromFragments()}`;

  return description;
};

const getRandomPhotos = () => new Array(getRandomInteger(0, MAX_PHOTOS_COUNT)).fill(null).map(() => ({
  src: `https://picsum.photos/300/200?r=${Math.random()}`,
  description: 'Photo description',
}));

const getDate = (from, gap) => dayjs(from).add (gap, 'minute');

const getRandomPrice = (min, max) => Math.round((getRandomInteger(min, max) / 10) * 10);

const getRandomCheckedOffers = (allOffers, currentType) => {
  const offersForCurrentType = getOffersByType(currentType, allOffers);

  return offersForCurrentType.length
    ? getShuffleArray([...offersForCurrentType].slice(0, getRandomInteger(0, Math.min(offersForCurrentType.length - 1, 3))))
    : [];
};

const getMockEvent = () => {

  const randomType = getRandomElementFromArray(Object.values(Types));
  const randomBasePrice = getRandomPrice(EVENT_MIN_PRICE, EVENT_MAX_PRICE);
  const randomDateFrom = getDate(dayjs(), getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP));
  const randomDateTo = getDate(randomDateFrom, getRandomInteger(MIN_EVENT_DURATION, MAX_MINUTES_GAP));
  const randomPlace = getRandomElementFromArray(PLACES);
  const randomDescription = getRandomDescription(randomPlace);
  const randomPictures = getRandomPhotos();
  const randomIndex = nanoid();
  const randomCheckedOffers = getRandomCheckedOffers(MOCK_OFFERS, randomType);

  return {
    type: randomType,
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
    offers: randomCheckedOffers,
  };
};

const getMockEvents = () => new Array(EVENTS_ITEM_COUNT).fill(null).map(getMockEvent);
export const mockEventItems = getMockEvents();
