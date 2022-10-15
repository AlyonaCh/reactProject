import React from 'react';
import { Info } from './Info';
import { Pay } from './Pay';
import { Copyright } from './Copyright';
import { Contacts } from './Contacts';
import { Section } from './Section';
import banner from '../img/banner.jpg';

export function Banner() {

  return (
      <div className="banner">
        <img src={banner} className="img-fluid" alt="К весне готовы!"></img>
        <h2 className="banner-header">К весне готовы!</h2>
      </div>
  );
}
