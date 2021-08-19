const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElFromArray = (array) => array[getRandomInteger(0, array.length - 1)];

export {
  getRandomInteger,
  getRandomElFromArray
};

