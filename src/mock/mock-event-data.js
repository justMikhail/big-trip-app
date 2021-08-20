import {getRandomInteger, getRandomElFromArray} from '../utils/utils';
import {TYPES} from '../const/const';

const PLACES = ['Тайпока-Сити', 'Джеда-Сити', 'Облачный город', 'Храм Джедаев', 'Корусант', 'Коррибан '];

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

  // Fisher–Yates Shuffle
  const getShuffleArray = (originalArray) => {
    let currentIndex = originalArray.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = originalArray[currentIndex];
      originalArray[currentIndex] = originalArray[randomIndex];
      originalArray[randomIndex] = temporaryValue;
    }

    const arrayAfterShuffle = originalArray;

    return arrayAfterShuffle;
  };

  const generateTextFromFragments = () => getShuffleArray(fragments).slice(0, randomFragmentsCount).join();
  const description = `${placeName} ${generateTextFromFragments()}`;

  return description;
};

const getRandomPlaceName = (places) => {
  const randomPlace = places[getRandomInteger(0, places.length - 1)];
  return randomPlace;
};

const generateEvent = () => {

  const randomPlace = getRandomPlaceName(PLACES);
  const randomDescription = generateDescription(randomPlace);
  //const randomPictures = generatePhotos();
  const randomType = getRandomElFromArray(TYPES);

  return {
    basePrice: '1500',
    dateForm: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      place: randomPlace,
      description: randomDescription,
      //randomPictures,
    },
    id: '0',
    isFavorite: Boolean(getRandomInteger()),
    offers: [],
    type: randomType,
  };
};

export {generateEvent};
