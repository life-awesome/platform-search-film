import React, {useContext} from "react";
import {Context} from "../Context/Context";
import {Link} from "react-router-dom";

export const Menu = () => {
    const {input, showMenu, hideMenu,setSearch} = useContext(Context)
    return (
        <div className={showMenu ? "menu active" : "menu"}>
            <div className="blur" onClick={hideMenu}></div>
            <div className="menu-content">
                <div className="d-flex flex-column">
                    <div className="search-block">
                        <Link to={'/search'}>
                            <img src="/images/search.svg" alt="search-img"/>
                        </Link>
                        <input type="text" placeholder="Поиск..." className="search"
                               onChange={(e) => setSearch(input.current.value)} ref={input} />
                    </div>
                    <div>
                        <Link to={'/'}>
                            <h4 className="menu-link" onClick={() => {
                                hideMenu()
                            }}>Главная</h4>
                        </Link>
                        <Link to={'/popular'}>
                            <h4 className="menu-link" onClick={() => {
                                hideMenu()
                            }}>Популярные фильмы</h4>
                        </Link>
                        <Link to={'/await'}>
                            <h4 className="menu-link" onClick={() => {
                                hideMenu()
                            }}>Ожидаемые фильмы</h4>
                        </Link>
                        <Link to={'/best-film'}>
                            <h4 className="menu-link" onClick={() => {
                                hideMenu()
                            }}>Лучшие фильмы</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}