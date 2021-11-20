import React, {useEffect, useState} from "react";
import {
    API_KEY,
    API_URL_FILM,
    API_URL_FRAME_FILM,
    API_URL_STAFF
} from "../../Сonstants/constants";
import axios from "axios";
import Actor from "../Actor/Actor";
import {useParams} from "react-router-dom";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";

export const DescriptionMovies = (props) => {



    let kinopoiskId = useParams().kinopoiskId
    const [infos, setInfo] = useState({})
    const [countries, setCountries] = useState([])
    const [genres, setGenres] = useState([])
    const [actors, setActors] = useState([])
    const [frameFilm, setFrameFilm] = useState([])
    const [currentSlider, setCurrentSlider] = useState(0)


    const length = frameFilm.length
    let country = ''
    let genre = ''
    let actor = []


    useEffect(() => {
        axios(`${API_URL_FILM}${kinopoiskId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            }
        }).then(response => {
            setInfo(response.data)
            setCountries(response.data.countries)
            setGenres(response.data.genres)
        })
        axios(`${API_URL_STAFF}${kinopoiskId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            }
        }).then(response => setActors(response.data))
        axios(API_URL_FRAME_FILM(kinopoiskId), {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            }
        }).then(response => setFrameFilm(response.data.frames))

    }, [kinopoiskId])


    countries.map(element => country += element.country + ', ')
    genres.map(element => (genre += element.genre + ', '))


    if (actors.length >= 1) {
        for (let i = 0; i <= 5; i++) {
            actor.push(<Actor key={i} imageURL={actors[i].posterUrl} nameRu={actors[i].nameRu}
                              professionText={actors[i].professionText}/>)
        }
    }


    const nextSlide = () => {
        setCurrentSlider(currentSlider === length - 1 ? 0 : currentSlider + 1)
    }
    const prevSlide = () => {
        setCurrentSlider(currentSlider === 0 ? length - 1 : currentSlider - 1)
    }

    return (
        <div className="description">
            <div className="avatar-movie">
                <img src={infos.posterUrl} alt=""/>
            </div>
            <div className="main-info">
                <h1>{infos.nameRu}</h1>
                <div>
                    <h2 style={{
                        marginBottom : 10
                    }}>Страна: {country.slice(0, country.length - 2)}</h2>
                    <h3 style={{
                        marginBottom : 10,
                        fontSize : 20
                    }}>Год : {infos.year}</h3>

                    <p>Жанры: {genre.slice(0, genre.length - 2)}</p>
                </div>
                <div className={"Actor"}>
                    <h3>Актерский состав</h3>
                    <div className="d-flex">
                        {actor}
                    </div>
                </div>

                {frameFilm.length >= 1 ? <div className="Frame-film">
                    <h2>Кадры из фильма</h2>
                    <div className="d-flex slider">
                        <FaArrowAltCircleLeft className={"left-arrow"} onClick={prevSlide}/>
                        <FaArrowAltCircleRight className={"right-arrow"} onClick={nextSlide}/>
                        {frameFilm.map((slide, index) => {
                            return (
                                <div className={index === currentSlider ? 'slide active' : 'slide'} key={index}>
                                    {
                                        index === currentSlider && (
                                            <img src={slide.image} alt={`${slide.image}`} className="imageSlider"/>
                                        )
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div> : null }
            </div>
        </div>
    )
}
