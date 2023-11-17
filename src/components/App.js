import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({ isOpen: false, src: "" });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard({ isOpen: true, src: card });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSelectedCard({ isOpen: false, src: "" });
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input id="name-input" className="popup__input popup__input_type_name" placeholder="Имя" defaultValue="" type="text"
          name="name" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
        <input id="status-input" className="popup__input popup__input_type_status" placeholder="Статус" defaultValue="" type="text"
          name="about" minLength="2" maxLength="200" required />
        <span className="popup__input-error status-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
        <input id="title-input" className="popup__input popup__input_type_title" required placeholder="Название" defaultValue=""
          type="text" name="title" minLength="2" maxLength="30" />
        <span className="popup__input-error title-input-error"></span>
        <input id="link-input" className="popup__input popup__input_type_link" required placeholder="Ссылка на картинку"
          defaultValue="" type="url" name="link" />
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
        <input id="link-input-avatar" className="popup__input popup__input_type_link" required placeholder="Ссылка на изображение"
          defaultValue="" type="url" name="link" />
        <span className="popup__input-error link-input-avatar-error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да"></PopupWithForm>

      <ImagePopup card={selectedCard.src} onClose={closeAllPopups} isOpen={selectedCard.isOpen} />

    </div>
  );
}

export default App;

