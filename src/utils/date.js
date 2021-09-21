import dayjs from 'dayjs';
import {FilterType} from '../const/const';

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);

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

export const getDateDuration = (start, end) => dayjs(end).diff(dayjs(start));

export const getFormattedEventDuration = (eventDuration) => {
  const days = dayjs.duration(eventDuration).days().toString().padStart(2, '0');
  const hours = dayjs.duration(eventDuration).hours().toString().padStart(2, '0');
  const minutes = dayjs.duration(eventDuration).minutes().toString().padStart(2, '0');

  let dateString = `${minutes}M`;
  if (days > 0) {
    dateString = `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    dateString = `${hours}H ${minutes}M`;
  }

  return dateString;
};
