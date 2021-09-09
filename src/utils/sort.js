import dayjs from 'dayjs';
//Events Sort======================
export const getEventDuration = (start, end) => dayjs(start).diff(dayjs(end));

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByDuration = (eventA, eventB) => getEventDuration(eventA.dateFrom, eventA.dateTo) - getEventDuration(eventB.dateFrom, eventB.dateTo);

export const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;
//======================

