import dayjs from 'dayjs';

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

// Fisher–Yates Shuffle
export const getShuffleArray = (originalArray) => {
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

export const randomizeArray = (arr) => arr.filter(() => Math.random() > 0.5);

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);

export const capitalizeString = (str) => {
  if (!str) {return str;}
  return str[0].toUpperCase() + str.slice(1);
};

export const replaceSpaceToUnderscore = (str) => str.replace(/\s+/g, '_');
