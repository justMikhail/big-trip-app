import { getDateDuration } from './date';

export const calculateMoney = (events) => {
  const money = {};
  events.forEach(({type, basePrice}) => {
    money[type] = money[type] !== undefined ? money[type] + basePrice : basePrice;
  });
  return new Map(Object.entries(money).sort((a, b) => b[1] - a[1]));
};

export const calculateType = (events) => {
  const types = {};
  events.forEach(({type}) => {
    types[type] = types[type] !== undefined ? types[type] + 1 : 1;
  });
  return new Map(Object.entries(types).sort((a, b) => b[1] - a[1]));
};

export const calculateTime = (events) => {
  const time = {};
  events.forEach(({type, dateFrom, dateTo}) => {
    time[type] = time[type] !== undefined ? time[type] + getDateDuration(dateFrom, dateTo) : getDateDuration(dateFrom, dateTo);
  });
  return new Map(Object.entries(time).sort((a, b) => b[1] - a[1]));
};
