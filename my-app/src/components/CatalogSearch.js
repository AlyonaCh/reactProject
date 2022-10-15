import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeSearch } from '../features/search/searchSlice'

export function CatalogSearch() {
  const search = useSelector((state) => state.search.title)
  const dispatch = useDispatch()

  return (
    <>
      <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" value={search.title} onBlur={(e) => dispatch(changeSearch(e.target.value))}/>
      </form>
    </>
  );
}
