import React from "react";
import {Link} from "react-router-dom";

export const Card = (props) => {
    let str = ''
    props.genres.forEach(element => str += element.genre + ', ')
    const Genre = str.slice(0, str.length - 2)

    //Classes
    let cls = ['rating']
    if(props.rating < 4){
        cls.push('red')
    } else if (props.rating > 4 && props.rating < 6.5){
        cls.push('orange')
    } else {
        cls.push('green')
    }
    return (
        <div className="movie">
            <Link to={`/movie/${props.filmId}`}>
                <img src={props.imageURL} alt="preview" onClick={props.getFilmId}/>
            </Link>
            {props.rating ? <div className={cls.join(' ')}>{props.rating === 'null' ? '' : props.rating}</div> : null}
            <div className="card d-flex justify-between align-center flex-column">
               <div> <h3>{props.name}</h3></div>
                <div className="info">
                    <h4>{Genre}</h4>
                    <div></div>
                    <p>{props.year} года</p>
                </div>
            </div>
        </div>
    )
}