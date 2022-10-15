import React from 'react';
import {NavLink} from 'react-router-dom';

export function Card(props) {
  const { item } = props

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={item.images[0]}
          className="card-img-top img-fluid" alt="Босоножки 'MYER'"/>
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price} руб.</p>
          <NavLink to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
        </div>
      </div>
    </div>
  );
}
