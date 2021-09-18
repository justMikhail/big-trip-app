import dayjs from 'dayjs';
import {FilterType} from '../const/const';

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);

export const getDateDuration = (start, end) => dayjs(start).diff(dayjs(end));

export const getToDayDate = () => dayjs().toDate();

const getActiveEvents = (events) => events.filter((event) => event.dateFrom < getToDayDate() && event.dateTo > getToDayDate());
const getFutureEvents = (events) => events.filter((event) => event.dateFrom >= getToDayDate());
const getPastEvents = (events) => events.filter((event) => event.dateTo < getToDayDate());

export const filter = {
  [FilterType.ALL]: (events) => events,
  [FilterType.FUTURE]: (events) => [...getActiveEvents(events), ...getFutureEvents(events)],
  [FilterType.PAST]: (events) => [...getPastEvents(events), ...getActiveEvents(events)],
};
