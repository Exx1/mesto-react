function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_image">
        <button className="popup__close popup__close_image" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card} />
        <h4 className="popup__text popup__text_image"></h4>
      </div>
    </div>
  )
}

export default ImagePopup