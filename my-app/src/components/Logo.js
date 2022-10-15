import React from 'react';
import logo from '../img/header-logo.png';

export function Logo() {

  return (
    <a className="navbar-brand" href="/">
      <img src={logo} alt="Bosa Noga"></img>
    </a>
  );
}
