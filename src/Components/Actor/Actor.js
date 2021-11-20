import React from "react";

const Actor = (props) => {
    return (
        <div className="actor-block">
            <img src={props.imageURL} alt=""/>
            <h4>{props.nameRu}</h4>
            <p>{props.professionText.slice(0, props.professionText.length -1)}</p>
        </div>
    )
}
export default Actor