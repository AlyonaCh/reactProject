import {React, useEffect, useState} from 'react';
import {useParams, useNavigate, NavLink} from 'react-router-dom'
import { Banner } from './Banner';
import { useSelector, useDispatch } from 'react-redux'
import { changeCart, delCart, cleanCart } from '../features/cart/cartSlice'
import { Loading } from './Loading';

export function Item() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const [summ, setSumm] = useState(0);
  const [user, setUser] = useState({phone: "", address: "",agreement:false});
  const [loading, setLoading] = useState(false);

  const divStyle = {
    maxWidth: '30rem',
    margin: '0 auto'
  }

  useEffect(() => {
    setSumm( () => items.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.price * currentValue.count;
    }, 0))
  },[items]);


  const handlDel = (item) => {
    dispatch(delCart(item))
  }

  const handleUser = evt => {
    setUser((prevUser) => ({
      ...prevUser, [evt.target.name]: evt.target.value
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setLoading( () => true )
    if (user.agreement) {
      fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: user,
          items: items
        })
      })
        .then(() => alert('Успешно'))
        .catch((e) => console.log(e))
        .finally(() => setLoading( () => false ))
      setUser(() => ({phone: "", address: "",agreement:false}))
      
      dispatch(cleanCart())
    }
      
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id+'_'+item.size}>
                    <td scope="row">{i}</td>
                    <td><NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink></td>
                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{item.price} руб.</td>
                    <td>{item.price * item.count} руб.</td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => handlDel(item)}>Удалить</button></td>
                  </tr>
                ))}
                
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{summ} руб.</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={divStyle}>
              <form className="card-body">
                <div className="form-group">
                  <label>Телефон
                    <input type="tel" value={user.phone} name="phone" className="form-control" id="phone" 
                    placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" onChange={handleUser}/>
                  </label>
                </div>
                <div className="form-group">
                  <label>Адрес доставки
                    <input value={user.address} name="address" className="form-control" id="address" placeholder="Адрес доставки" onChange={handleUser}/>
                  </label>
                </div>
                <div className="form-group form-check">
                  <label className="form-check-label">Согласен с правилами доставки
                    <input type="checkbox" value={user.agreement} name="agreement" className="form-check-input" id="agreement" onChange={handleUser}/>
                  </label>
                </div>
                { loading && 
                  <Loading/>
                }
                <button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit} disabled={!(user.agreement && user.address && user.phone)}>
                  Оформить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
