import {getRandomInteger} from '../utils/utils';

const generateEvent = () => ({
  basePrice: '1500',
  dateForm: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: '$Destination$',
  id: '0',
  isFavorite: Boolean(getRandomInteger()),
  offers: [],
  type: 'Taxi',
});

export {generateEvent};
