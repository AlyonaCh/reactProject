import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { About } from './components/About';
import { Item } from './components/Item';
import { Product } from './components/Product';
import { OurContacts } from './components/OurContacts';
import { Error } from './components/Error';
import Section from './components/Section';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Main type='main'/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacts" element={<OurContacts/>} />
        <Route path="/catalog" element={<Main type='catalog'/>} />
        <Route path="/cart" element={<Item />} />
        <Route path="*" element={<Error />} />
        <Route path="/catalog/:id" element={<Product />} />
      </Routes>
      <Footer/>

    </BrowserRouter>
  );
}

export default App;
