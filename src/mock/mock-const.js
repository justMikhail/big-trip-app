export const EVENTS_ITEM_COUNT = 3;
export const EVENT_MIN_PRICE = 20;
export const EVENT_MAX_PRICE = 1000;
export const MAX_PHOTOS_COUNT = 5;
export const MIN_FRAGMENTS_COUNT = 1;
export const MAX_FRAGMENTS_COUNT = 5;
export const MAX_DAYS_GAP = 15;
export const MAX_MINUTE_GAP_GAP = 30;
export const MAX_HOUR_GAP = 12;

export const FRAGMENTS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const MOCK_OFFERS = [
  {
    type: 'taxi',
    offers: [
      {title: 'Upgrade to a business class', price: 190},
      {title: 'Choose the radio station', price: 30},
      {title: 'Choose temperature', price: 170},
      {title: 'Drive quickly', price: 100},
      {title: 'Drive slowly', price: 110},
    ],
  },
  {
    type: 'bus',
    offers: [
      {title: 'Infotainment system', price: 50},
      {title: 'Order meal', price: 100},
      {title: 'Choose seats', price: 190},
    ],
  },
  {
    type: 'train',
    offers: [
      {title: 'Book a taxi at the arrival point', price: 110},
      {title: 'Order a breakfast', price: 80},
      {title: 'Wake up at a certain time', price: 140},
    ],
  },
  {
    type: 'ship',
    offers: [
      {title: 'Choose meal', price: 130},
      {title: 'Choose seats', price: 160},
      {title: 'Upgrade to comfort class', price: 170},
      {title: 'Upgrade to business class', price: 150},
      {title: 'Add luggage', price: 100},
      {title: 'Business lounge', price: 40},
    ],
  },
  {
    type: 'drive',
    offers: [
      {title: 'Choose comfort class', price: 110},
      {title: 'Choose business class', price: 180},
    ],
  },
  {
    type: 'flight',
    offers: [
      {title: 'Choose meal', price: 120},
      {title: 'Choose seats', price: 90},
      {title: 'Upgrade to comfort class', price: 120},
      {title: 'Upgrade to business class', price: 120},
      {title: 'Add luggage', price: 170},
      {title: 'Business lounge', price: 160},
    ],
  },
  {
    type: 'check-in',
    offers: [
      {title: 'Choose the time of check-in', price: 70},
      {title: 'Choose the time of check-out', price: 190},
      {title: 'Add breakfast', price: 110},
      {title: 'Laundry', price: 140},
      {title: 'Order a meal from the restaurant', price: 30},
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'restaurant',
    offers: [
      {title: 'Choose live music', price: 150},
      {title: 'Choose VIP area', price: 70},
    ],
  },
];

export const Destinations = {
  CORUSANT: 'Coruscant',
  CLOUD_CITY: 'Cloud City',
  GUNGUN_CITY: 'Gungan City',
  MOS_EISELY: 'Mos Eisely',
  HOSNIAN_PRIME: 'Hosnian Prime',
  TATOOINE: 'Tatooine',
  KASHYYYK: 'Kashyyyk',
  BESPIN: 'Bespin',
  KAMIO: 'Kamino',
  ZONA_SEKOT: 'Zonama Sekot',
};
