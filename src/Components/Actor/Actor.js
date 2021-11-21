import React from "react";

const Actor = ({nameRu,imageURL,professionText}) => {
    return (
        <div className="actor-block">
            <img src={imageURL} alt={`${imageURL}`}/>
            <h4>{nameRu}</h4>
            <p>{professionText.slice(0, professionText.length -1)}</p>
        </div>
    )
}
export default Actor