import React, {useContext, useEffect, useState} from "react";
import {Card} from "../Card/Card";
import {Context} from "../Context/Context";
import {get} from "../../request/request";
import {API_URL_PREMIER_FILM} from "../../Сonstants/constants";
import Loader from "../Loader/Loader";

const Home = () => {
    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false);
    const {getFilmId} = useContext(Context)
    useEffect(()=>{
        get(API_URL_PREMIER_FILM)
            .then(response => {
                setFilms(response.data.items)
                setLoading(!loading)
            })
    },[])
    return (
        <div className="clear">
            <h2 className="title">Премьеры этого месяца</h2>
            <main>
                {loading ? films.map((element,index) => (
                    <Card genres={element.genres}
                          filmId={element.kinopoiskId}
                          name={element.nameRu}
                          imageURL={element.posterUrl}
                          year={element.year}
                          key={index}
                          getFilmId={() => getFilmId(element)}
                    />
                )) : <Loader/>}
            </main>
        </div>
    )
}
export default Home