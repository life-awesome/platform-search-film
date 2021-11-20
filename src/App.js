import React, {useRef, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import {Context} from "./Components/Context/Context";
import {DescriptionMovies} from "./Components/DescriptionMovies/DescriptionMovies";
import {Menu} from "./Components/Menu/Menu";
import {Popular} from "./Components/Popular/Popular";
import Search from "./Components/Search/Search";
import {animateScroll as scroll} from "react-scroll";
import {AwaitFilm} from "./Components/AwaitFilm/AwaitFilm";
import {BestFilm} from "./Components/BestFilm/BestFilm";


function App() {
    const input = useRef()
    const [film, setFilm] = useState('')
    const [search, setSearch] = useState('')
    const [showMenu, setShowMenu] = useState(false)

    const getFilmId = (id) => {
        setFilm(id.filmId)
    }

    const hideMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <Context.Provider value={{getFilmId, showMenu, setSearch, input, hideMenu, search}}>
            <header className="d-flex align-center justify-between header">
                <Link to={'/'} onClick={() => scroll.scrollToTop()}>
                    <div className="pl-10 opacity-9 cu-p">
                        <h2>My App</h2>
                    </div>
                </Link>
                <div className="hamburger" onClick={hideMenu}>
                    <i className={showMenu ? "fas fa-bars activeBurger" : "fas fa-bars"}></i>
                </div>
            </header>
            <div></div>
            <Menu/>
            <Routes>
                <Route path={'/'} exact={true} element={<Home/>}/>
                <Route path={`/movie/:kinopoiskId`} exact={true} element={<DescriptionMovies valueFilm={film}/>}/>
                <Route path={'/popular'} exact element={<Popular/>}/>
                <Route path={'/search'} exact element={<Search/>}/>
                <Route path={'/await'} exact={true} element={<AwaitFilm/>}/>
                <Route path={'/best-film'} exact={true} element={<BestFilm/>}/>
            </Routes>
        </Context.Provider>
    );
}

export default App;
