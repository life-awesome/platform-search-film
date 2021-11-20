import React from "react";
import {Link} from "react-router-dom";

export const Genre = ({genre,getIdGenre}) => {
    return (
        <Link to={'/genre'}>
            <div className="genre" onClick={getIdGenre}>
                {genre}
            </div>
        </Link>
    )
}