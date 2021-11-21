import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context/Context";
import {get} from "../../request/request";
import {API_URL_GENRE, API_URL_GENRE_FILM} from "../../Сonstants/constants";
import {Card} from "../Card/Card";
import {Genre} from "../Genre/Genre";

export const GenrePage = () => {
    const [films, setFilms] = useState([])
    const [genre, setGenre] = useState([])
    const [state, setState] = useState(false)
    const [genreId, setGenreId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const [totalPage, setTotalPage] = useState(0)
    const [genreName, setGenreName] = useState('')
    const {getFilmId} = useContext(Context)

    useEffect(() => {
        if (fetching) {
            if (state) {
                get(API_URL_GENRE_FILM(genreId))
                    .then(response => {
                        setFilms([...films, ...response.data.films])
                        setCurrentPage(currentPage + 1)
                        setTotalPage(response.data.pagesCount)
                    })
                    .finally(() => setFetching(!fetching))
            } else {
                get(API_URL_GENRE).then(response => setGenre(response.data.genres))
            }
        }
    }, [state, fetching])
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && currentPage <= totalPage) {
            setFetching(true)
        }
    }
    const getIdGenre = (id, name) => {
        setGenreId(id)
        setState(!state)
        setGenreName(name)
    }
    return (
        <div className="clear">
            {state ?
                <>
                    <h2 className="title">{`Фильтр по : ${genreName}`}</h2>
                    <main>
                        {films.map((element, index) => (
                            <Card genres={element.genres}
                                  filmId={element.filmId}
                                  name={element.nameRu}
                                  imageURL={element.posterUrl}
                                  year={element.year}
                                  key={index}
                                  getFilmId={() => getFilmId(element)}
                            />
                        ))}
                    </main>
                </>
                : <div className="genre-container flex-wrap">
                    {genre.map((obj, index) => {
                        return <Genre genre={obj.genre} getIdGenre={() => {
                            getIdGenre(obj.id, obj.genre)
                        }
                        }/>
                    })}
                </div>
            }
        </div>
    )
}