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
    name: 'Pulp Fiction',
    description: 'Iconic Tarantino movie poster',
    price: 400,
    image: '/posters/Pulp fiction.jpeg',
    category: 'movies'
  },
  {
    id: '4',
    name: 'Oppenheimer',
    description: 'Christopher Nolan movie poster',
    price: 400,
    image: '/posters/Oppenheimer.jpeg',
    category: 'movies'
  },
  {
    id: '5',
    name: 'The Secret Life of Walter Mitty',
    description: 'Adventure drama movie poster',
    price: 400,
    image: '/posters/The secret life of walter mitty.jpeg',
    category: 'movies'
  },
  {
    id: '6',
    name: 'Perfect Days',
    description: 'Contemporary drama movie poster',
    price: 400,
    image: '/posters/Perfect days.jpeg',
    category: 'movies'
  },
  {
    id: '7',
    name: 'Inglorious Basterds',
    description: 'Quentin Tarantino war film poster',
    price: 400,
    image: '/posters/Inglorious Basterds.jpeg',
    category: 'movies'
  },
  {
    id: '8',
    name: 'Kill Bill',
    description: 'Action-packed revenge film poster',
    price: 400,
    image: '/posters/Kill Bill.jpeg',
    category: 'movies'
  },
  {
    id: '9',
    name: 'Split',
    description: 'Psychological thriller movie poster',
    price: 400,
    image: '/posters/Split.jpeg',
    category: 'movies'
  },
  {
    id: '10',
    name: '2001: A Space Odyssey',
    description: 'Sci-fi masterpiece movie poster',
    price: 450,
    image: '/posters/2001 space odyssey.jpeg',
    category: 'movies'
  },
  {
    id: '11',
    name: 'La La Land',
    description: 'Musical romance movie poster',
    price: 400,
    image: '/posters/La La Land.jpeg',
    category: 'movies'
  },
  {
    id: '12',
    name: 'Memento',
    description: 'Psychological thriller movie poster',
    price: 400,
    image: '/posters/Momento.jpeg',
    category: 'movies'
  },
  {
    id: '13',
    name: 'The Batman',
    description: 'Superhero movie poster',
    price: 450,
    image: '/posters/The Batman.jpeg',
    category: 'movies'
  },
  {
    id: '14',
    name: 'Dead Poets Society',
    description: 'Drama movie poster',
    price: 400,
    image: '/posters/Dead Poet Society.jpeg',
    category: 'movies'
  },
  {
    id: '15',
    name: 'American Psycho',
    description: 'Psychological thriller movie poster',
    price: 400,
    image: '/posters/American psycho.jpeg',
    category: 'movies'
  },
  {
    id: '16',
    name: 'Stranger Things',
    description: 'Popular TV series poster',
    price: 400,
    image: '/posters/Stranger Things.jpeg',
    category: 'shows'
  },
  {
    id: '17',
    name: 'Dexter',
    description: 'Crime drama TV series poster',
    price: 400,
    image: '/posters/Dexter.jpeg',
    category: 'shows'
  }
];