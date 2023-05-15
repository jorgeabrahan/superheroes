import { heroes } from '../data/heroes'

export const getHeroesByPublisher = (publisher) => {
  const publishers = ['DC Comics', 'Marvel Comics']
  if (!publishers.includes(publisher)) throw new Error(`${publisher} is not a valid publisher!`)
  return heroes.filter((heroe) => heroe.publisher === publisher)
}
