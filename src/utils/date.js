import dayjs from 'dayjs';
import {FilterType} from '../const/const';

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);

export const getDateDuration = (start, end) => dayjs(start).diff(dayjs(end));

export const getToDayDate = () => dayjs().toDate();
const toDayDate = getToDayDate();

const getActiveEvents = (events) => events.filter((event) => event.dateFrom < toDayDate && event.dateTo > toDayDate);
const getFutureEvents = (events) => events.filter((event) => event.dateFrom >= toDayDate);
const getPastEvents = (events) => events.filter((event) => event.dateTo < toDayDate);

export const filter = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => [...getActiveEvents(events), ...getFutureEvents(events)],
  [FilterType.PAST]: (events) => [...getPastEvents(events), ...getActiveEvents(events)],
};
