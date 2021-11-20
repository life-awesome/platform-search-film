import React, {useContext} from "react";
import {Card} from "../Card/Card";
import {Context} from "../Context/Context";

const Home = () => {
    const {films, getFilmId} = useContext(Context)
    return (
        <div className="clear">
            <h1 className="header-movies">Топ популярных</h1>
            <main>
                {films.map(element => (
                    <Card genres={element.genres}
                          filmId={element.filmId}
                          name={element.nameRu}
                          imageURL={element.posterUrl}
                          rating={element.rating}
                          year={element.year}
                          key={element.filmId}
                          getFilmId={() => getFilmId(element)}
                    />
                ))}
            </main>
        </div>
    )
}
export default Home