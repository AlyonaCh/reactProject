import { React, useState } from 'react';
import { Cart } from './Cart';
import { Logo } from './Logo';
import { Menu } from './Menu';
import { Search } from './Search';
import { useNavigate } from "react-router-dom";

export function Header() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const clickShow = () => {
        if (show) {
            navigate("/catalog")
        } else {
            setShow((prev) => !prev)
        }
        
    }

    const clouseShow = () => {
        setShow((prev) => !prev)
    }

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Logo/>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarMain">
                            <Menu/>
                            <div>
                                <Search show={show} setShow={clouseShow}/>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={clickShow}>
                                    </div>
                                    <Cart/>
                                </div>
                                
                            </div>
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    );
}
