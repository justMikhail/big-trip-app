const getRandomInteger = (min, max) => {
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

export {
  getRandomInteger,
  getRandomElFromArray,
  getShuffleArray,
  randomizeArray
};

