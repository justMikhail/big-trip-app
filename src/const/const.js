export const EventType = {
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

export const NavMenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const FilterType = {
  ALL: 'EVERYTHING',
  FUTURE: 'future',
  PAST: 'past',
};

export const SortType = {
  DEFAULT: 'day-down',
  PRICE_DOWN: 'price-down',
  DURATION_DOWN: 'duration-down',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const dateFormat = {
  HOURS_MINUTES: 'HH:mm',
  MONTH_DAY: 'MMM DD',
  FULL: 'YY/MM/DD HH:mm',
};

export const ViewMode = {
  DEFAULT: 'DEFAULT',
  SHOWING_FORM: 'SHOWING_FORM',
};

export const CALENDAR_SETTINGS = {
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'm/d/y H:i',
  enableTime: true,
  'time_24hr': true,
};

export const Color = {
  BASIC_WHITE: '#ffffff',
  BASIC_BLACK: '#000000',
  PRIMARY_COLOR: '#078ff0',
  SECONDARY_COLOR: '#708090',
};

export const ButtonState = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const SHAKE_TIMEOUT = 600;
