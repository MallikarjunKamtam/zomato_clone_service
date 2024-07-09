export interface IGetProducts {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  currency: string;
  rating: number; // out of 5s
  tag: string;
}

export const dummyProductsList: IGetProducts[] = [
  {
    id: 1,
    name: 'Cheese Pizza',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Cheese+Pizza',
    price: 12.99,
    currency: 'USD',
    rating: 4.5,
    tag: 'Pizza',
  },
  {
    id: 2,
    name: 'Burger',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Burger',
    price: 8.99,
    currency: 'USD',

    rating: 4.2,
    tag: 'Fast Food',
  },
  {
    id: 3,
    name: 'Pasta',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Pasta',
    price: 10.99,
    currency: 'USD',

    rating: 4.3,
    tag: 'Italian',
  },
  {
    id: 4,
    name: 'Sushi',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Sushi',
    price: 14.99,
    currency: 'USD',

    rating: 4.7,
    tag: 'Japanese',
  },
  {
    id: 5,
    name: 'Salad',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Salad',
    price: 7.99,
    currency: 'USD',

    rating: 4.1,
    tag: 'Healthy',
  },
  {
    id: 6,
    name: 'Steak',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Steak',
    price: 19.99,
    currency: 'USD',

    rating: 4.8,
    tag: 'Grill',
  },
  {
    id: 7,
    name: 'Tacos',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Tacos',
    price: 9.99,
    currency: 'USD',

    rating: 4.4,
    tag: 'Mexican',
  },
  {
    id: 8,
    name: 'Ice Cream',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Ice+Cream',
    price: 5.99,
    currency: 'USD',

    rating: 4.6,
    tag: 'Dessert',
  },
  {
    id: 9,
    name: 'Coffee',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Coffee',
    price: 3.99,
    currency: 'USD',

    rating: 4.5,
    tag: 'Beverage',
  },
  {
    id: 10,
    name: 'Sandwich',
    imageUrl: 'https://dummyimage.com/600x400/000/fff&text=Sandwich',
    price: 6.99,
    currency: 'USD',

    rating: 4.3,
    tag: 'Snack',
  },
];
