import './App.css';

import { useMovies } from './hooks/useMovies.js';
import { useSearch } from './hooks/useSearch.js'

import { Movies } from './components/Movies.jsx';
import { useEffect, useState } from 'react';




function App()
{
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()

  const { movies, loading, getMovies } = useMovies({ search, sort });

  // forma NO CONTROLADA
  const handleSubmit = (event) =>
  {
    event.preventDefault()
    //const { query } = Object.fromEntries(new window.FormData(event.target))  -> manera de recuperar TODOS los inputs
    // const query = fields.get('query') -> manera de recuperar 1 solo input
    getMovies({ search })
  }

  // forma controlada ( controlada por REACT )
  const handleChange = (event) =>
  {
    const newSearch = event.target.value
    updateSearch(newSearch) // forma controlada
    getMovies({ search: newSearch })
  }

  const handleSort = () =>
  {
    setSort(!sort);
  }

  useEffect(() =>
  {
    console.log('new getMovies received');
  }, [getMovies])



  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            required
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='The Matrix, The Avengers, Star Wars...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>

        {/* ERROR al buscar película */}
        {error && <p className='error'> {error} </p>}

      </header>

      <main>
        {
          loading
            ? <p>Cargando...</p>
            : <Movies movies={movies} />
        }

      </main>
    </div>
  );
}

export default App;
