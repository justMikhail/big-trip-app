import dayjs from 'dayjs';

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

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

export const humanizeDateToType1 = (dueDate) => dayjs(dueDate).format('HH:mm');

export const humanizeDateToType2 = (dueDate) => dayjs(dueDate).format('MMM DD');

export const humanizeDateToType3 = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');

export const ucFirst = (str) => {
  if (!str) {return str;}
  return str[0].toUpperCase() + str.slice(1);
};

