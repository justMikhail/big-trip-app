import dayjs from 'dayjs';
import {getDateDuration} from './date';

export const sortByDate = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

export const sortByDuration = (eventA, eventB) => getDateDuration(eventA.dateFrom, eventA.dateTo) - getDateDuration(eventB.dateFrom, eventB.dateTo);

export const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

