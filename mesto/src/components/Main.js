import React from "react";
import api from "../utils/Api";

function Main(props) {
    const [userData, setUserData] = React.useState({ userName: "", userDescription: "", userAvatar: ""});
    const [cards, setCards] = React.useState([]);
    
    

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserData({
                    userName: res.name,
                    userDescription: res.about,
                    userAvatar: res.avatar,
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }, []
    )

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                const cards2 = [];
                res.forEach(item => {
                    cards2.push(item.name);
                    setCards([...cards, cards2])
                    console.log(cards)
                });
            })

            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__left-side">
                    <div onClick={props.onEditAvatar} className="profile__avatar-box">
                        <img className="profile__avatar" alt="Аватар" src={userData.userAvatar} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__text">{userData.userName}</h1>
                            <button onClick={props.onEditProfile} className="profile__edit-button" type="button"></button>
                        </div>
                        <p className="profile__status">{userData.userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button-add-card" type="button"></button>
            </section>
            <section className="elements">
                <template id="elements_template">
                    <div className="element">
                        <button className="element__trash" type="button"></button>
                        <img className="element__image" />
                        <div className="element__signature">
                            <h2 className="element__name"></h2>
                            <div className="element__likebox">
                                <button className="element__like" type="button"></button>
                                <p className="element__like-counter"></p>
                            </div>
                        </div>
                    </div>
                </template>
            </section>
        </main>
    )
}

export default Main