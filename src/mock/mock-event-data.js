import dayjs from 'dayjs';
import {getRandomElFromArray, getRandomInteger, getShuffleArray, randomizeArray} from '../utils/utils';
import {PLACES, TYPES, OFFERS} from './mock-const';

const generateDescription = (placeName) => {
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

const generatePhotos = () => new Array(getRandomInteger(1, 5)).fill().map(() => {
  `http://picsum.photos/248/152?r=${Math.random()}`;
});

//==================
const MAX_MINUTES_GAP = 7 * 24 * 60;
const MIN_EVENT_DURATION = 10;
const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
const getDate = (from, gap) => dayjs(from).add (gap, 'minute');
//==================

const generateEvent = () => {

  const randomDateFrom = getDate(dayjs(), getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP));
  const randomDateTo = getDate(randomDateFrom, getRandomInteger(MIN_EVENT_DURATION, MAX_MINUTES_GAP));
  const randomPlace = getRandomPlaceName(PLACES);
  const randomDescription = generateDescription(randomPlace);
  const randomPictures = generatePhotos();
  const randomType = getRandomElFromArray(TYPES);
  const randomOffers = randomizeArray(OFFERS);

  return {
    basePrice: '1500',
    dateForm: randomDateFrom.format(DATE_FORMAT),
    dateTo: randomDateTo.format(DATE_FORMAT),
    destination: {
      place: randomPlace,
      description: randomDescription,
      picture: randomPictures,
    },
    id: '0',
    isFavorite: Boolean(getRandomInteger()),
    offers: randomOffers,
    type: randomType,
  };
};

export {generateEvent};
