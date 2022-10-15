import React from 'react';
import { Info } from './Info';
import { Pay } from './Pay';
import { Copyright } from './Copyright';
import { Contacts } from './Contacts';

export function Footer() {

  return (
    <footer className="container bg-light footer">
        <div className="row">
            <Info/>
            <div className="col">
                <Pay/>
                <Copyright/>
            </div>
            <div className="col text-right">
                <Contacts/>
            </div>
        </div>
  </footer>
  );
}
