import React from 'react';
import { Card } from './Card';

export function Hits(props) {
  const { items } = props

  return (
    <div className="row">
      {items.map(item => (
        <Card key={item.id} item={item}/>
      ))}
    </div>
  );
}
