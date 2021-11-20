import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context/Context";
import {get} from "../../request/request";
import {API_URL_BEST_FILM} from "../../Сonstants/constants";
import {Card} from "../Card/Card";

export const BestFilm = () => {
    const [films,setFilms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const [totalPage, setTotalPage] = useState(0)
    const {getFilmId} = useContext(Context)

    useEffect(()=>{
        if(fetching){
            get(API_URL_BEST_FILM(currentPage))
                .then(response => {
                    setFilms([...films, ...response.data.films])
                    setCurrentPage(currentPage + 1)
                    setTotalPage(response.data.pagesCount)
                })
                .finally(()=> {
                    setFetching(false)
                })

        }
    },[currentPage, fetching, films])

    useEffect(()=>{
        document.addEventListener('scroll',scrollHandler)
        return function () {
            document.removeEventListener('scroll',scrollHandler )
        }
    })
    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300 && currentPage <= totalPage){
            setFetching(true)
        }
    }
    return (
        <div className="clear">
            <h2 className="title">Лучшие фильмы</h2>
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