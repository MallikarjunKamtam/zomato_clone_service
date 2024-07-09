export interface IGetRestaurent {
  id: number;
  name: string;
  isOpen: boolean;
  location: string;
  phoneNumber: number;
  email: string;
  timings: {
    open: string;
    close: string;
  };
  ownerName: string;
  rating: number;
  menu: number[];
}

export const restaurentsList: IGetRestaurent[] = [
  {
    id: 1,
    name: 'Gourmet Delight',
    isOpen: true,
    location: '40.712776, -74.005974',
    phoneNumber: 1234567890,
    email: 'contact@gourmetdelight.com',
    timings: {
      open: '10:00 AM',
      close: '10:00 PM',
    },
    ownerName: 'John Doe',
    menu: [1, 2, 3, 4, 5, 6, 10],
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Spice Symphony',
    isOpen: false,
    location: '34.052235, -118.243683',
    phoneNumber: 2345678901,
    email: 'info@spicesymphony.com',
    timings: {
      open: '11:00 AM',
      close: '11:00 PM',
    },
    ownerName: 'Jane Smith',
    menu: [1, 2, 3, 4, 5, 6, 7, 10],
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Pasta Palace',
    isOpen: true,
    location: '41.878113, -87.629799',
    phoneNumber: 3456789012,
    email: 'reservations@pastapalace.com',
    timings: {
      open: '9:00 AM',
      close: '10:00 PM',
    },
    ownerName: 'Michael Johnson',
    menu: [5, 6, 7, 8, 9, 10],
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Sushi World',
    isOpen: false,
    location: '34.052235, -118.243683',
    phoneNumber: 4567890123,
    email: 'contact@sushiworld.com',
    timings: {
      open: '12:00 PM',
      close: '10:00 PM',
    },
    ownerName: 'Emily Davis',
    menu: [1, 2, 9, 10],
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Taco Haven',
    isOpen: true,
    location: '29.760427, -95.369804',
    phoneNumber: 5678901234,
    email: 'hello@tacohaven.com',
    timings: {
      open: '8:00 AM',
      close: '8:00 PM',
    },
    ownerName: 'Chris Martinez',
    menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rating: 4.2,
  },
  {
    id: 6,
    name: 'Burger Barn',
    isOpen: false,
    location: '33.448376, -112.074036',
    phoneNumber: 6789012345,
    email: 'contact@burgerbarn.com',
    timings: {
      open: '10:00 AM',
      close: '9:00 PM',
    },
    ownerName: 'Lisa Wilson',
    menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rating: 4.1,
  },
  {
    id: 7,
    name: 'Curry Corner',
    isOpen: true,
    location: '39.739236, -104.990251',
    phoneNumber: 7890123456,
    email: 'info@currycorner.com',
    timings: {
      open: '11:00 AM',
      close: '10:00 PM',
    },
    ownerName: 'David Brown',
    menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rating: 4.4,
  },
  {
    id: 8,
    name: 'Pizza Paradise',
    isOpen: false,
    location: '32.715738, -117.161084',
    phoneNumber: 8901234567,
    email: 'order@pizzaparadise.com',
    timings: {
      open: '10:00 AM',
      close: '12:00 AM',
    },
    ownerName: 'Sarah Lee',
    menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rating: 4.8,
  },
  {
    id: 9,
    name: 'Vegan Vibes',
    isOpen: true,
    location: '47.606209, -122.332071',
    phoneNumber: 9012345678,
    email: 'hello@veganvibes.com',
    timings: {
      open: '9:00 AM',
      close: '9:00 PM',
    },
    ownerName: 'Laura White',
    menu: [1, 2, 3, 4, 8, 9, 10],
    rating: 4.9,
  },
  {
    id: 10,
    name: 'BBQ Bliss',
    isOpen: false,
    location: '38.907192, -77.036871',
    phoneNumber: 1234567891,
    email: 'info@bbqbliss.com',
    timings: {
      open: '12:00 PM',
      close: '10:00 PM',
    },
    ownerName: 'Kevin Harris',
    menu: [1, 2, 3, 4, 5, 6, 10],
    rating: 4.0,
  },
];
