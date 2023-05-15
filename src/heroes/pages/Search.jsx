import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components'
import { getHeroesByName } from '../helpers'

export const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { q = '' } = queryString.parse(location.search)
  const heroes = getHeroesByName(q)
  const displayNoResults = q !== '' && heroes.length === 0

  const { searchQuery, onInputChange } = useForm({
    searchQuery: q
  })

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`?q=${searchQuery}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearch}>
            <input
              className="form-control"
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search a hero"
              autoComplete="off"
              value={searchQuery}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === '' && (
            <div className="alert alert-primary animate__animated animate__fadeIn">
              Search a hero
            </div>
          )}
          {displayNoResults && (
            <div className="alert alert-danger animate__animated animate__fadeIn">
              No results for {q}
            </div>
          )}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  )
}
