import React from 'react';
import Section  from './Section';
import { Banner } from './Banner';

export function Main(props) {
  const { type } = props

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          {type=='main' &&
            <Section name={'Хиты продаж!'} type={'top-sales'} url={'top-sales'}/>
          }
          <Section name={'Каталог'} type={'catalog'}  url={'items'} page={type}/>
        </div>
      </div>
    </main>
  );
}
