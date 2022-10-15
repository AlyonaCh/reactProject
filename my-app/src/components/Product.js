import {React, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import { Banner } from './Banner';
import { Loading } from './Loading';
import { useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../features/cart/cartSlice'

export function Product() {
  const {id} = useParams();
  const [item, setItem] = useState();
  const [loaded, setLoaded] = useState(true);
  const [count, setCount] = useState(1);
  const [selectedSize, setSize] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleCount = (type) => {
    if (type == 'add' && count < 10) {
      setCount((prev)=>(prev+1))
    } else if (type == 'del' && count > 1) {
      setCount((prev)=>( prev-1))
    }
  }

  const handleSize = (size) => {
    setSize(()=>size)
  }

  useEffect(() => {
    loadItem()
  },[]);

  const loadItem = () => {
    setLoaded(()=>true)
    const url = `http://localhost:7070/api/items/${id}`
    
    fetch(url)
    .then(response => response.json())
    .then(data => setItem(() => data))
    .then(() => setLoaded(() => false))
  }

  const handlClick = (item) => {
    dispatch(changeCart({...item, count:count, size:selectedSize}))
    navigate("/cart")
  }

  return (
    <>
      {loaded &&
        <Loading/>
      }
      {!loaded &&
        <main className="container">
          <div className="row">
              <div className="col">
                  <Banner/>

                  <section className="catalog-item">
                      <h2 className="text-center">{item.title}</h2>
                      <div className="row">
                          <div className="col-5">
                              <img src={item.images[0]}
                                  className="img-fluid" alt=""/>
                          </div>
                          <div className="col-7">
                              <table className="table table-bordered">
                                  <tbody>
                                      <tr>
                                          <td>Артикул</td>
                                          <td>{item.sku}</td>
                                      </tr>
                                      <tr>
                                          <td>Производитель</td>
                                          <td>{item.manufacturer}</td>
                                      </tr>
                                      <tr>
                                          <td>Цвет</td>
                                          <td>{item.color}</td>
                                      </tr>
                                      <tr>
                                          <td>Материалы</td>
                                          <td>{item.material}</td>
                                      </tr>
                                      <tr>
                                          <td>Сезон</td>
                                          <td>{item.season}</td>
                                      </tr>
                                      <tr>
                                          <td>Повод</td>
                                          <td>{item.reason}</td>
                                      </tr>
                                  </tbody>
                              </table>
                              <div className="text-center">
                                  <p>Размеры в наличии: 
                                    {item.sizes.map(size => (
                                      <span key={size.size}>
                                        { size.avalible &&
                                          <button onClick={() => handleSize(size.size)} 
                                            className={'catalog-item-size' + (selectedSize === size.size ? ' selected' : '')}
                                          >
                                            {size.size}
                                          </button>
                                        }
                                      </span>
                                    ))}
                                  </p>
                                  <p>Количество: 
                                    <span className="btn-group btn-group-sm pl-2">
                                      <button className="btn btn-secondary" onClick={() => handleCount('del')}>-</button>
                                      <span className="btn btn-outline-primary">{count}</span>
                                      <button className="btn btn-secondary" onClick={() => handleCount('add')}>+</button>
                                    </span>
                                  </p>
                              </div>
                              <button  onClick={() => handlClick(item)} className="btn btn-danger btn-block btn-lg" disabled={!selectedSize}>В корзину</button>
                          </div>
                      </div>
                  </section>
              </div>
          </div>
        </main>
      }
    </>
    
  );
}
