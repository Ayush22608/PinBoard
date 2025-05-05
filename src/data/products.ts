export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Taxi Driver',
    description: 'Classic movie poster featuring Robert De Niro',
    price: 400,
    image: '/posters/Taxi driver.jpeg',
    category: 'movies'
  },
  {
    id: '2',
    name: 'Fight Club',
    description: 'Cult classic movie poster',
    price: 450,
    image: '/posters/Fight club.jpeg',
    category: 'movies'
  },
  {
    id: '3',
    name: 'Stranger Things',
    description: 'Popular TV series poster',
    price: 400,
    image: '/posters/Stranger Things.jpeg',
    category: 'tv-shows'
  },
  {
    id: '4',
    name: 'Perfect Days',
    description: 'Beautiful artistic poster',
    price: 450,
    image: '/posters/Perfect days.jpeg',
    category: 'movies'
  },
  {
    id: '5',
    name: 'Pulp Fiction',
    description: 'Iconic Tarantino movie poster',
    price: 400,
    image: '/posters/Pulp fiction.jpeg',
    category: 'movies'
  },
  {
    id: '6',
    name: 'The Secret Life of Walter Mitty',
    description: 'Adventure drama movie poster',
    price: 450,
    image: '/posters/The secret life of walter mitty.jpeg',
    category: 'movies'
  },
  {
    id: '7',
    name: 'Oppenheimer',
    description: 'Christopher Nolan movie poster',
    price: 400,
    image: '/posters/Oppenheimer.jpeg',
    category: 'movies'
  }
];