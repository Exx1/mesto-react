import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="name-input" className="popup__input popup__input_type_name" placeholder="Имя" defaultValue="" type="text"
          name="name" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
        <input id="status-input" className="popup__input popup__input_type_status" placeholder="Статус" defaultValue="" type="text"
          name="about" minLength="2" maxLength="200" required />
        <span className="popup__input-error status-input-error"></span>
        <button className="popup__button popup__button_edit-profile" type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="title-input" className="popup__input popup__input_type_title" required placeholder="Название" defaultValue=""
          type="text" name="title" minLength="2" maxLength="30" />
        <span className="popup__input-error title-input-error"></span>
        <input id="link-input" className="popup__input popup__input_type_link" required placeholder="Ссылка на картинку"
          defaultValue="" type="url" name="link" />
        <span className="popup__input-error link-input-error"></span>
        <button className="popup__button popup__button_add-card" type="submit">Создать</button>
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="link-input-avatar" className="popup__input popup__input_type_link" required placeholder="Ссылка на изображение"
          defaultValue="" type="url" name="link" />
        <span className="popup__input-error link-input-avatar-error"></span>
        <button className="popup__button popup__button_edit-avatar" type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?">
        <button className="popup__button popup__button_type_active popup__button-delete" type="submit">Да</button>
      </PopupWithForm>

      <ImagePopup />

    </div>
  );
}

export default App;

