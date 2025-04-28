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
    name: 'The Godfather',
    description: 'Iconic movie poster',
    price: 400,
    image: '/posters/The Godfather.jpeg',
    category: 'movies'
  },
  {
    id: '6',
    name: 'Breaking Bad',
    description: 'Award-winning TV series poster',
    price: 450,
    image: '/posters/Breaking Bad.jpeg',
    category: 'tv-shows'
  },
  {
    id: '7',
    name: 'Death Note',
    description: 'Popular anime series poster',
    price: 400,
    image: '/posters/Death Note.jpeg',
    category: 'anime'
  },
  {
    id: '8',
    name: 'Attack on Titan',
    description: 'Action-packed anime poster',
    price: 450,
    image: '/posters/Attack on Titan.jpeg',
    category: 'anime'
  }
];