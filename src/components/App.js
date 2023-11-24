import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({ isOpen: false, src: "" });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
        .then((res) => {
            setCards(res);
        })

        .catch((err) => {
            console.log(err);
        })
}, [])


React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
              setCurrentUser(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []
    )

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

function handleCardDelete (card) {

  api.deleteCard(card._id)
  .then(() => {
    setCards(cards.filter(function (item) {
      return item._id !== card._id;
    }))
  })

  
}

  return (
    
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards}/>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} /> 

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
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;

