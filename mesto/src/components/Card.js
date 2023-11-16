function Card (props) {
    function handleClick() {
        props.onCardClick(props.link);
      }  
    return ( 
        <div className="element">
        <button className="element__trash" type="button"></button>
        <img className="element__image" src={props.link} onClick={handleClick}/>
        <div className="element__signature">
            <h2 className="element__name">{props.name}</h2>
            <div className="element__likebox">
                <button className="element__like" type="button"></button>
                <p className="element__like-counter">{props.likes}</p>
            </div>
        </div>
    </div>
    )
}

export default Card