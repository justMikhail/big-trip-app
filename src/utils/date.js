import dayjs from 'dayjs';

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);

export const getDateDuration = (start, end) => dayjs(start).diff(dayjs(end));

export const getRecentDate = () => dayjs().toDate();
