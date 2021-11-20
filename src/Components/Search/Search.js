import React, {useContext, useEffect, useState} from "react";
import {API_URL_SEARCH} from "../../Сonstants/constants";
import {get} from "../../request/request";
import {Context} from "../Context/Context";
import {Card} from "../Card/Card";

export default function Search() {
    const [films, setFilms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const {search, getFilmId} = useContext(Context)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (fetching) {
            get(API_URL_SEARCH(search, currentPage))
                .then(response => {
                    setFilms([...films, ...response.data.films])
                    setCurrentPage(currentPage + 1)
                    setTotalPage(response.data.pagesCount)
                })
                .finally(() => {
                    setFetching(false)
                })
        }
    }, [currentPage, fetching, films, search])
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300 && currentPage <= totalPage) {
            setFetching(true)
        }
    }
    return (
        <div className="clear">
            <h2 className="title">{`Поиск по запросу : ${search}`}</h2>
            <main>
                {films.map((element,index) => (
                    <Card genres={element.genres}
                          filmId={element.filmId}
                          name={element.nameRu}
                          imageURL={element.posterUrl}
                          rating={element.rating}
                          year={element.year}
                          key={index}
                          getFilmId={() => getFilmId(element)}
                    />
                ))}
            </main>
        </div>
    )
}