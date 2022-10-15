import {React, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { changeCategory } from '../features/categories/categorySlice'

export function CatalogNav() {

  const category = useSelector((state) => state.category.title)
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);

  useEffect(() => {
      loadItems()
  },[items.length]);

  const loadItems = () => {
    fetch('http://localhost:7070/api/categories')
        .then(response => response.json())
        .then(data => setItems(() => data))
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <NavLink className="nav-link" to="#" onClick={(e) => dispatch(changeCategory({}))}>Все</NavLink>
      </li>
      {items.map(item => (
        <li key={item.id} className="nav-item">
          <NavLink className="nav-link" to="#" onClick={(e) => dispatch(changeCategory(item))}>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
