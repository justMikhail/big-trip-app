import dayjs from 'dayjs';

const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

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

const randomizeArray = (arr) => arr.filter(() => Math.random() > 0.5);

export const humanizeToTime = (dueDate) => dayjs(dueDate).format('HH:mm');

export const humanizeToMonthDay = (dueDate) => dayjs(dueDate).format('MMM DD');

export const humanizeToFullDate = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

export {
  getRandomInteger,
  getRandomElFromArray,
  getShuffleArray,
  randomizeArray
};

