import dayjs from 'dayjs';

export const formatDate = (dueDate, format) => dayjs(dueDate).format(format);
