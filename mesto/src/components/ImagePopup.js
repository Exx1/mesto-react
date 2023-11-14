function ImagePopup() {
    return (
        <div className="popup popup-image">
        <div className="popup__container popup__container_image">
          <button className="popup__close popup__close_image" type="button"></button>
          <img className="popup__image" />
          <h4 className="popup__text popup__text_image"></h4>
        </div>
      </div>
    )
}

export default ImagePopup