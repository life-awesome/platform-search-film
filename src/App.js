import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {API_KEY, API_URL_POPULAR, API_URL_SEARCH} from "./Сonstants/constants";
import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import {Context} from "./Components/Context/Context";
import {DescriptionMovies} from "./Components/DescriptionMovies/DescriptionMovies";

const getMovies = async (url) => {
    return  axios(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        }
    })
}

function App() {
    const input = useRef()
    const [film , setFilm] = useState('')
    const [films, setFilms] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        getMovies(API_URL_POPULAR)
            .then(response => setFilms(response.data.films))
    }, [])
    const clickSearch = (e) => {
        if (e.key !== "Enter") {
            return
        }
        const apiSearchURL = `${API_URL_SEARCH}${search}`
        if(search.length >= 1) {
            getMovies(apiSearchURL)
                .then(response => setFilms(response.data.films))
        }
    }
    const getFilmId = (id) => {
        setFilm(id.filmId)
    }
    return (
        <Context.Provider value={{
            films,
            getFilmId
        }}>
            <header className="d-flex align-center justify-between header">
                <div className="pl-10 opacity-9 cu-p" onClick={()=> {}}>
                    <h2>My App</h2>
                </div>
                <div className="search-block">
                    <img src="/images/search.svg" alt="search-img" onClick={clickSearch}/>
                    <input type="text" placeholder="Поиск..." className="search"
                           onChange={(e) => setSearch(input.current.value)} ref={input} onKeyPress={clickSearch}/>
                </div>
            </header>
            <Routes>
                <Route path={'/'}  exact={true} element={<Home/> }/>
                <Route path={`/movie/:filmId`}  exact={true} element={<DescriptionMovies valueFilm={film}/>}/>
            </Routes>
        </Context.Provider>
    );
}

export default App;
