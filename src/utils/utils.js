export const isOnline = () => window.navigator.onLine;

export const randomizeArray = (arr) => arr.filter(() => Math.random() > 0.5);

export const capitalizeString = (str) => {
  if (!str) {return str;}
  return str[0].toUpperCase() + str.slice(1);
};

export const replaceSpaceToUnderscore = (str) => str.replace(/\s+/g, '_');

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const getOffersByType = (type, offers) => {
  const currentOffers = offers.find((offer) => offer.type === type);
  return currentOffers.offers.length ? currentOffers.offers : [];
};

export const findDestination = (currentDestination, allDestination) => allDestination.find((item) => item.name === currentDestination);

export const checkDescriptionExist = (currentDestination, allDestination) => {
  const currentDestinationInfo = allDestination.find((item) => item.name === currentDestination);
  return Boolean(currentDestinationInfo.description);
};

export const checkPhotosExist = (currentDestination, allDestination) => {
  const currentDestinationInfo = allDestination.find((item) => item.name === currentDestination);
  return Boolean(currentDestinationInfo.pictures.length);
};
