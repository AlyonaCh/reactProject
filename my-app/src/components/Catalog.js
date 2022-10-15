import { React, useState, useEffect} from 'react';
import { Card } from './Card';
import { CatalogNav } from './CatalogNav';
import { CatalogSearch } from './CatalogSearch';
import { Loading } from './Loading';
import { useSelector, useDispatch } from 'react-redux'
import { changeCategory } from '../features/categories/categorySlice'
import { changeSearch } from '../features/search/searchSlice'

export function Catalog(props) {
  const { type } = props
  const category = useSelector((state) => state.category.id)
  const search = useSelector((state) => state.search.title)

  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      loadItems()
  },[category, offset, search]);

  const loadItems = () => {
    setLoading( () => true )
    let categoryStr = category === null ? '' : `?categoryId=${category}`
    let searchStr = !search ? '' : category === null ? `?q=${search}` : `&q=${search}`
    const url = `http://localhost:7070/api/items${categoryStr}${searchStr}`
    
    fetch(url)
    .then(response => response.json())
    .then(data => setItems(() => data))
    .catch((e)=>console.log(e))
    .finally(()=>setLoading( () => false ))
    
    
  }

  useEffect(() => {
    if (offset >= 6) loadOffset()
  },[offset, search]);

  const loadOffset = () => {
    setLoading( () => true )
    if (category === null) {
      fetch(`http://localhost:7070/api/items?offset=${offset}&q=${search}`)
      .then(response => response.json())
      .then(data => {
        setItems((prev) => [...prev, ...data])
        if (data.length < 6) setDisabled(() => true )
      })
      .catch((e)=>console.log(e))
      .finally(()=>setLoading( () => false ))
    } else {
      fetch(`http://localhost:7070/api/items?categoryId=${category}&offset=${offset}&q=${search}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        setItems((prev) => [...prev, ...data])
        if (data.length < 6) setDisabled(() => true )
      })
      .catch((e)=>console.log(e))
      .finally(()=>setLoading( () => false ))
    }
    
  }

  return (
    <>
      {type == 'catalog' && 
        <CatalogSearch/>
      }
      
      <CatalogNav/>
      {items.length == 0 &&
        <div className="row">
          <h2>По вашему запросу ничего не найдено</h2>  
        </div>
      }
      {items.length != 0 &&
        <div className="row">
          
            {items.map(item => (
              <Card key={item.id} item={item}/>
            ))}
          
        </div>
      }
      {loading &&
        <Loading/>
      }
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={()=>{setOffset((prev) => prev+6)}} disabled={disabled}>Загрузить ещё</button>
      </div>
    </>
  );
}
