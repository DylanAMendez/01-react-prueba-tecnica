import { useState, useRef, useEffect } from 'react';

// CUSTOM HOOK
export function useSearch() {
  const [search, updateSearch] = useState('');

  const [error, setError] = useState(null);

  const isFirstInput = useRef(true);

  // validar formulario con useEffect
  useEffect(() => {
    // para saber si es la primera vez del componente
    // para evitar que arroje un error a penas entre a la pag. el usuario

    if (isFirstInput.current) {
      isFirstInput.current = search == '';
      return;
    }

    if (search === '') {
      setError('No se puede buscar una película vacía.');
      return;
    }

    // regex expression -> si empieza con un NUMERO
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película comenzando con numero.');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
