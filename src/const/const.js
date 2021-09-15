export const Types = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

export const MIN_EVENT_DURATION = 10;

export const dateFormat = {
  HOURS_MINUTES: 'HH:mm',
  MONTH_DAY: 'MMM DD',
  FULL: 'YY/MM/DD HH:mm',
};

export const ViewMode = {
  DEFAULT: 'DEFAULT',
  SHOWING_FORM: 'SHOWING_FORM',
};

export const SortType = {
  DEFAULT: 'day-down',
  PRICE_DOWN: 'price-down',
  DURATION_DOWN: 'duration-down',
};

export const CALENDAR_SETTINGS = {
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'm/d/y H:i',
  enableTime: true,
  'time_24hr': true,
};
